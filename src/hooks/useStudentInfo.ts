import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { StudentInfo } from "../types/contract";
import { useContractRead } from "./useContractRead";
import { CONTRACT_ADDRESS } from "../config/constants";
import { contractABI } from "../config/contractABI";
import { useQuery } from "@tanstack/react-query";

export function useStudentInfo(studentAddress?: Address) {
  const { address: account } = useAccount();
  const [error, setError] = useState<string | null>(null);

  const targetAddress = studentAddress || account;

  const { data: studentData, isLoading } = useQuery({
    queryKey: ["studentInfo", targetAddress],
    queryFn: async () => {
      const { data } = await useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "getStudentInfo",
        args: targetAddress ? [targetAddress] : undefined,
        enabled: Boolean(targetAddress),
      });
      return data;
    },
    enabled: Boolean(targetAddress),
    staleTime: 5000, // Consider data stale after 5 seconds
    cacheTime: 30000, // Keep data in cache for 30 seconds
  });

  const processStudentData = (data: any): StudentInfo | null => {
    if (!data) return null;
    try {
      const [level, exp] = data as [bigint, bigint];
      return {
        level: Number(level),
        exp: Number(exp),
        completedLessons: [],
      };
    } catch (err) {
      console.error("Error parsing student info:", err);
      setError("Error processing student information");
      return null;
    }
  };

  const studentInfo = processStudentData(studentData);

  return {
    studentInfo,
    error,
    isLoading,
  };
}
