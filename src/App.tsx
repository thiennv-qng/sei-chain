import { ConnectButton } from "@rainbow-me/rainbowkit";
import { JsonRpcProvider } from "ethers";
import { useCallback } from "react";

const goerliUrl =
  "https://goerli.infura.io/v3/93597110afce4130a8f962c0abf2f73c";
const sepolia = "https://sepolia.infura.io/v3/93597110afce4130a8f962c0abf2f73c";

const App = () => {
  const provider = new JsonRpcProvider(sepolia);
  console.log("provider", provider);

  const getBalance = useCallback(async () => {
    const rs = await provider.getBalance(
      "0x35bd86bfbf05519768d351f5865213bf617acf7c"
    );
    console.log("rs: ", rs);
  }, [provider]);

  return (
    <div>
      <ConnectButton />
      <button onClick={getBalance}>get balance</button>
    </div>
  );
};

export default App;
