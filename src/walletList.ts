import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { desigWallet } from "./desigWallet";
import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";

const projectId = "7cf57bc277cddeed55a75ce830b9d6f3";
const apiKey = "sykTi0RClNWjk-fw5pS_FAh8i2txKfGe";

const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      desigWallet({ chains: [] }),
      phantomWallet({ chains: [] }),
      // rabbyWallet({ chains: [] }),
    ],
  },
]);

export { chains, connectors, publicClient };
