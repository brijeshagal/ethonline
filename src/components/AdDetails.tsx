import React from 'react';
import { Web3Storage } from 'web3.storage';
import { Carousel } from 'antd';
type Props = {
    ad: any;
}
const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default function AdDetails({ ad }: Props) {
    const [ads, setAds] = React.useState<Array<any>>([]);
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE });
    async function fetch(rootCid: string) {
        const res = await client.get(rootCid); // Web3Response
        const files = await res.files(); // Web3File[]        
        setAds(files);
        console.log(files);
    }
    React.useEffect(() => {
        return () => {
            if (ad.cid)
                fetch(ad.cid);
        }
    }, [])
    return (
        <div>
            <div>{ad.adName}</div>
            <Carousel autoplay>
                {ads.map((specificAd, idx) => {
                    return (<div style={contentStyle} key={idx}>
                        <img src={`https://${specificAd.cid}.ipfs.w3s.link`} className='w-96 h-96' />
                    </div>)
                })}
            </Carousel>
        </div>
    );
};
