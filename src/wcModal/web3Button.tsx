import { useWeb3Modal } from "@web3modal/react";

const Web3Button = () => {
  const { open } = useWeb3Modal();
  return <button onClick={open}>Wallet connect</button>;
};

export default Web3Button;
