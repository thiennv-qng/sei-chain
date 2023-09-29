import { decode } from "bs58";
import { useCallback, useState } from "react";
import { toCosmosAddress } from "../cosmos/toCosmosAddress";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "../packages/proto-signing";

const env = {
  privkey: import.meta.env.VITE_PRIV_KEY,
  pubkey: import.meta.env.VITE_PUB_KEY,
};

const _rpc_atl = "https://rpc.atlantic-2.seinetwork.io/";
const _rpc_mainnet = "https://sei-rpc.polkachu.com";

const SeiChain = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [csmClient, setCsmClient] = useState<CosmWasmClient>();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBl, setLoadingBl] = useState(false);
  const decodeAddr = decode(env.pubkey);

  const createClient = useCallback(async () => {
    try {
      setLoading(true);
      DirectSecp256k1HdWallet;
      const client = await CosmWasmClient.connect(_rpc_mainnet);
      const balance = await client.getChainId();

      console.log("balance ", balance);
      setCsmClient(client);
    } catch (er) {
      console.log("err: ", er);
      setCsmClient(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCsmBalance = useCallback(async () => {
    try {
      if (!csmClient) return;
      setLoadingBl(true);
      const { amount } = await csmClient.getBalance(walletAddress, "sei");
      const codes = await csmClient.getSequence(walletAddress);

      console.log("amount ", amount);
      console.log("codes ", codes);

      setBalance(Number(amount));
    } catch (er) {
      console.log("error: ", er);
      setBalance(0);
    } finally {
      setLoadingBl(false);
    }
  }, [csmClient, walletAddress]);

  const onClick = useCallback(async () => {
    const address = toCosmosAddress(decodeAddr, "sei");
    setWalletAddress(address);
  }, [decodeAddr]);

  return (
    <div>
      SeiChain
      <p>Privkey: {env.privkey}</p>
      <p>Pubkey: {env.pubkey}</p>
      <p>Address: {walletAddress}</p>
      {loadingBl && <p>Loading balance...</p>}
      <p>Balance: {balance}</p>
      {loading && <p>Loading client...</p>}
      {csmClient ? <p>Activity: {_rpc_mainnet}</p> : <p>Disabled</p>}
      <button onClick={onClick}>Get Wallet Address</button>
      <button onClick={createClient}>Create Client</button>
      <button onClick={getCsmBalance}>Get Balance</button>
    </div>
  );
};

export default SeiChain;
