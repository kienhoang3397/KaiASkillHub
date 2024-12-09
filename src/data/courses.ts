import { BookOpen, Code, Database, Network, Shield, Terminal } from 'lucide-react';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  exp: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  icon: any;
  lessons: Lesson[];
  certificateURI: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology",
    icon: Network,
    certificateURI: "ipfs://QmXxz6XgbwKLqzqEQFnvYAXqJkMvgCTyZnp1yxCYzPBCRx/1",
    lessons: [
      {
        id: 1021,
        title: "Introduction to Blockchain",
        description: "Understanding the basics of blockchain technology",
        duration: "45 min",
        exp: 50,
      },
      {
        id: 101,
        title: "Introduction to Blockchain",
        description: "Understanding the basics of blockchain technology",
        duration: "45 min",
        exp: 50,
      },
      {
        id: 102,
        title: "Cryptography Basics",
        description: "Learn about public/private keys and hashing",
        duration: "60 min",
        exp: 75,
      },
      {
        id: 103,
        title: "Consensus Mechanisms",
        description: "Explore different consensus algorithms",
        duration: "90 min",
        exp: 100,
      },
    ],
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Master the art of writing secure smart contracts",
    icon: Code,
    certificateURI: "ipfs://QmXxz6XgbwKLqzqEQFnvYAXqJkMvgCTyZnp1yxCYzPBCRx/2",
    lessons: [
      {
        id: 201,
        title: "Solidity Basics",
        description: "Introduction to Solidity programming",
        duration: "60 min",
        exp: 75,
      },
      {
        id: 202,
        title: "Contract Security",
        description: "Best practices for secure smart contracts",
        duration: "90 min",
        exp: 100,
      },
      {
        id: 203,
        title: "Testing & Deployment",
        description: "Learn to test and deploy smart contracts",
        duration: "120 min",
        exp: 150,
      },
    ],
  },
];