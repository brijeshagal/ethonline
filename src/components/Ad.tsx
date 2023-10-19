import React from 'react';
import { Web3Storage } from 'web3.storage';

type Props = {
    rootCid: string;
}

const Ad = ({ rootCid }: Props) => {
    const [ads, setAds] = React.useState<Array<any>>([]);
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE });
    async function fetch(rootCid: string) {
        const res = await client.get(rootCid); // Web3Response
        const files = await res.files(); // Web3File[]        
        setAds(files);
        // console.log(files);
    }
    React.useEffect(() => {
        fetch(rootCid);

        return () => {

        }
    }, [])
    return (
        <div>
            {ads.map((ad, idx) => {
                return (<div key={idx}>
                    <img src={`https://${rootCid}.ipfs.w3s.link/${ad.name}`} className='w-96 h-96' />
                </div>)
            })}
        </div>
    );
};

export default Ad;
