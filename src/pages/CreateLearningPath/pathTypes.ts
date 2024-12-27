import { GraduationCap, Code, BookOpen } from 'lucide-react';

export const pathTypes = [
  {
    icon: GraduationCap,
    title: 'Competitive Exams',
    description: 'Structured preparation paths for competitive examinations',
    features: [
      'Personalized study schedules',
      'Topic-wise preparation strategy',
      'Mock test planning',
      'Performance tracking'
    ],
    path: '/learning-paths/competitive'
  },
  {
    icon: Code,
    title: 'Learn a Skill',
    description: 'Master new technologies with hands-on learning paths',
    features: [
      'Project-based learning',
      'Industry-relevant curriculum',
      'Practice exercises',
      'Portfolio building'
    ],
    path: '/learning-paths/skill'
  },
  {
    icon: BookOpen,
    title: 'Academic Subjects',
    description: 'Comprehensive study guides for academic excellence',
    features: [
      'Concept-based learning',
      'Revision strategies',
      'Practice problems',
      'Quick reference guides'
    ],
    path: '/learning-paths/academic'
  }
];