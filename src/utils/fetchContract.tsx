import { getContract } from '@wagmi/core';
import ABI from '@/contracts/AdvertiseAbi.json';

const contract = getContract({
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    abi: ABI,
})


