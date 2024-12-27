import React from 'react';
import { motion } from 'framer-motion';
import { StudyPlanOverview } from './StudyPlanOverview';
import { WeeklyPlans } from './WeeklyPlans';
import type { StudyPlan as StudyPlanType } from '../../../lib/gemini/modules/academic/types';

interface StudyPlanProps {
  plan: StudyPlanType;
}

export const StudyPlan: React.FC<StudyPlanProps> = ({ plan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <StudyPlanOverview overview={plan.overview} />
      <WeeklyPlans weeks={plan.weeklyPlans} />
    </motion.div>
  );
};