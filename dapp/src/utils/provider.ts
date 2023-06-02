import { ethers } from "ethers";
import { hexChainId, contractAddress, ERC20Abi } from "./constant";

const provider = new ethers.BrowserProvider(window.ethereum);

export function hasMetaMask() {
  return !!window.ethereum;
}

export function isRightNetwork() {
  return window.ethereum.chainId == hexChainId;
}

export async function switchNetwork() {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: hexChainId }],
  });
}

export const tokenContract = new ethers.Contract(
  contractAddress,
  ERC20Abi,
  provider
);
