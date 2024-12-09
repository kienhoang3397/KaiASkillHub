import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useContractWrite } from "./useContractWrite";
import { CONTRACT_ADDRESS } from "../config/constants";
import { contractABI } from "../config/contractABI";
import { toast } from "react-hot-toast";
import { TransactionLink } from "../components/TransactionLink";

export function useContractOperations() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const completeLessonWrite = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "completeLesson",
  });

  const completeCourseWrite = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "completeCourse",
  });

  const rewardStudentWrite = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "rewardStudent",
  });

  // Invalidate queries and update UI after successful transactions
  const handleSuccess = async (hash: `0x${string}`) => {
    // Invalidate all relevant queries to trigger refetch
    await queryClient.invalidateQueries({ queryKey: ["studentInfo"] });
    await queryClient.invalidateQueries({ queryKey: ["lessonStatus"] });

    // Show success toast with transaction link
    toast.success(`Transaction successful! ${hash}`, { duration: 5000 });
  };

  // Watch for confirmed transactions
  useEffect(() => {
    if (completeLessonWrite.isConfirmed && completeLessonWrite.hash) {
      handleSuccess(completeLessonWrite.hash);
    }
    if (completeCourseWrite.isConfirmed && completeCourseWrite.hash) {
      handleSuccess(completeCourseWrite.hash);
    }
    if (rewardStudentWrite.isConfirmed && rewardStudentWrite.hash) {
      handleSuccess(rewardStudentWrite.hash);
    }
  }, [
    completeLessonWrite.isConfirmed,
    completeCourseWrite.isConfirmed,
    rewardStudentWrite.isConfirmed,
    completeLessonWrite.hash,
    completeCourseWrite.hash,
    rewardStudentWrite.hash,
  ]);

  const completeLesson = async (lessonId: number) => {
    setLoading(true);
    try {
      const result = await completeLessonWrite.write([BigInt(lessonId)]);
      return result.confirmed;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const completeCourse = async (tokenURI: string) => {
    setLoading(true);
    try {
      const result = await completeCourseWrite.write([tokenURI]);
      return result.confirmed;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rewardStudent = async (student: string) => {
    setLoading(true);
    try {
      const result = await rewardStudentWrite.write([student]);
      return result.confirmed;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    completeCourse,
    completeLesson,
    rewardStudent,
    isLoading:
      loading ||
      completeLessonWrite.isPending ||
      completeCourseWrite.isPending ||
      rewardStudentWrite.isPending,
    isConfirming:
      completeLessonWrite.isConfirming ||
      completeCourseWrite.isConfirming ||
      rewardStudentWrite.isConfirming,
  };
}
