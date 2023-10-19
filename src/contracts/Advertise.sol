// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Advertise is Ownable {
    enum Category {
        Sports,
        Food,
        Fitness,
        Fashion,
        Tech,
        Travel
    }

    uint256 public costperClick = 10**10;
    uint256 public costperImpression = 10**5;
    uint256 public brokerage = 10**12;
    uint256 public ImpressionsToClicksRatio = 1000;

    constructor() Ownable(msg.sender) {}

    struct AdDetails {        
        uint256 clicks; // no of clicks paying for
        uint256 impressions; // no of impressions paying for
        Category[] categories;
        string description;
        string ipfs;
    }
    // Test input
    //[1000,1000000,[0,1],"Trial","ipfs"]  
    // 11100000000000
    struct AdCredentials {
        address owner;
        uint256 id; // id of the ad
        uint256 clicks; // no of clicks happened
        uint256 impressions; // no of impressions happened
        bool active; // is ad active
    }

    struct Ad {
        AdDetails details;
        AdCredentials creds;
    }

    struct ClicksAndImpressions{
        uint256 platformClicks;
        uint256 platformImpressions;
        uint256 activePayment;
    }

    struct Platform{
        uint256 activeEarning;
        uint256 totalEarning;
        address platformAddress;        
        string platformName;
    }

    mapping(address platformId => mapping(uint256 adId=> ClicksAndImpressions)) platformAdDetails;
    Ad[] public advertisements;
    uint256 public totalPlatforms;
    mapping(address => Platform) public platforms;
    mapping(uint256 => address) public platformIdxToAddress;    

    // Check for oracle implementation
    function putAd(AdDetails calldata _ad) external payable {
        // Implement cost play to check the amount paid as per requested clicks and impressions
        require(_ad.impressions >= _ad.clicks*ImpressionsToClicksRatio, "Low ratio");
        require(msg.value == ((costperImpression*_ad.impressions) + (_ad.clicks*costperClick) + brokerage), "Low funds provided");
        advertisements.push(
            Ad(_ad, AdCredentials(msg.sender, advertisements.length, 0, 0, true))
        );
    }

    function batchUpdateClicksAndImpressions(
        address[] calldata _platformAddresses,
        uint256[] calldata _clicks,
        uint256[] calldata _impressions,
        uint256[] calldata _ids
    ) external onlyOwner {
        uint256 size = _ids.length;
        require(
            size == _clicks.length && _clicks.length == _impressions.length
        );
        for (uint256 i = 0; i < size; ) {
            uint256 _adId = _ids[i];
            uint256 _click = _clicks[i];
            uint256 _impression = _impressions[i];
            address _platformAddress = _platformAddresses[i];
            uint256 _platformAdEarning =  _click*costperClick + _impression*costperImpression;

            Ad memory _ad = advertisements[_adId];
            ClicksAndImpressions memory _platformAdDetails = platformAdDetails[_platformAddress][_adId];
            Platform memory _platform = platforms[_platformAddress];        
            _platformAdDetails.platformClicks += _click;
            _platformAdDetails.platformImpressions += _impression;
            _platformAdDetails.activePayment += _platformAdEarning;
            _platform.activeEarning += _platformAdEarning;           
            _platform.totalEarning += _platformAdEarning;           
            _ad.creds.clicks += _click;
            _ad.creds.impressions += _impression;
            platformAdDetails[_platformAddress][_adId] = _platformAdDetails;
            advertisements[_adId] = _ad;
            platforms[_platformAddress] = _platform;
            unchecked {
                ++i;
            }
        }
    }

    function registerPlatform(string calldata _name) external{ 
        require(platforms[msg.sender].platformAddress == address(0x0), "Platform already registered!");
        platformIdxToAddress[totalPlatforms] = msg.sender;     
        Platform storage _platform = platforms[msg.sender];
        totalPlatforms++;
        _platform.platformAddress = msg.sender;                
        _platform.platformName = _name;
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
}
