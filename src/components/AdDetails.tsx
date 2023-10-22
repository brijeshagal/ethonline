import React from 'react';
import { Web3Storage } from 'web3.storage';
import { Carousel } from 'antd';
type Props = {
    ad: any;
}
const carouselStyle = {
    borderRadius: '20px',
    height: '400px',
    background: 'transparent',
    width: '400px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
}
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
        <div className='w-[500px] p-5 overflow-hidden rounded-3xl bg-primary'>
            <div>
                <div className='text-whitesmoke mx-auto mb-2 w-fit underline underline-offset-8 decoration-4 decoration-primary'>{ad.adName}</div>
            </div>
            <div className='flex items-center justify-center'>
                <Carousel autoplay style={carouselStyle}>
                    {ads.map((specificAd, idx) => {
                        return (<div key={idx} className='w-full h-full'>
                            <img src={`https://${specificAd.cid}.ipfs.w3s.link`} className='object-fit w-full h-full' />
                        </div>)
                    })}
                </Carousel>
            </div>
        </div>
    );
};
