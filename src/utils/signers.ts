import { createWalletClient, http, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { goerli, polygonMumbai } from "viem/chains";
const privAccount = privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_ACCOUNT}`);
export const privSigner = createWalletClient({
  account: privAccount,
  chain: polygonMumbai,
  transport: http(),
});

export const pubClient = createPublicClient({ 
  chain: polygonMumbai,
  transport: http()
});

