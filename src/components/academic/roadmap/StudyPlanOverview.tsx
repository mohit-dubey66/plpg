import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen } from 'lucide-react';
import type { StudyPlanOverview as StudyPlanOverviewType } from '../../../lib/gemini/modules/academic/types';

interface StudyPlanOverviewProps {
  overview: StudyPlanOverviewType;
}

export const StudyPlanOverview: React.FC<StudyPlanOverviewProps> = ({ overview }) => {
  // Ensure overview exists and has required properties
  if (!overview) {
    return null;
  }

  const {
    greeting = '',
    duration = '',
    mainTopics = [],
    learningObjectives = [],
    weeklyOverviews = []
  } = overview;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Study Plan Overview</h2>
          <p className="text-sm text-gray-400">Your personalized learning journey</p>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-8 bg-white/5 p-4 rounded-lg">
        <p className="text-gray-300">{greeting}</p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {duration && (
          <div>
            <h3 className="font-medium text-primary mb-2">Duration</h3>
            <p className="text-gray-400">{duration}</p>
          </div>
        )}

        {mainTopics.length > 0 && (
          <div>
            <h3 className="font-medium text-primary mb-2">Main Topics</h3>
            <ul className="space-y-1">
              {mainTopics.map((topic, index) => (
                <li key={index} className="text-gray-400">• {topic}</li>
              ))}
            </ul>
          </div>
        )}

        {learningObjectives.length > 0 && (
          <div className="md:col-span-2">
            <h3 className="font-medium text-primary mb-2">Learning Objectives</h3>
            <ul className="space-y-1">
              {learningObjectives.map((objective, index) => (
                <li key={index} className="text-gray-400">• {objective}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Weekly Overviews */}
        {weeklyOverviews.length > 0 && (
          <div className="md:col-span-2">
            <h3 className="font-medium text-primary mb-4">Weekly Overview</h3>
            <div className="grid gap-4">
              {weeklyOverviews.map((week) => (
                <div
                  key={week.week}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">Week {week.week}: {week.theme}</h4>
                  </div>
                  <ul className="space-y-1">
                    {week.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-gray-400">• {objective}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};