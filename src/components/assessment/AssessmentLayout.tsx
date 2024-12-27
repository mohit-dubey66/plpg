import React from 'react';
import { motion } from 'framer-motion';
import { useSkillAssessmentStore } from '../../store/useSkillAssessmentStore';
import { BackButton } from '../ui/BackButton';
import { ProgressBar } from './ProgressBar';

interface AssessmentLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
}

export const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  children,
  title,
  description,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-400">{description}</p>
          </div>

          {/* Form content */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 md:p-8">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};