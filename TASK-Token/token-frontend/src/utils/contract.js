import { ethers } from "ethers";


export const CONTRACT_ADDRESS = "0x3b3f5A69b369e19AD09c9d921ce1bf589DcfC53f";

// ABI of MyToken contract (shortened for readability)
export const CONTRACT_ABI = [
  "function mint(address to, uint256 amount) public",
  "function burn(uint256 amount) public",
  "function redeem(uint256 amount, string reward) public",
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];
