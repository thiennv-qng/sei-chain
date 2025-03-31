import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { berachainTestnetbArtio } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { berasigWallet } from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "BeraChain retest",
      wallets: [berasigWallet],
    },
  ],
  { appName: "RainbowKit App", projectId: "YOUR_PROJECT_ID" }
);

const config = createConfig({
  connectors,
  chains: [berachainTestnetbArtio],
  transports: {
    [berachainTestnetbArtio.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
