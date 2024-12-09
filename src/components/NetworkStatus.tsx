import React from 'react';
import { AlertCircle } from 'lucide-react';
import { NETWORK } from '../config/constants';

const NetworkStatus: React.FC = () => {
  const [isCorrectNetwork, setIsCorrectNetwork] = React.useState(true);

  React.useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setIsCorrectNetwork(chainId === NETWORK.chainId);

        const handleChainChanged = (chainId: string) => {
          setIsCorrectNetwork(chainId === NETWORK.chainId);
        };

        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
      }
    };

    checkNetwork();
  }, []);

  if (isCorrectNetwork) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
        <p className="text-sm text-yellow-700">
          Please connect to the {NETWORK.chainName} network to use this application.
        </p>
      </div>
    </div>
  );
};

export default NetworkStatus;