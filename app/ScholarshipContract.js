import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ScholarshipFund from './contracts/ScholarshipFund.json'; // Import your contract ABI

const ScholarshipContract = () => {
  const [contract, setContract] = useState(null);
  const [totalFunds, setTotalFunds] = useState(0);
  const [scholarCount, setScholarCount] = useState(0);

  useEffect(() => {
    const initContract = async () => {
      try {
        // Connect to MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Load contract
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        const scholarshipContract = new ethers.Contract(contractAddress, ScholarshipFund.abi, signer);
        setContract(scholarshipContract);

        // Example: Fetch total funds
        const funds = await scholarshipContract.getTotalFunds();
        setTotalFunds(funds.toNumber());

        // Example: Fetch scholar count
        const count = await scholarshipContract.scholarCount();
        setScholarCount(count.toNumber());
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initContract();
  }, []);

  const handleDonate = async () => {
    if (!contract) return;

    try {
      const amount = ethers.utils.parseEther('0.1'); // Example: Donate 0.1 ETH
      const tx = await contract.donate({ value: amount });
      await tx.wait();
      console.log('Donation successful');
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  return (
    <div>
      <p>Total Funds: {totalFunds} ETH</p>
      <p>Scholar Count: {scholarCount}</p>

      <button onClick={handleDonate}>Donate 0.1 ETH</button>
    </div>
  );
};

export default ScholarshipContract;
