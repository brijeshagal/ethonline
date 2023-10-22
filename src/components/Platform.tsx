import React, { useEffect } from 'react';
import { registerPlatform, platformDetails } from '@/utils/contractInteractions';
import { useAccount } from 'wagmi';
import PlatformAnalytics from './PlatformAnalytics';
type Details = {
    activeEarning: BigInt,
    totalEarning: BigInt,
    platformAddress: string,
    platformName: string,
    platformIdx: bigint,
    chiainId: number
}
const Platform = () => {
    const [platformName, setPlatformName] = React.useState('');
    const { address } = useAccount();
    const [details, setDetails] = React.useState<Array<any>>([]);
    const [loader, setLoader] = React.useState<boolean>(true);
    const handleClick = async () => {
        try {
            if (address) {
                const hash = await registerPlatform(platformName, address);
                console.log(hash);
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    React.useEffect(() => {
        async function fetch() {
            try {
                if (address) {
                    const res = await platformDetails(address);
                    console.log(res);
                    setDetails(res as Array<any>);
                }
            }
            catch (e) {
                console.log(e);
            }
            setLoader(false);
        }
        fetch();
        return () => {

        }
    }, [])
    return (
        <div className='w-full h-full flex items-center justify-center'>{
            loader === false ? (details[2] === address ? <div className='mt-6 bg-primary p-5 rounded-2xl'>
                {details && <div className='w-fit mb-10 mt-4 mx-auto text-gray-300 font-bold capitalize text-2xl underline underline-offset-8 decoration-gray-600 tracking-[10px]'>{details[3]}</div>}
                {details && <PlatformAnalytics details={details} />}
                <div className='w-full h-[2px] bg-gray-600 rounded-xl mt-20 '></div>
                <div className='ml-10 flex flex-col p-10 '>
                    <div className='text-xl underline underline-offset-8 decoration-gray-600 ml-20 w-fit'>Usage</div>
                    <div className='mt-10'>
                        <div className='my-4'>Installation</div>
                        <div className='bg-gray-700 p-3 rounded-lg w-fit '>
                            {"npm i @vampire-ab/adroll"}
                        </div>
                        <div className='my-4'>Import the Component</div>
                        <div className='bg-gray-700 p-3 rounded-lg w-fit '>
                            {"import { MyAd } from'@vampire-ab/adroll';"}

                        </div>
                        <div className='my-4'>Use the component. Get the api token from: <a className="text-blue-600" href='https://web3.storage/tokens/'>web3.storage</a></div>
                        <div className='bg-gray-700 p-3 rounded-lg w-fit '>
                            {"<MyAd web3StorageToken = {process.env.NEXT_PUBLIC_WEB3_STORAGE} />"}
                        </div>
                    </div>
                </div>
            </div> :
                <div className='mt-[100px] flex gap-10 rounded-xl bg-primary p-4'>
                    <input type="text" className='text-white bg-transparent focus:outline-none border px-4 py-3  rounded ' onChange={(e) => setPlatformName(e.target.value)} />
                    <button className='p-4 rounded-xl bg-purple-600' onClick={handleClick}>
                        Register
                    </button>
                </div>
            ) : <></>}
        </div>
    );
}

export default Platform