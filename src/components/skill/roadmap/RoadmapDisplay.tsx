import React from 'react';
import { motion } from 'framer-motion';
import { Book, Loader2 } from 'lucide-react';
import { useSkillRoadmapStore } from '../../../store/useSkillRoadmapStore';
import { IntroductionCard } from './cards/IntroductionCard';
import { FoundationCard } from './cards/FoundationCard';
import { LearningPlanCard } from './cards/LearningPlanCard';
import { StrengtheningCard } from './cards/StrengtheningCard';
import { AdvancedLearningCard } from './cards/AdvancedLearningCard';
import { TimeManagementCard } from './cards/TimeManagementCard';
import { MotivationCard } from './cards/MotivationCard';
import { FinalReviewCard } from './cards/FinalReviewCard';
import { BookRecommendations } from './BookRecommendations';

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
  const { 
    roadmap,
    bookRecommendations,
    isGeneratingBooks,
    generateBookRecommendations
  } = useSkillRoadmapStore();

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

      {/* Book Recommendations Section */}
      <div className="border-t border-white/10 pt-8">
        {bookRecommendations ? (
          <BookRecommendations
            books={bookRecommendations.recommendations}
            context={bookRecommendations.context}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateBookRecommendations}
              disabled={isGeneratingBooks}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
                       px-8 py-3 rounded-lg transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              {isGeneratingBooks ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Finding Books...</span>
                </>
              ) : (
                <>
                  <Book className="w-5 h-5" />
                  <span>Get Book Recommendations</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};