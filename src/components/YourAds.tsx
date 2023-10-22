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
            if (advertisor) {
                try {

                    setLoader(true);
                    const query = `query GetAds{            
                        adPuts(first: 5, where: {advertisor:"${advertisor}"}) {
                            id
                            advertisor
                    adId
                    clicks
                    impressionsF
                    cid
                    adName
                }    
            }`
                    const res = await axios.post("https://api.studio.thegraph.com/query/54418/adroll/version/latest", { query: query })
                    console.log(res);
                    if (res.data.data.adPuts.length !== 0) {
                        setMyAds(res.data.data.adPuts);
                        setLoader(false);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
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
                <div className='flex justify-center items-center gap-5'>
                    {myAds.map((ad: any, idx) => {
                        return (<div key={idx}>
                            <AdDetails ad={ad} />
                        </div>)
                    })}
                </div>
            }
        </div>
    )
}

export default YourAds