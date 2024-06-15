import {} from 'react';
import MetaMaskIntegration from './MetaMaskIntegration'; // Adjust path as per your project structure
import ScholarshipContract from './ScholarshipContract'; // Adjust path as per your project structure

const App = () => {
  return (
    <div>
      <h1>Ethereum DApp with React and MetaMask</h1>
      <MetaMaskIntegration />
      <ScholarshipContract />
    </div>
  );
};

export default App;
