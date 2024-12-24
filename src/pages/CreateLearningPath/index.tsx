import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/ui/BackButton';
import { PathTypeCard } from './PathTypeCard';
import { pathTypes } from './pathTypes';

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

export const CreateLearningPath = () => {
  const navigate = useNavigate();

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
          {/* Header section with animated gradient text */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6
                         bg-gradient-to-r from-white via-white/90 to-white/70 
                         bg-clip-text text-transparent">
              Choose Your Learning Journey
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select a path that matches your goals, and we'll create a personalized
              roadmap for your success
            </p>
          </motion.div>

          {/* Cards grid with improved spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pathTypes.map((pathType, index) => (
              <motion.div
                key={pathType.title}
                variants={item}
                className="h-full"
              >
                <PathTypeCard
                  {...pathType}
                  onClick={() => navigate(pathType.path)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};