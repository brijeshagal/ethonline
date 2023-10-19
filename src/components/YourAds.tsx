import React from 'react'
import { Web3Storage } from 'web3.storage';
import Ad from './Ad';

const YourAds = () => {
    const rootCid = 'bafybeia7d3qmtqunuxme4sq3tkgjtt3q5fhatzhdgmcozkoskyetcm52ru';
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE });
    const [myAds, setMyAds] = React.useState<Array<any>>([]);

    return (
        <div>
            <Ad rootCid={rootCid}/>
        </div>
    )
}

export default YourAds