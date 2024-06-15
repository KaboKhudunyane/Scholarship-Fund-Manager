import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskIntegration = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed and accessible
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Request access to accounts
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
        })
        .catch(error => console.error(error));
    } else {
      console.error('MetaMask not detected');
    }
  }, []);

  const handleSignMessage = async () => {
    if (!provider) return;

    try {
      const signer = provider.getSigner();
      const message = "Sign this message to verify your identity";
      const signature = await signer.signMessage(message);
      console.log('Signature:', signature);
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>Connect MetaMask</button>
      )}

      <button onClick={handleSignMessage}>Sign Message</button>
    </div>
  );
};

export default MetaMaskIntegration;
