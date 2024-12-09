import { useState, useEffect } from 'react';
import type { Address } from 'viem';
import { useContractRead } from './useContractRead';
import { contractABI } from '../config/contractABI';

const CONTRACT_ADDRESS = '0xc0d904ea59995afb7d85b4716b2f3d70e67da42c' as Address;

export function useOwnerStatus(account?: Address) {
  const [isOwner, setIsOwner] = useState(false);

  const { data: ownerData, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'owner',
    enabled: Boolean(account),
  });

  useEffect(() => {
    if (account && ownerData) {
      setIsOwner(ownerData.toLowerCase() === account.toLowerCase());
    }
  }, [account, ownerData]);

  return { isOwner, isLoading };
}