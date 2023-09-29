import { useCallback, useState } from "react";
import { JsonRpcProvider } from "ethers";
import { Icon } from "@iconify-icon/react";

const env = {
  privkey: import.meta.env.VITE_PRIV_KEY_EVM,
  pubkey: import.meta.env.VITE_PUB_KEY_EVM,
  address: import.meta.env.VITE_ADDRESS_EVM,
  rpc_devnet: import.meta.env.VITE_RPC_DEVNET_EVM,
  rpc_mainnet: import.meta.env.VITE_RPC_MAINNET_EVM,
};

const Arbitrum = () => {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<JsonRpcProvider | undefined>(
    undefined
  );
  const [balance, setBalance] = useState(0);

  const getProvider = useCallback(async () => {
    try {
      setLoading(true);

      const provider = await new JsonRpcProvider(env.rpc_mainnet);
      console.log("provider - devnet", provider);
      setProvider(provider);
    } catch (er: any) {
      setProvider(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBalance = useCallback(async () => {
    try {
      if (!provider) return;
      setLoading(true);
      const rs = await provider.getBalance(env.address);
      setBalance(Number(rs));
    } catch (er: any) {
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }, [provider]);

  // const generateAddress = () => {
  //   const priv = utils.randomPrivateKey();
  //   const pubkey = getPublicKey(priv);
  //   const address = toEvmAddress(pubkey);
  //   console.log("address ", address);
  //   console.log("pubkey ", encode(pubkey));
  //   console.log("priv", encode(priv));
  // };

  return (
    <div className="p-4 bg-slate-200">
      <h1>Arbitrum</h1>
      <Icon icon="svg-spinners:blocks-shuffle-3" size={32} />
      <Icon icon="svg-spinners:blocks-shuffle-3" size={56} />
      <Icon
        icon="eos-icons:bubble-loading"
        size={14}
        style={{ fontSize: 56 }}
      />
      <Icon icon="et:gears" size={14} style={{ fontSize: 56 }} />
      <Icon
        icon="system-uicons:microphone-muted"
        size={14}
        style={{ fontSize: 56 }}
      />
      <Icon
        icon="line-md:moon-filled-loop"
        size={14}
        style={{ fontSize: 56 }}
      />
      <div>
        <span>Privkey:</span>
        <span>{env.privkey}</span>
      </div>
      <div>
        <span>Pubkey:</span>
        <span>{env.pubkey}</span>
      </div>
      <div>
        <span>Address:</span>
        <span>{env.address}</span>
      </div>

      {provider ? (
        <div>Provider Inactive</div>
      ) : (
        <div>
          Get Provider - Devnet
          <button onClick={getProvider}>
            {loading ? "Loading..." : "Get"}
          </button>
        </div>
      )}

      <div>
        Balance: {balance * 10 ** -18} AGOR
        <button onClick={getBalance} disabled={!provider}>
          {loading ? "Loading..." : "Balance"}
        </button>
      </div>
    </div>
  );
};

export default Arbitrum;
