import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { type Address } from "viem";
import { toast } from "react-hot-toast";
import { TOAST_CONFIG } from "../config/constants";

interface UseContractWriteConfig {
  address: Address;
  abi: any[];
  functionName: string;
}

export function useContractWrite(config: UseContractWriteConfig) {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const write = async (args: any[]) => {
    const toastId = toast.loading(
      "Please confirm the transaction in your wallet..."
    );

    try {
      await writeContract({
        ...config,
        args,
      });

      // Update toast while waiting for confirmation
      toast.loading("Transaction submitted, waiting for confirmation...", {
        id: toastId,
      });

      return { hash, confirmed: isConfirmed };
    } catch (error) {
      console.error("Contract write error:", error);
      toast.error(
        `Transaction failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { id: toastId }
      );
      return { hash: null, confirmed: false };
    }
  };

  return {
    write,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}
