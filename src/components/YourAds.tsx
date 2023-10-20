import React, { use, useEffect } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios';
import AdDetails from './AdDetails';

const YourAds = () => {
    // const rootCid = 'bafybeia7d3qmtqunuxme4sq3tkgjtt3q5fhatzhdgmcozkoskyetcm52ru';
    const { address: advertisor } = useAccount();
    const [myAds, setMyAds] = React.useState<Array<any>>([]);
    const [loader, setLoader] = React.useState<boolean>(true);
    useEffect(() => {
        const queryResult = async () => {
            setLoader(true);
            const query = `query GetAds{            
                adPuts(first: 5, where: {advertisor:"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"}) {
                    id
                    advertisor
                    adId
                    clicks
                    cid
                  }    
            }`
            const res = await axios.post("https://api.studio.thegraph.com/query/54418/adroll/v0.0.2", { query: query })
            console.log(res);
            setMyAds(res.data.data.adPuts);
            setLoader(false);
        }
        return () => {

            if (advertisor) {
                queryResult();
            }
        }
    }, []);
    return (
        <div className="">
            {loader ? <></> :
                myAds.map((ad: any, idx) => {
                    return (<div key={idx}>
                        <AdDetails ad={ad} />
                    </div>)
                })
            }
        </div>
    )
}

export default YourAds