# Token-Task
# 🌐 Upgradeable ERC20 Token DApp – Frontend

This is a React + Vite-based frontend for interacting with an **Upgradeable ERC20 Token Smart Contract** deployed on the **Sepolia testnet**. Users can connect their MetaMask wallet, view balances, and perform actions like **mint**, **burn**, and **redeem** tokens.

---

## 🚀 Features

- ✅ MetaMask wallet connection
- ✅ View wallet balance
- ✅ Mint tokens (admin only)
- ✅ Burn tokens (user can burn own tokens)
- ✅ Redeem tokens for rewards
- ✅ Real-time wallet switch detection
- ✅ Sepolia testnet compatible

---

🔗 Wallet & Network
Make sure MetaMask is installed

Connect to the Sepolia testnet

Use test ETH from the Sepolia Faucet

💡 Usage
Connect Wallet – Click on the "Connect Wallet" button.

View Balance – Your token balance will be shown.

Mint Tokens – If you're the admin, enter the address and amount to mint.

Burn Tokens – Enter an amount and click Burn.

Redeem Tokens – Enter the amount and a reward description to redeem.


---

🛠 Built With
React

Vite

Ethers.js

MetaMask

Sepolia Ethereum Testnet


---

## 🧪 Smart Contract Setup (Hardhat)

### 1. Install Hardhat & dependencies

cd Token-task  //(hardhat)
npm install

Create .env file 

SEPOLIA_KEY=" "
PRIVATE_KEY= " "

Compile the contract
  npx hardhat compile

Deploy to Sepolia Testnet
  npx hardhat run scripts/deploy.js --network sepolia


---


💻 Frontend Setup (React + Vite)
1. Go to the frontend folder

cd ../token-frontend
npm install

export const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
export const ABI = [ /* Paste ABI here */ ];

Start development server
npm run dev


---


🦊 MetaMask Setup
Connect MetaMask

Switch to the Sepolia Test Network

Use a wallet with Sepolia test ETH

Interact with the contract


---


