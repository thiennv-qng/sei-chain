import { useCallback, useState } from "react";
import { toBech32 } from "../packages/encoding";
import { rawSecp256k1PubkeyToRawAddress } from "../packages/amino";
import { decode } from "bs58";

const env = {
  privkey: import.meta.env.VITE_PRIV_KEY,
  pubkey: import.meta.env.VITE_PUB_KEY,
};

const SeiChain = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const decodeAddr = decode(env.pubkey);

  const onClick = useCallback(async () => {
    const address = toBech32("sei", rawSecp256k1PubkeyToRawAddress(decodeAddr));

    setWalletAddress(address);
  }, [decodeAddr]);

  return (
    <div>
      SeiChain
      <p>Privkey: {env.privkey}</p>
      <p>Pubkey: {env.pubkey}</p>
      <p>Address: {walletAddress}</p>
      <button onClick={onClick}>Get Wallet Address</button>
    </div>
  );
};

export default SeiChain;
