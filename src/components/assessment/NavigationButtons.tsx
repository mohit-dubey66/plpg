import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSkillAssessmentStore } from '../../store/useSkillAssessmentStore';

interface NavigationButtonsProps {
  onNext?: () => Promise<boolean> | boolean;
  isLastStep?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  isLastStep = false,
}) => {
  const previousStep = useSkillAssessmentStore((state) => state.previousStep);

  const handleNext = async () => {
    if (onNext) {
      const canProceed = await onNext();
      if (!canProceed) return;
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <motion.button
        type="button"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={previousStep}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
                 px-6 py-2 rounded-lg transition-colors"
      >
        <span>{isLastStep ? 'Finish' : 'Next'}</span>
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
};