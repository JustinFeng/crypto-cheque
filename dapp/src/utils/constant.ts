export const chainId = process.env.NEXT_PUBLIC_CHAIN_ID!!;
export const contractAddress = process.env.NEXT_PUBLIC_CRYPTO_CHEQUE_TOKEN_ADDRESS!!;

export const ERC20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint)",
  "function balanceOf(address) view returns (uint)",
];

export const hexChainId = `0x${Number(chainId).toString(16)}`
