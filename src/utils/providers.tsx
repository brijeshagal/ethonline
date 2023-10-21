"use client";
import { useState, ReactNode, useEffect } from "react";
/* <--------------- Rainbow Kit Imports ---------------> */
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
/* <--------------- Wagmi Imports ---------------> */
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygonMumbai,
  scrollSepolia
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
/*<------  Custom Chains imports  ------> */
import "@/utils/customChains";

// Chains setup
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, scrollSepolia],
  [publicProvider()]
);
// Wallet setup
const projectId: string =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";
const { wallets } = getDefaultWallets({
  appName: "Template",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Template",
};
// Connectors & Wallets
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);
// Wagmi Config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface Props {
  children: ReactNode;
}
export function Providers({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={{
          lightMode: lightTheme({ overlayBlur: "small" }),
          darkMode: darkTheme({ overlayBlur: "small" }),
        }}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default Providers;
