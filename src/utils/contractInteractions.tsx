import { writeContract, readContract } from '@wagmi/core'
import ABI from '@/contracts/AdvertiseAbi.json';
import { contractAddresses } from "@/utils/contractAddresses"
import { getNetwork } from '@wagmi/core';
import { useAccount } from 'wagmi';
const { chain } = getNetwork();
export const registerPlatform = async (platformName: string, address: string) => {
    try {
        if (chain && address) {
            const contractAddress = `${contractAddresses[chain.id]}`;
            const { hash } = await writeContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'registerPlatform',
                args: [platformName, chain.id, address],
            });
            console.log(hash);
            return hash;
        }
    }
    catch (e) {
        console.log(e);
    }
}
export const recievePay = async (platformAddress: string) => {
    try {
        if (chain && platformAddress) {
            const contractAddress = `${contractAddresses[chain.id]}`;
            const { hash } = await writeContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'recievePay',
                args: [platformAddress],
            });
            console.log(hash);
            return hash;
        }
    }
    catch (e) {
        console.log(e);
    }
}
export const putAd = async (clicks: string, impressions: string, category: number, description: string, rootCid: string, adName: string, isPermanent: boolean, address: string) => {
    try {
        if (chain && address) {
            const contractAddress = `${contractAddresses[chain.id]}`;
            const costPerClick = await costperClick();
            const costPerImpression = await costperImpression();
            const brokerageCost = await brokerage();
            if (costPerClick && costPerImpression && brokerageCost) {
                const amount: bigint = BigInt(BigInt(clicks) * costPerClick + BigInt(impressions) * costPerImpression + BigInt(brokerageCost));
                const { hash } = await writeContract({
                    address: `0x${contractAddress}`,
                    abi: ABI,
                    functionName: 'putAd',
                    args: [{ clicks, impressions, category, description, rootCid, adName }, address, isPermanent, chain.id],
                    value: amount
                });
                console.log(hash);
                return hash;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

export const brokerage = async () => {
    try {
        if (chain) {
            const contractAddress = `${contractAddresses[80001]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'brokerage',
                args: [],
            })
            console.log("Brokerage: ", data);
            return BigInt(data as string);
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}
export const costperClick = async () => {
    try {
        if (chain) {
            const contractAddress = `${contractAddresses[80001]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'costperClick',
                args: [],
            })
            console.log("Cost Per Click: ", data);
            return BigInt(data as string);
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}
export const costperImpression = async () => {
    try {
        if (chain) {
            const contractAddress = `${contractAddresses[80001]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'costperImpression',
                args: [],
                chainId: 80001
            })
            console.log("Cost Per Impression: ", data);
            return BigInt(data as string);
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}
export const impressionsToClicksRatio = async () => {
    try {
        if (chain) {
            const contractAddress = `${contractAddresses[80001]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'ImpressionsToClicksRatio',
                args: [],
                chainId: 80001
            })
            console.log("ImpressionsToClicksRatio: ", data);
            return BigInt(data as string);
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}

export const getAd = async (adId: number) => {
    try {
        const { address } = useAccount();
        if (chain && address) {
            const contractAddress = `${contractAddresses[80001]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'advertisements',
                args: [address, adId],
            })
            console.log(data);
            return data;
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}

export const platformDetails = async (address: string) => {
    try {
        if (chain) {
            const contractAddress = `${contractAddresses[chain.id]}`;
            const data = await readContract({
                address: `0x${contractAddress}`,
                abi: ABI,
                functionName: 'platforms',
                args: [address],
            })
            console.log("Platform details: ", data);
            return data as any;
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}

export const platformAdDetails = async (adIds: Array<string>, address: string) => {
    try {
        if (chain) {
            const adDetails = [];
            const contractAddress = `${contractAddresses[80001]}`;
            for (let i = 0; i < adIds.length; i++) {
                const data = await readContract({
                    address: `0x${contractAddress}`,
                    abi: ABI,
                    functionName: 'getClicksAndImpressions',
                    args: [address, adIds[i]],
                    chainId: 80001
                })
                adDetails.push({adId: adIds[i], data: data});
            }
            console.log("PlatformAdDetails: ", adDetails);
            return adDetails;
        }
    }
    catch (e) {
        console.log(e);
    }
    return 0;
}