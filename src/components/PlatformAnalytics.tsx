import { platformAdDetails, recievePay } from '@/utils/contractInteractions';
import axios from 'axios';
import React from 'react'
import { useAccount } from 'wagmi';
import PieChart from './PieChart';
import BarChart from './BarChart';

import { data } from "@/components/data";
interface PlatformAnalyticsProps {
    details: Array<any>;
}
const PlatformAnalytics = ({ details }: PlatformAnalyticsProps) => {

    const { address } = useAccount();
    const [analystics, setAnalytics] = React.useState<any>([]);
    const [adDetails, setAdDetails] = React.useState<any>([]);
    const platformDetailsQuery = `query platformDetailsQuery{
        platformEarnings(first: 1, orderBy: blockNumber, orderDirection: desc, where: {platformAddress: "${address}"}) {          
            platformAddress
            activeAdEarning
            totalEarning
        }
      }`;
    const platformAdQuery = `query platformAdQuery {
        platformEarnings(
          first: 10
          orderBy: activeAdEarning
          orderDirection: desc
          where: {platformAddress: "${address}"}
        ) {
          platformAddress
          adId
          activeAdEarning
          totalEarning
        }
      }`;
    const handleWithdrawEarning = async () => {
        try {
            if (address) {
                const res = await recievePay(address);
                console.log(res);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async function fetchAdDtails(adIds: Array<string>) {
        if (address) {
            const response = await platformAdDetails(adIds, address);
            console.log(response);
            setAdDetails(response);
        }
    }
    React.useEffect(() => {
        async function fetch() {
            try {
                const res = await axios.post('https://api.studio.thegraph.com/query/54418/adroll/version/latest', {
                    query: platformAdQuery
                });
                console.log(res.data.data.platformEarnings);
                setAnalytics(res.data.data.platformEarnings);
                const adIds = [];
                for (let i = 0; i < res.data.data.platformEarnings.length; i++) {
                    adIds.push(res.data.data.platformEarnings[i].adId);
                }
                fetchAdDtails(adIds);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetch();
        return () => {

        }
    }, [])

    return (
        <div className=' text-gray-300 mt-10 shadow-lg '>{details && (
            <div className='flex flex-wrap justify-center mt-10'>
                {adDetails && <div className='w-fit mx-auto'><BarChart data={adDetails} /></div>}
                <div className='flex gap-4 p-4 mx-auto'>
                    <div className='flex flex-col border-[1px] shadow-gray-400 shadow-lg rounded-xl p-4  gap-10'>
                        <div>
                            {details[1] && <div>All time Earning: ~${String(details[1] / BigInt(1633 * (10 ** 18)))} ({String(details[1])} wei)</div>}
                        </div>
                        <div>
                            {details[0] && <div>Active Earning:  ~${String(details[0] / BigInt(1633 * (10 ** 18)))} ({String(details[0])} wei)</div>}
                        </div>
                        <div className=''>
                            <button className='p-2 rounded bg-purple-600' onClick={handleWithdrawEarning}>Withdraw Earning</button>
                        </div>
                    </div>
                    {/* <PieChart chartData={""} /> */}
                </div>
            </div>
        )
        }
            
        </div>
    )
}

export default PlatformAnalytics