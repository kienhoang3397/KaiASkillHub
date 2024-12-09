import React from 'react';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen } from 'lucide-react';

const CourseList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <CardTitle>Available Courses</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;