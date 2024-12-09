import { useContractRead as useWagmiContractRead } from "wagmi";
import { Address } from "viem";
import { toast } from "react-hot-toast";
import { TOAST_CONFIG } from "../config/constants";

interface UseContractReadConfig {
  address: Address;
  abi: any[];
  functionName: string;
  args?: any[];
  enabled?: boolean;
}

export function useContractRead(config: UseContractReadConfig) {
  const { address, abi, functionName, args = [], enabled = true } = config;

  return useWagmiContractRead({
    address,
    abi,
    functionName,
    args,
    query: {
      enabled,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 30000,
      cacheTime: 300000,
      onError: (error) => {
        console.error(`Contract read error (${functionName}):`, error);
        toast.error(
          `Failed to read contract data: ${error.message}`,
          TOAST_CONFIG.error
        );
      },
    },
  });
}
