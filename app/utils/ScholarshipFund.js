import { ethers } from "ethers";

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract address
const abi = [
  // Replace with your contract ABI
  {
    "inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_email","type": "string"}],
    "name": "registerScholar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_scholarId","type": "uint256"},{"internalType": "uint256","name": "_amount","type": "uint256"}],
    "name": "allocateFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalFunds",
    "outputs": [{"internalType": "uint256","name":"","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_scholarId","type": "uint256"}],
    "name": "getScholar",
    "outputs": [{"internalType": "struct ScholarshipFund.Scholar","name":"","type": "tuple","components": [{"internalType": "uint256","name":"id","type": "uint256"},{"internalType": "string","name":"name","type": "string"},{"internalType": "string","name":"email","type": "string"},{"internalType": "uint256","name":"amountAwarded","type": "uint256"},{"internalType": "bool","name":"isRegistered","type": "bool"}]}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getContract = () => {
  if (!window.ethereum) throw new Error("No crypto wallet found. Please install it.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};
