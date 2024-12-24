import React from 'react';
import { motion } from 'framer-motion';
import { useSkillRoadmapStore } from '../../../store/useSkillRoadmapStore';
import { IntroductionCard } from './cards/IntroductionCard';
import { FoundationCard } from './cards/FoundationCard';
import { LearningPlanCard } from './cards/LearningPlanCard';
import { StrengtheningCard } from './cards/StrengtheningCard';
import { AdvancedLearningCard } from './cards/AdvancedLearningCard';
import { TimeManagementCard } from './cards/TimeManagementCard';
import { MotivationCard } from './cards/MotivationCard';
import { FinalReviewCard } from './cards/FinalReviewCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const RoadmapDisplay = () => {
  const roadmap = useSkillRoadmapStore((state) => state.roadmap);

  if (!roadmap) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 mt-8"
    >
      <IntroductionCard introduction={roadmap.introduction} />
      <FoundationCard foundation={roadmap.foundation} />
      <LearningPlanCard learningPlan={roadmap.learningPlan} />
      <StrengtheningCard strengthening={roadmap.strengthening} />
      <AdvancedLearningCard advancedLearning={roadmap.advancedLearning} />
      <TimeManagementCard timeManagement={roadmap.timeManagement} />
      <MotivationCard motivation={roadmap.motivation} />
      <FinalReviewCard finalReview={roadmap.finalReview} />
    </motion.div>
  );
};