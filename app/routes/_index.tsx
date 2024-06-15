import { useState, useEffect } from "react";
import { getContract } from "../utils/ScholarshipFund";
import { ethers } from "ethers";

export default function Index() {
  const [totalFunds, setTotalFunds] = useState("0");
  const [scholars, setScholars] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amountDonate, setAmountDonate] = useState("0");
  const [scholarIdAllocate, setScholarIdAllocate] = useState("0");
  const [amountAllocate, setAmountAllocate] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    refreshTotalFunds();
    refreshScholars();
  }, []);

  const refreshTotalFunds = async () => {
    try {
      const contract = getContract();
      const funds = await contract.getTotalFunds();
      setTotalFunds(ethers.utils.formatEther(funds));
    } catch (error) {
      console.error("Error fetching total funds:", error);
      setError("Failed to fetch total funds. Please try again.");
    }
  };

  const refreshScholars = async () => {
    try {
      const contract = getContract();
      const scholarsCount = await contract.scholarCount();
      const scholarsList = [];
      for (let i = 1; i <= scholarsCount; i++) {
        const scholar = await contract.scholars(i);
        scholarsList.push(scholar);
      }
      setScholars(scholarsList);
    } catch (error) {
      console.error("Error fetching scholars:", error);
      setError("Failed to fetch scholars list. Please try again.");
    }
  };

  const handleRegisterScholar = async () => {
    try {
      setLoading(true);
      const contract = getContract();
      await contract.registerScholar(name, email);
      setName("");
      setEmail("");
      await refreshScholars();
    } catch (error) {
      console.error("Error registering scholar:", error);
      setError("Failed to register scholar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    try {
      setLoading(true);
      const contract = getContract();
      await contract.donate({ value: ethers.utils.parseEther(amountDonate) });
      setAmountDonate("0");
      await refreshTotalFunds();
    } catch (error) {
      console.error("Error donating:", error);
      setError("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAllocateFunds = async () => {
    try {
      setLoading(true);
      const contract = getContract();
      await contract.allocateFunds(scholarIdAllocate, ethers.utils.parseEther(amountAllocate));
      setScholarIdAllocate("0");
      setAmountAllocate("0");
      await refreshScholars();
    } catch (error) {
      console.error("Error allocating funds:", error);
      setError("Failed to allocate funds. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Decentralized Scholarship Fund</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Total Funds: {totalFunds} ETH</h2>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Register Scholar</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleRegisterScholar} className={`bg-blue-500 text-white p-2 ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Donate</h2>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amountDonate}
          onChange={(e) => setAmountDonate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleDonate} className={`bg-green-500 text-white p-2 ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
          {loading ? 'Donating...' : 'Donate'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Allocate Funds</h2>
        <input
          type="text"
          placeholder="Scholar ID"
          value={scholarIdAllocate}
          onChange={(e) => setScholarIdAllocate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amountAllocate}
          onChange={(e) => setAmountAllocate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleAllocateFunds} className={`bg-yellow-500 text-white p-2 ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
          {loading ? 'Allocating...' : 'Allocate'}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Scholars List</h2>
        <ul>
          {scholars.map((scholar, index) => (
            <li key={index}>
              <p>Name: {scholar.name}</p>
              <p>Email: {scholar.email}</p>
              <p>Amount Awarded: {ethers.utils.formatEther(scholar.amountAwarded)} ETH</p>
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
