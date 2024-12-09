import { useState, useEffect } from "react";
import type { Address } from "viem";

import { CONTRACT_ADDRESS } from "../config/constants";
import { contractABI } from "../config/contractABI";
import { useContractRead } from "./useContractRead";

export function useLessonStatus(student: string, lessonId: number) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: "isLessonCompleted",
    args: [student, BigInt(lessonId)],
    enabled: Boolean(student && lessonId),
  });

  useEffect(() => {
    if (!isLoading) {
      setIsCompleted(Boolean(data));
      setLoading(false);
    }
  }, [data, isLoading]);

  return { isCompleted, loading };
}
