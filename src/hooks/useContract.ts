import { useContractRead, useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS } from '../config/constants';
import { contractABI } from '../config/contractABI';
import { toast } from 'react-hot-toast';
import { parseAbiItem } from 'viem';

export function useContract() {
  const { data: studentData, isLoading: isLoadingStudent } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getStudentInfo',
  });

  const { writeContract: completeLessonWrite } = useContractWrite({
 
    abi: contractABI,
    functionName: 'completeLesson',
  });

  const { writeContract: completeCourseWrite } = useContractWrite({

    abi: contractABI,
    functionName: 'completeCourse',
  });

  const { writeContract: rewardStudentWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'rewardStudent',
  });

  const completeLesson = async (student: string, lessonId: number) => {
    try {
      const { hash } = await completeLessonWrite({
        args: [student, BigInt(lessonId)],
      });

      const receipt = await useWaitForTransactionReceipt({
        hash,
      });

      if (receipt.status === 'success') {
        toast.success('Lesson completed successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to complete lesson');
      return false;
    }
  };

  const completeCourse = async (student: string, tokenURI: string) => {
    try {
      const { hash } = await completeCourseWrite({
        args: [student, tokenURI],
      });

      const receipt = await useWaitForTransactionReceipt({
        hash,
      });

      if (receipt.status === 'success') {
        toast.success('Course completed successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error completing course:', error);
      toast.error('Failed to complete course');
      return false;
    }
  };

  const rewardStudent = async (student: string) => {
    try {
      const { hash } = await rewardStudentWrite({
        args: [student],
      });

      const receipt = await useWaitForTransactionReceipt({
        hash,
      });

      if (receipt.status === 'success') {
        toast.success('Student rewarded successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error rewarding student:', error);
      toast.error('Failed to reward student');
      return false;
    }
  };

  const isLessonCompleted = async (student: string, lessonId: number) => {
    try {
      const data = await useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'isLessonCompleted',
        args: [student, BigInt(lessonId)],
      });
      return Boolean(data);
    } catch (error) {
      console.error('Error checking lesson completion:', error);
      return false;
    }
  };

  return {
    studentData,
    isLoadingStudent,
    completeLesson,
    completeCourse,
    rewardStudent,
    isLessonCompleted,
  };
}