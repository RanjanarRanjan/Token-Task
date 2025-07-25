import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contract";

export default function TokenActions() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [burnHistory, setBurnHistory] = useState([]);
  const [redeemHistory, setRedeemHistory] = useState([]);
  const [mintHistory, setMintHistory] = useState([]);

  // Initialize wallet and contract
  const init = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const rawBalance = await tokenContract.balanceOf(userAddress);
    const decimals = await tokenContract.decimals();
    const formattedBalance = ethers.formatUnits(rawBalance, decimals);

    setSigner(signer);
    setContract(tokenContract);
    setAddress(userAddress);
    setBalance(formattedBalance);
  };

  useEffect(() => {
    init();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", init);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", init);
      }
    };
  }, []);

  const refreshBalance = async () => {
    if (!contract || !address) return;
    const rawBalance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    setBalance(ethers.formatUnits(rawBalance, decimals));
  };

  const mint = async () => {
    const toAddress = prompt("Enter recipient address to mint to:");
    const amount = prompt("Enter amount to mint:");

    if (!ethers.isAddress(toAddress)) return alert("Invalid address");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    try {
      const tx = await contract.mint(toAddress, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert(`Minted ${amount} MTK to ${toAddress}`);
      refreshBalance();
      setMintHistory(prev => [
        ...prev,
        {
          to: toAddress,
          amount,
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Mint failed. Are you the contract owner?");
    }
  };

  const burn = async () => {
    const amount = prompt("Enter amount to burn:");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    try {
      const tx = await contract.burn(ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Burned successfully!");
      refreshBalance();
      setBurnHistory(prev => [...prev, { amount, timestamp: new Date().toLocaleString() }]);
    } catch (err) {
      console.error(err);
      alert("Burn failed.");
    }
  };

  const redeem = async () => {
    const amount = prompt("Enter amount to redeem:");
    const reward = prompt("Enter reward description:");
    if (!amount || !reward || isNaN(amount)) return alert("Invalid input");

    try {
      const tx = await contract.redeem(ethers.parseUnits(amount, 18), reward);
      await tx.wait();
      alert("Redeemed successfully!");
      refreshBalance();
      setRedeemHistory(prev => [
        ...prev,
        { amount, reward, timestamp: new Date().toLocaleString() },
      ]);
    } catch (err) {
      console.error(err);
      alert("Redeem failed.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Connected Address:</h2>
      <p className="break-words text-gray-700 mb-2">{address}</p>
      <p className="mb-4 font-bold">Balance: {balance} MTK</p>

      <div className="flex flex-col gap-2 mb-4">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={mint}>Mint</button>
        <button className="bg-red-500 text-white p-2 rounded" onClick={burn}>Burn</button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={redeem}>Redeem</button>
        <button className="bg-gray-600 text-white p-2 rounded" onClick={refreshBalance}>Check Balance</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">🔥 Burn History:</h3>
        {burnHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No burns yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            {burnHistory.map((entry, i) => (
              <li key={i}>Burned {entry.amount} MTK on {entry.timestamp}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">🎁 Redeem History:</h3>
        {redeemHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No redemptions yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            {redeemHistory.map((entry, i) => (
              <li key={i}>Redeemed {entry.amount} MTK for "{entry.reward}" on {entry.timestamp}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">🪙 Mint History:</h3>
        {mintHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No mints yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            {mintHistory.map((entry, i) => (
              <li key={i}>Minted {entry.amount} MTK to {entry.to} on {entry.timestamp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
