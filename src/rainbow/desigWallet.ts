import { Chain, Wallet } from "@rainbow-me/rainbowkit";
import { InjectedConnector } from "wagmi/connectors/injected";

export interface DesigWalletOptions {
  projectId?: string;
  chains: Chain[];
}

const getProvider = () => {
  const provider = (window as any)?.desig?.ethereum;
  console.log("getProvider", provider);
  console.log("first,", window.ethereum);
  return provider;
};

export const desigWallet = ({
  chains,
  ...options
}: DesigWalletOptions & any): Wallet => {
  return {
    id: "desig",
    name: "Desig Wallet 12",
    iconUrl: async () => (await import("./desigWallet.svg")).default,
    iconBackground: "#ffffff",
    installed: true,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.desig.app",
      ios: "https://apps.apple.com/app/desig-wallet/id6450106028",
      browserExtension:
        "https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca",
    },

    createConnector: () => ({
      connector: new InjectedConnector({ options: { getProvider } }),
    }),
  };
};
