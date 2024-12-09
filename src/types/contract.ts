export interface StudentInfo {
  level: number;
  exp: number;
  completedLessons: boolean[];
}

export interface ContractContextType {
  account: string | null;
  studentInfo: StudentInfo | null;
  isOwner: boolean;
  loading: boolean;
  error: string | null;
  completeCourse: (tokenURI: string) => Promise<boolean>;
  completeLesson: (lessonId: number) => Promise<boolean>;
  rewardStudent: (student: string) => Promise<boolean>;
}
