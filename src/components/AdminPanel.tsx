import React, { useState } from 'react';
import { Shield, CheckCircle, Gift, Award } from 'lucide-react';
import { useContract } from '../context/ContractContext';
import { useAccount } from 'wagmi';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'react-hot-toast';
import { TOAST_CONFIG } from '../config/constants';

const AdminPanel: React.FC = () => {
  const { address } = useAccount();
  const { isOwner, completeLesson, completeCourse, rewardStudent, isLoading, isConfirming } = useContract();
  const [tokenURI, setTokenURI] = useState('');
  const [lessonId, setLessonId] = useState('');

  const handleCompleteLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonId) {
      toast.error('Please enter a lesson ID', TOAST_CONFIG.error);
      return;
    }

    try {
      await completeLesson(parseInt(lessonId));
      setLessonId('');
    } catch (error) {
      console.error('Complete lesson error:', error);
    }
  };

  const handleCompleteCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenURI) {
      toast.error('Please enter a token URI', TOAST_CONFIG.error);
      return;
    }

    try {
      await completeCourse(tokenURI);
      setTokenURI('');
    } catch (error) {
      console.error('Complete course error:', error);
    }
  };

  const handleRewardStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error('Please connect your wallet', TOAST_CONFIG.error);
      return;
    }

    try {
      await rewardStudent(address);
    } catch (error) {
      console.error('Reward student error:', error);
    }
  };

  if (!address || !isOwner) {
    return null;
  }

  const isDisabled = isLoading || isConfirming;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <form onSubmit={handleCompleteLesson} className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">Complete Lesson</h3>
        </div>
        <Input
          type="number"
          placeholder="Lesson ID"
          value={lessonId}
          onChange={(e) => setLessonId(e.target.value)}
          disabled={isDisabled}
          min="0"
        />
        <Button type="submit" disabled={isDisabled || !lessonId}>
          {isConfirming ? 'Confirming...' : isLoading ? 'Processing...' : 'Complete Lesson'}
        </Button>
      </form>

      <form onSubmit={handleCompleteCourse} className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Complete Course</h3>
        </div>
        <Input
          type="text"
          placeholder="Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          disabled={isDisabled}
        />
        <Button type="submit" disabled={isDisabled || !tokenURI}>
          {isConfirming ? 'Confirming...' : isLoading ? 'Processing...' : 'Complete Course'}
        </Button>
      </form>

      <form onSubmit={handleRewardStudent} className="space-y-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Reward Student</h3>
        </div>
        <Button type="submit" disabled={isDisabled}>
          {isConfirming ? 'Confirming...' : isLoading ? 'Processing...' : 'Reward Current Student'}
        </Button>
      </form>
    </Card>
  );
};

export default AdminPanel;