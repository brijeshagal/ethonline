// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
// Mumbai: 0x0874726A5671A6c2feDd2705746451fd5D4448ef
interface IInterchainSecurityModule {
    enum Types {
        UNUSED,
        ROUTING,
        AGGREGATION,
        LEGACY_MULTISIG,
        MERKLE_ROOT_MULTISIG,
        MESSAGE_ID_MULTISIG,
        NULL, // used with relayer carrying no metadata
        CCIP_READ
    }    

    function moduleType() external view returns (uint8);

    function verify(bytes calldata _metadata, bytes calldata _message)
        external
        returns (bool);
}

interface ISpecifiesInterchainSecurityModule {
    function interchainSecurityModule()
        external
        view
        returns (IInterchainSecurityModule);
}

interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external;
}

contract Advertise is IMessageRecipient,
    ISpecifiesInterchainSecurityModule, Ownable{
     struct AdDetails {        
        uint256 clicks; // no of clicks paying for
        uint256 impressions; // no of impressions paying for
        Category category;
        string description;
        string cid;
        string adName;
    }
    struct AdCredentials {
        address advertisor;
        uint256 id; // id of the ad
        uint256 clicks; // no of clicks happened
        uint256 impressions; // no of impressions happened
        bool isActive; // is ad active
        bool isPermanent;
        uint32 chainId;
    }

    struct Ad {
        AdDetails details;
        AdCredentials creds;
    }

    struct ClicksAndImpressions{
        uint256 platformClicks;
        uint256 platformImpressions;
        uint256 activeEarning;
    }

    struct Platform{
        uint256 activeEarning;
        uint256 totalEarning;
        address platformAddress;        
        string platformName;
        uint256 platformIdx;
        uint32 chainId;        
    }

    enum Category {
        Art,
        Music, 
        Photography,
        Food,
        Fitness,
        Fashion,
        Tech,
        Travel,
        Sports, 
        Other
    }
    event AdPut(address indexed advertisor, uint256 indexed adId, uint256 clicks, uint256 impressions, bool isPermanent, Category, string cid, string adName, uint256 chainId);
    event AdDeactivate(address indexed, uint256 indexed adId);
    event PlatformEarning(address indexed platformAddress, uint256 platformIdx, uint256 indexed adId, uint256 activeAdEarning, uint256 totalEarning);
    event PlatformRegistered(address indexed platformAddress, uint256 chainId, uint256 indexed platformId, string platformName);
    event ReceivedMessage(uint32 indexed origin, bytes32 indexed sender, string message);
    event BrokerageWithdrawal(uint256);
    uint256 brokerageCount;
    uint256 interchainCount;
    uint256 public costperClick = 10**10;
    uint256 public costperImpression = 10**5;
    uint256 public brokerage = 10**12;
    uint256 public ImpressionsToClicksRatio = 1000;
    uint256 public permanentAdCharge = 10**18;

    constructor() Ownable(msg.sender) {}

    // Test input
    //[1000,1000000,0,"Trial","ipfs", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", false, 80001] 
    // 11100000000000
    IInterchainSecurityModule public interchainSecurityModule;    
    mapping(address platformId => mapping(uint256 adId=> ClicksAndImpressions)) platformAdDetails;
    Ad[] public advertisements;
    mapping(address advertisor => uint256[] idxes) public advertisorsAds;
    uint256 public totalPlatforms;
    mapping(address => Platform) public platforms;
    mapping(uint256 => address) public platformIdxToAddress;    

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external override {
        emit ReceivedMessage(_origin, _sender, string(_data));
        ++interchainCount;
    }

    // Check for oracle implementation
    function putAd(AdDetails calldata _ad, address advertisor, bool _isPermanent, uint32 _chainId) external payable {
        // Implement cost play to check the amount paid as per requested clicks and impressions
        require(_ad.impressions >= _ad.clicks*ImpressionsToClicksRatio, "Low ratio");
        uint256 _permanentCharge = _isPermanent ? permanentAdCharge: 0;
        require(msg.value == ((costperImpression*_ad.impressions) + (_ad.clicks*costperClick) + brokerage + _permanentCharge), "Low funds provided");
        uint256 idx = advertisements.length;
        advertisements.push(
            Ad(_ad, AdCredentials(advertisor, idx, 0, 0, true, _isPermanent, _chainId))
        );
        advertisorsAds[advertisor].push(idx);
        ++brokerageCount;
        emit AdPut(advertisor, idx, _ad.clicks, _ad.impressions, _isPermanent, _ad.category, _ad.cid, _ad.adName, _chainId);
    }

    function batchUpdateClicksAndImpressions(
        address[] calldata _platformAddresses,
        uint256[] calldata _clicks,
        uint256[] calldata _impressions,
        uint256 _adId
    ) external onlyOwner {
        uint256 size = _platformAddresses.length;
        require(
            size == _clicks.length && _clicks.length == _impressions.length
        );
        Ad memory _ad = advertisements[_adId];
        for (uint256 i = 0; i < size;) {            
            uint256 _click = _clicks[i];
            uint256 _impression = _impressions[i];
            address _platformAddress = _platformAddresses[i];
            uint256 _platformAdEarning = _click*costperClick + _impression*costperImpression;
            ClicksAndImpressions memory _platformAdDetails = platformAdDetails[_platformAddress][_adId];
            Platform memory _platform = platforms[_platformAddress];        
            _platformAdDetails.platformClicks += _click;
            _platformAdDetails.platformImpressions += _impression;
            _platformAdDetails.activeEarning += _platformAdEarning;
            _platform.activeEarning += _platformAdEarning;
            _platform.totalEarning += _platformAdEarning;
            _ad.creds.clicks += _click;
            _ad.creds.impressions += _impression;
            platformAdDetails[_platformAddress][_adId] = _platformAdDetails;
            platforms[_platformAddress] = _platform;
            emit PlatformEarning(_platformAddress, _platform.platformIdx, _adId, _platform.activeEarning, _platform.totalEarning);
            unchecked {
                ++i;
            }
        }
        if(_ad.creds.impressions >= _ad.details.impressions || _ad.creds.clicks >= _ad.details.clicks){
            _ad.creds.isActive = false;
            emit AdDeactivate(_ad.creds.advertisor, _adId);
        }
        advertisements[_adId] = _ad;
    }

    function registerPlatform(string calldata _name, uint32 _chainId, address _platformAddress) external{ 
        require(platforms[_platformAddress].platformAddress == address(0x0), "Platform already registered!");
        platformIdxToAddress[totalPlatforms] = _platformAddress;     
        Platform memory _platform = Platform(0, 0, _platformAddress, _name, totalPlatforms, _chainId);    
        totalPlatforms++;
        platforms[_platformAddress] = _platform;
        emit PlatformRegistered(_platformAddress, _chainId, totalPlatforms-1, _name);
    }

    function getClicksAndImpressions(address platformAddress, uint256 adId) external view returns(ClicksAndImpressions memory){
        return platformAdDetails[platformAddress][adId];
    }

    function recievePay(address receiver) external {
        require(platforms[msg.sender].platformAddress != address(0x0), "Unregistered platform!");
        require(platforms[msg.sender].activeEarning > 0, "No funds available.");
        uint256 _pay = platforms[msg.sender].activeEarning;
        platforms[msg.sender].activeEarning = 0;
        (bool success, ) = receiver.call{value: _pay}("");
        require(success, "Insuccessful Txn");
    }

    function updateImpressionsToClicksRatio(uint256 _newRatio) external onlyOwner{
        ImpressionsToClicksRatio = _newRatio;
    }

    function updateCostPlan(uint256 _costperClick, uint256 _costperImpression) external onlyOwner{
        costperClick =_costperClick;
        costperImpression = _costperImpression;
    }

    function totalAds() external view returns(uint256) {
        return advertisements.length;
    }

    function setInterchainSecurityModule(address _ism) external onlyOwner{
        interchainSecurityModule = IInterchainSecurityModule(_ism);
    }

    function withdrawBrokerage() external onlyOwner{
        uint256 amt = brokerageCount*brokerage;
        brokerageCount = 0;
        (bool success, ) = owner().call{value: amt}("");
        require(success, "Insuccessfull Txn");
        emit BrokerageWithdrawal(amt);
    }

    receive() external payable { }
    fallback() external payable{}
}
