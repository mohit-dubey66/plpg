import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Book } from 'lucide-react';
import { useAcademicRoadmapStore } from '../../../store/useAcademicRoadmapStore';
import { BookRecommendations } from './BookRecommendations';
import { StudyPlan } from './StudyPlan';

export const RoadmapGenerator = () => {
  const {
    isGeneratingBooks,
    isGeneratingPlan,
    error,
    bookRecommendations,
    selectedBook,
    studyPlan,
    generateBookRecommendations,
    generateStudyPlan
  } = useAcademicRoadmapStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Book Recommendations Section */}
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

      {/* Study Plan Section */}
      {selectedBook && (
        <div className="border-t border-white/10 pt-8">
          {studyPlan ? (
            <StudyPlan plan={studyPlan} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateStudyPlan}
                disabled={isGeneratingPlan}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
                         px-8 py-3 rounded-lg transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                {isGeneratingPlan ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Study Plan...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Generate Study Plan</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center max-w-md mx-auto"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};