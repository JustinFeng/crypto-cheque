import { ethers, solidityPackedKeccak256, toBeArray } from "ethers";
import { hexChainId, contractAddress, abi } from "./constant";

const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

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
  return await provider.send("eth_requestAccounts", []);
}

export async function getAccounts() {
  return await provider.send("eth_accounts", []);
}

export async function signCheque(
  chequeId: string,
  amount: string,
  expireAt: number
) {
  const signer = await provider.getSigner();
  const drawer = await signer.getAddress();
  const messageHash = solidityPackedKeccak256(
    ["address", "uint", "uint", "uint"],
    [drawer, chequeId, amount, expireAt]
  );

  const signature = await signer.signMessage(toBeArray(messageHash));

  return {
    drawer,
    chequeId,
    amount,
    expireAt,
    signature,
  };
}

interface CryptoCheque {
  drawer: string;
  chequeId: string;
  amount: string;
  expireAt: number;
  signature: string;
}

export async function depositCheque({
  drawer,
  chequeId,
  amount,
  expireAt,
  signature,
}: CryptoCheque) {
  const writeContract = new ethers.Contract(
    contractAddress,
    abi,
    await provider.getSigner()
  );

  await writeContract.deposit(drawer, chequeId, amount, expireAt, signature);
}

export async function listenToTransferEvent(
  onTransfer: (from: string, to: string, amount: number, id: string) => void
) {
  contract.on("Transfer", (from, to, amount) => {
    onTransfer(from, to, amount, `${from.slice(-7)}-${to.slice(-7)}-${Date.now()}`);
  });
}

export function listenToAccountsChanged(onAccountsChanged: (accounts: [string]) => void) {
  window.ethereum.on('accountsChanged', onAccountsChanged)
}
