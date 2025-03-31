import { Chain, Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { EIP1193Provider, Evaluate } from "viem";
import { Connector, createConnector, CreateConnectorFn } from "wagmi";
import { injected } from "wagmi/connectors";

export type WalletProviderFlags =
  | "isApexWallet"
  | "isAvalanche"
  | "isBackpack"
  | "isBeraSig"
  | "isBifrost"
  | "isBitKeep"
  | "isBitski"
  | "isBlockWallet"
  | "isBraveWallet"
  | "isCoinbaseWallet"
  | "isDawn"
  | "isEnkrypt"
  | "isExodus"
  | "isFrame"
  | "isFrontier"
  | "isGamestop"
  | "isHyperPay"
  | "isImToken"
  | "isKuCoinWallet"
  | "isMathWallet"
  | "isMetaMask"
  | "isNestWallet"
  | "isOkxWallet"
  | "isOKExWallet"
  | "isOneInchAndroidWallet"
  | "isOneInchIOSWallet"
  | "isOpera"
  | "isPhantom"
  | "isPortal"
  | "isRabby"
  | "isRainbow"
  | "isStatus"
  | "isTally"
  | "isTokenPocket"
  | "isTokenary"
  | "isTrust"
  | "isTrustWallet"
  | "isXDEFI"
  | "isZerion"
  | "isTalisman"
  | "isZeal"
  | "isCoin98"
  | "isMEWwallet"
  | "isSafeheron"
  | "isSafePal"
  | "__seif";

export type RainbowKitDetails = Omit<Wallet, "createConnector" | "hidden"> & {
  index: number;
  groupIndex: number;
  groupName: string;
  isWalletConnectModalConnector?: boolean;
  isRainbowKitConnector: boolean;
  walletConnectModalConnector?: Connector;
  // Used specifically in `connectorsForWallets` logic
  // to make sure we can also get WalletConnect modal in rainbowkit
  showQrModal?: true;
};

export type CreateConnector = (walletDetails: {
  rkDetails: RainbowKitDetails;
}) => CreateConnectorFn;
export interface DesigWalletOptions {
  projectId?: string;
  chains: Chain[];
}
export type WalletProvider = Evaluate<
  EIP1193Provider & {
    [key in WalletProviderFlags]?: true | undefined;
  } & {
    providers?: any[] | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _events?: { connect?: (() => void) | undefined } | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?:
      | {
          accounts?: string[];
          initialized?: boolean;
          isConnected?: boolean;
          isPermanentlyDisconnected?: boolean;
          isUnlocked?: boolean;
        }
      | undefined;
  }
>;

export type WindowProvider = {
  coinbaseWalletExtension?: WalletProvider | undefined;
  ethereum?: WalletProvider | undefined;
  phantom?: { ethereum: WalletProvider } | undefined;
  providers?: any[] | undefined; // Adjust the type as needed
};

function getWindowProviderNamespace(namespace: string) {
  const providerSearch = (provider: any, namespace: string): any => {
    const [property, ...path] = namespace.split(".");
    const _provider = provider[property];
    if (_provider) {
      if (path.length === 0) return _provider;
      return providerSearch(_provider, path.join("."));
    }
  };
  if (typeof window !== "undefined") return providerSearch(window, namespace);
}
function getExplicitInjectedProvider(flag: WalletProviderFlags) {
  const _window =
    typeof window !== "undefined" ? (window as WindowProvider) : undefined;
  if (typeof _window === "undefined" || typeof _window.ethereum === "undefined")
    return;
  const providers = _window.ethereum.providers;
  return providers
    ? providers.find((provider) => provider[flag])
    : _window.ethereum[flag]
    ? _window.ethereum
    : undefined;
}

function getInjectedProvider({
  flag,
  namespace,
}: {
  flag?: WalletProviderFlags;
  namespace?: string;
}) {
  const _window =
    typeof window !== "undefined" ? (window as WindowProvider) : undefined;
  if (typeof _window === "undefined") return;
  if (namespace) {
    // prefer custom eip1193 namespaces
    const windowProvider = getWindowProviderNamespace(namespace);
    if (windowProvider) return windowProvider;
  }
  const providers = _window.ethereum?.providers;
  if (flag) {
    const provider = getExplicitInjectedProvider(flag);
    if (provider) return provider;
  }
  if (typeof providers !== "undefined" && providers.length > 0)
    return providers[0];
  return _window.ethereum;
}

function createInjectedConnector(provider?: any): CreateConnector {
  return (walletDetails: WalletDetailsParams) => {
    // Create the injected configuration object conditionally based on the provider.
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {};

    return createConnector((config) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}

export function getInjectedConnector({
  flag,
  namespace,
  target,
}: {
  flag?: WalletProviderFlags;
  namespace?: string;
  target?: any;
}): CreateConnectorFn {
  const provider = target ? target : getInjectedProvider({ flag, namespace });
  return createInjectedConnector(provider);
}

export function hasInjectedProvider({
  flag,
  namespace,
}: {
  flag?: WalletProviderFlags;
  namespace?: string;
}): boolean {
  if (namespace && typeof getWindowProviderNamespace(namespace) !== "undefined")
    return true;
  if (flag && typeof getExplicitInjectedProvider(flag) !== "undefined")
    return true;
  return false;
}

export const beraSigWallet = (): Wallet => {
  return {
    id: "berasig",
    name: "BeraSig Wallet",
    iconUrl: async () => (await import("./desigWallet.svg")).default,
    iconBackground: "#ffffff",
    installed: hasInjectedProvider({ namespace: "berasig.ethereum" }),
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.desig.app",
      ios: "https://apps.apple.com/app/desig-wallet/id6450106028",
      qrCode: "https://desig.io",
      mobile: "https://desig.io",
      browserExtension:
        "https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca",
    },
    extension: {
      instructions: {
        steps: [
          {
            description: "wallet_connectors.desig.extension.step1.description",
            step: "install",
            title: "wallet_connectors.desig.extension.step1.title",
          },
          {
            description: "wallet_connectors.desig.extension.step2.description",
            step: "create",
            title: "wallet_connectors.desig.extension.step2.title",
          },
          {
            description: "wallet_connectors.desig.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.desig.extension.step3.title",
          },
        ],
        learnMoreUrl: "https://desig.io",
      },
    },
    createConnector: getInjectedConnector({
      namespace: "berasig.ethereum",
    }),
  };
};
