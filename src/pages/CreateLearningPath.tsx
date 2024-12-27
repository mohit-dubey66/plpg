import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, BookOpen } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { PathCard } from '../components/learning-path/PathCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const pathTypes = [
  {
    icon: GraduationCap,
    title: 'Competitive Exams',
    description: 'Structured preparation paths for GATE, CAT, NEET, and other competitive exams',
    path: '/learning-paths/competitive'
  },
  {
    icon: Code,
    title: 'Learn a Skill',
    description: 'Master new technologies and skills with personalized learning paths',
    path: '/learning-paths/skill'
  },
  {
    icon: BookOpen,
    title: 'Academic Subjects',
    description: 'Deep dive into academic subjects with comprehensive study guides',
    path: '/learning-paths/academic'
  }
];

export const CreateLearningPath = () => {
  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 md:mt-12"
        >
          {/* Header section with gradient text */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4
                           bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Choose Your Path
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto"
            >
              Select the type of roadmap that best fits your learning goals and let us create
              a personalized journey for your success
            </motion.p>
          </div>

          {/* Cards grid with responsive gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pathTypes.map((pathType, index) => (
              <motion.div
                key={pathType.title}
                variants={item}
                className="h-full"
              >
                <PathCard {...pathType} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};