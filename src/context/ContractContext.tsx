import React, { createContext, useContext } from 'react';
import { useAccount } from 'wagmi';
import { ContractContextType } from '../types/contract';
import { useStudentInfo } from '../hooks/useStudentInfo';
import { useContractOperations } from '../hooks/useContractOperations';
import { useContractRead } from '../hooks/useContractRead';
import { CONTRACT_ADDRESS } from '../config/constants';
import { contractABI } from '../config/contractABI';

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address: account } = useAccount();
  const { studentInfo, error, isLoading } = useStudentInfo();
  const operations = useContractOperations();

  const { data: ownerData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'owner',
    enabled: Boolean(account),
  });

  const isOwner = account && ownerData ? ownerData.toLowerCase() === account.toLowerCase() : false;

  const value: ContractContextType = {
    account: account || null,
    studentInfo,
    isOwner,
    loading: isLoading,
    error,
    ...operations,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};