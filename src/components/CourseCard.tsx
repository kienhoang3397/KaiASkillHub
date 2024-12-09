import React from 'react';
import { Course } from '../data/courses';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <course.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {course.lessons.length} lessons
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{course.description}</p>
        <Button 
          className="w-full"
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Course
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;