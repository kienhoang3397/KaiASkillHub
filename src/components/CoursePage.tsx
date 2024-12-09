import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useContract } from '../context/ContractContext';
import { useLessonStatus } from '../hooks/useLessonStatus';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, Clock, Trophy, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TOAST_CONFIG } from '../config/constants';
import { cn } from '@/lib/utils';

const LessonCard: React.FC<{
  lesson: any;
  index: number;
  isPreviousCompleted: boolean;
  onComplete: () => Promise<void>;
}> = ({ lesson, index, isPreviousCompleted, onComplete }) => {
  const { account } = useContract();
  const { isCompleted, loading } = useLessonStatus(account || '', lesson.id);
  const isLocked = !isPreviousCompleted;

  return (
    <Card className={cn(isLocked && "opacity-75")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-2 rounded-full",
              isCompleted ? "bg-green-100" : "bg-secondary"
            )}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : isLocked ? (
                <Lock className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Trophy className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground">
                {lesson.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {lesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {lesson.exp} XP
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={onComplete}
            disabled={isCompleted || isLocked || loading}
            variant={isCompleted ? "secondary" : "default"}
          >
            {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Complete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { account, completeCourse, completeLesson } = useContract();
  const [loading, setLoading] = useState(false);

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Course not found</p>
        </CardContent>
      </Card>
    );
  }

  const handleCompleteLesson = async (lessonId: number) => {
    if (!account) {
      toast.error('Please connect your wallet first', TOAST_CONFIG.error);
      return;
    }

    setLoading(true);
    try {
      await completeLesson( lessonId);
      toast.success('Lesson completed successfully!', TOAST_CONFIG.success);
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to complete lesson', TOAST_CONFIG.error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteCourse = async () => {
    if (!account) {
      toast.error('Please connect your wallet first', TOAST_CONFIG.error);
      return;
    }

    setLoading(true);
    try {
      await completeCourse( course.certificateURI);
      toast.success('Course completed! Certificate minted.', TOAST_CONFIG.success);
    } catch (error) {
      console.error('Error completing course:', error);
      toast.error('Failed to complete course', TOAST_CONFIG.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {course.lessons.length} lessons
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <course.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {course.lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            index={index}
            isPreviousCompleted={index === 0 || true} // You'll need to implement this logic
            onComplete={() => handleCompleteLesson(lesson.id)}
          />
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Complete Course</h3>
                <p className="text-sm text-muted-foreground">
                  Finish all lessons to earn your certificate
                </p>
              </div>
            </div>
            <Button
              onClick={handleCompleteCourse}
              disabled={loading}
            >
              Claim Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePage;