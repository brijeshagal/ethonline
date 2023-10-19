import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";
declare global {
  interface Window {
    ethereum: any;
  }
}

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
