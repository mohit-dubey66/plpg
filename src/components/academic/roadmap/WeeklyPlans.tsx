import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Loader2 } from 'lucide-react';
import { useAcademicRoadmapStore } from '../../../store/useAcademicRoadmapStore';
import { WeekContent } from './study-plan/WeekContent';
import type { WeeklyPlan } from '../../../lib/gemini/modules/academic/types';

interface WeeklyPlansProps {
  weeks: WeeklyPlan[];
}

export const WeeklyPlans: React.FC<WeeklyPlansProps> = ({ weeks }) => {
  const { generateNextTwoWeeks, isGeneratingWeeks } = useAcademicRoadmapStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Weekly Plans</h2>
          <p className="text-sm text-gray-400">Detailed weekly learning activities</p>
        </div>
      </div>

      {/* Weekly Content */}
      <div className="space-y-8">
        {weeks.map((week) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6"
          >
            <WeekContent week={week} />
          </motion.div>
        ))}
      </div>

      {/* Generate More Weeks Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateNextTwoWeeks}
          disabled={isGeneratingWeeks}
          className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
                   px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {isGeneratingWeeks ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Next Two Weeks...</span>
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              <span>Generate Next Two Weeks</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};