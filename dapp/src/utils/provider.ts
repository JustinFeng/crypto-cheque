import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum)

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ERC20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint)",
  "function balanceOf(address) view returns (uint)",
];

export const tokenContract = new ethers.Contract(tokenAddress, ERC20Abi, provider);