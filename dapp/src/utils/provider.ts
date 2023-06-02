import { ethers, solidityPackedKeccak256, toBeArray } from "ethers";
import { hexChainId, contractAddress, ERC20Abi } from "./constant";

const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(contractAddress, ERC20Abi, provider);

export function hasMetaMask() {
  return !!window.ethereum;
}

export function isRightNetwork() {
  return window.ethereum.chainId == hexChainId;
}

export async function switchNetwork() {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: hexChainId }],
  });
}

export async function tokenDetails() {
  return {
    name: await contract.name(),
    symbol: await contract.symbol(),
    totalSupply: await contract.totalSupply(),
  };
}

export async function connect() {
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}

export async function signCheque(chequeId: string, amount: string, expireAt: number) {
  const signer = await provider.getSigner();
  const messageHash = solidityPackedKeccak256(
    ["address", "uint", "uint", "uint"],
    [await signer.getAddress(), chequeId, amount, expireAt]
  );

  return await signer.signMessage(toBeArray(messageHash))
}
