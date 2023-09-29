// @ts-nocheck
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { createStorage } from "@wagmi/core";
import { arbitrum, mainnet, polygon, goerli, sepolia } from "@wagmi/chains";
import {
  InjectedConnectorOptions,
  InjectedConnector,
} from "@wagmi/connectors/injected";

import { DesigWalletConnector } from "./desigConnector";
const chains = [arbitrum, mainnet, polygon, sepolia, goerli];

const projectId = "7cf57bc277cddeed55a75ce830b9d6f3";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const getProvider = () =>
  typeof window !== "undefined" ? (window as any).desig?.ethereum : undefined;

const injectedOption: InjectedConnectorOptions = {
  getProvider,
  name: "Desig Wallet",
};

const desigWallet = new InjectedConnector({
  chains,
  options: injectedOption,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [...w3mConnectors({ projectId, chains }), desigWallet],
  publicClient,
  storage: createStorage({
    storage: window.localStorage,
  }),
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WCModal = () => {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <div>
          <button>
            <h1 onClick={() => window.open("https://google.com", "_blank")}>
              Wallet connect
            </h1>
            <div>Click</div>
          </button>
          <a href="https://google.com" target="_blank">
            <h1 onClick={() => window.open("https://google.com", "_blank")}>
              Wallet connect
            </h1>
            <div>Click</div>
          </a>
          <Web3Button />
        </div>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        walletImages={{
          customDesktopWallet:
            "https://desig.io/_next/static/media/qr-code.41323810.png",
        }}
        explorerExcludedWalletIds={[
          "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
          "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
          "ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18",
          "ef333840daf915aafdc4a004525502d6d49d77bd9c65e0642dbaefb3c2893bef",
          "bc949c5d968ae81310268bf9193f9c9fb7bb4e1283e1284af8f2bd4992535fd6",
          "74f8092562bd79675e276d8b2062a83601a4106d30202f2d509195e30e19673d",
          "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
        ]}
      />
    </div>
  );
};

export default WCModal;
