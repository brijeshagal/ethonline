import React, { useEffect } from 'react';
import { registerPlatform } from '@/utils/contractInteractions';
import { useAccount } from 'wagmi';
import ABI from '@/contracts/AdvertiseAbi.json';
import { pubClient } from '@/utils/signers';
type Details = {
    activeEarning: BigInt,
    totalEarning: BigInt,
    platformAddress: string,
    platformName: string,
    platformIdx: bigint,
    chiainId: number
}
const RegisterPlatformButton: React.FC = ({
}) => {
    const [platformName, setPlatformName] = React.useState('');
    const { address: platform } = useAccount();
    const [platformDetails, setPlatformDetails] = React.useState<Array<any>>([]);
    const [loader, setLoader] = React.useState<boolean>(true);
    const handleClick = async () => {
        try {
            const hash = await registerPlatform(platformName);
            console.log(hash);
        }
        catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const queryResult = async () => {
            setLoader(true);
            const details: any = await pubClient.readContract({
                address: '0x0874726A5671A6c2feDd2705746451fd5D4448ef',
                abi: ABI,
                functionName: 'platforms',
                args: [platform],
            });
            setPlatformDetails(details);
        }
        if (platform) {
            queryResult();
        }
    }, []);
    console.log(platformDetails)
    return (
        <div>{
            platformDetails[2] === platform ? <></> :
                <div >
                    <input type="text" className='text-black' onChange={(e) => setPlatformName(e.target.value)} />
                    <button onClick={handleClick}>
                        Register
                    </button>
                </div>
        }
        </div>
    );
};

export default RegisterPlatformButton;
