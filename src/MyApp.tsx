import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiConfig } from "wagmi";

import { connectors, chains, publicClient } from "./walletList.ts";
import App from "./App.tsx";

import "@rainbow-me/rainbowkit/styles.css";

const Demo = () => {
  return (
    <WagmiConfig
      config={createConfig({
        autoConnect: true,
        connectors,
        publicClient,
      })}
    >
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Demo;
