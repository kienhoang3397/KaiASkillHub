import React from 'react';
import { Trophy, Book, Award, TrendingUp } from 'lucide-react';
import { useStudentInfo } from '../hooks/useStudentInfo';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { cn } from '@/lib/utils';
import { XP_CONFIG, ACHIEVEMENT_LEVELS } from '../config/constants';

const StudentDashboard: React.FC = () => {
  const { studentInfo, error } = useStudentInfo();

  // if (loading) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle className="text-muted-foreground">Loading student information...</CardTitle>
  //       </CardHeader>
  //     </Card>
  //   );
  // }

  if (error || !studentInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            {error || "Please connect your wallet to view your progress."}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Calculate progress to next level
  const xpForNextLevel = (studentInfo.level + 1) * XP_CONFIG.xpPerLevel;
  const progress = Math.floor((studentInfo.exp % XP_CONFIG.xpPerLevel) / XP_CONFIG.xpPerLevel * 100);

  // Determine achievement level
  const achievementLevel = Object.values(ACHIEVEMENT_LEVELS).find(
    level => studentInfo.level >= level.minLevel &&
      (!level.maxLevel || studentInfo.level <= level.maxLevel)
  ) || ACHIEVEMENT_LEVELS.BEGINNER;

  const stats = [
    {
      title: 'Level',
      value: studentInfo.level,
      icon: Book,
      color: achievementLevel.color,
      description: `${achievementLevel.name} Level Student`,
    },
    {
      title: 'Experience',
      value: studentInfo.exp,
      icon: Award,
      color: 'text-green-500',
      description: `${xpForNextLevel - studentInfo.exp} XP to next level`,
    },
    {
      title: 'Completed Lessons',
      value: studentInfo.completedLessons.filter(Boolean).length,
      icon: Trophy,
      color: 'text-yellow-500',
      description: 'Total lessons completed',
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className={cn("w-6 h-6", achievementLevel.color)} />
            <CardTitle>{achievementLevel.name} Student</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">
              {progress}% to Level {studentInfo.level + 1}
            </span>
          </div>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <HoverCard key={stat.title}>
              <HoverCardTrigger>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn("p-2 rounded-lg bg-muted")}>
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                      </div>
                      <h3 className="text-lg font-semibold">{stat.title}</h3>
                    </div>
                    <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold">{stat.title}</h4>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;