// Update the component to handle partial month data and generation buttons
import React from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RoadmapCard } from './shared/RoadmapCard';
import { useSkillRoadmapStore } from '../../../../store/useSkillRoadmapStore';
import type { LearningPlan } from '../../../../lib/gemini/modules/skill/types';

interface LearningPlanCardProps {
  learningPlan: LearningPlan;
}

export const LearningPlanCard: React.FC<LearningPlanCardProps> = ({ learningPlan }) => {
  const { monthDetails, isGeneratingMonth, generateMonthDetail } = useSkillRoadmapStore();

  const renderMonthContent = (month: number) => {
    const monthDetail = monthDetails[month];
    const isGenerating = isGeneratingMonth[month];
    const isUpcomingMonth = month !== 1;
    const upcomingMonth = isUpcomingMonth 
      ? learningPlan.upcomingMonths.find(m => m.month === month)
      : null;

    if (isGenerating) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating month {month} plan...</span>
          </div>
        </div>
      );
    }

    if (isUpcomingMonth && !monthDetail) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Month {month}: {upcomingMonth.theme}
            </h3>
            <div className="bg-white/5 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-primary mb-2">Monthly Objectives</h4>
              <ul className="space-y-1">
                {upcomingMonth.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-400">• {objective}</li>
                ))}
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => generateMonthDetail(upcomingMonth)}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
                       px-4 py-2 rounded-lg transition-colors"
            >
              Generate Weekly Plan
            </motion.button>
          </div>
        </div>
      );
    }

    const detail = monthDetail || learningPlan.firstMonth;
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Month {month}: {detail.theme}
          </h3>
          <div className="bg-white/5 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-primary mb-2">Monthly Objectives</h4>
            <ul className="space-y-1">
              {detail.objectives.map((objective, index) => (
                <li key={index} className="text-gray-400">• {objective}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {detail.weeks?.map((week) => (
          <div key={week.week} className="bg-black/20 p-6 rounded-xl space-y-6">
            <h4 className="text-lg font-medium text-primary">Week {week.week}</h4>
            
            <div className="space-y-6">
              {week.goals?.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Goals</h5>
                  <ul className="space-y-1">
                    {week.goals.map((goal, index) => (
                      <li key={index} className="text-sm text-gray-400">• {goal}</li>
                    ))}
                  </ul>
                </div>
              )}

              {week.tasks?.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Daily Tasks</h5>
                  <ul className="space-y-1">
                    {week.tasks.map((task, index) => (
                      <li key={index} className="text-sm text-gray-400">• {task}</li>
                    ))}
                  </ul>
                </div>
              )}

              {week.practice && (
                <div className="bg-white/5 p-4 rounded-lg space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Practice</h5>
                    <div className="space-y-3">
                      {week.practice.exercises?.length > 0 && (
                        <div>
                          <h6 className="text-sm font-medium text-primary mb-1">Exercises</h6>
                          <ul className="space-y-1">
                            {week.practice.exercises.map((exercise, index) => (
                              <li key={index} className="text-sm text-gray-400">• {exercise}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {week.practice.project && (
                        <div>
                          <h6 className="text-sm font-medium text-primary mb-1">Project</h6>
                          <p className="text-sm text-gray-400">{week.practice.project}</p>
                        </div>
                      )}
                      {week.practice.timeAllocation && (
                        <div>
                          <h6 className="text-sm font-medium text-primary mb-1">Time Allocation</h6>
                          <p className="text-sm text-gray-400">{week.practice.timeAllocation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {week.resources?.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Resources</h5>
                  <ul className="space-y-1">
                    {week.resources.map((resource, index) => (
                      <li key={index} className="text-sm text-gray-400">• {resource}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {week.assessment && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Assessment</h5>
                    <p className="text-sm text-gray-400">{week.assessment}</p>
                  </div>
                )}
                {week.review && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Review</h5>
                    <p className="text-sm text-gray-400">{week.review}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <RoadmapCard title="Learning Plan" icon={Calendar}>
      <div className="space-y-12">
        {/* First month is always rendered */}
        {renderMonthContent(1)}

        {/* Render upcoming months */}
        {learningPlan.upcomingMonths.map((month) => (
          <div key={month.month} className="border-t border-white/10 pt-12">
            {renderMonthContent(month.month)}
          </div>
        ))}
      </div>
    </RoadmapCard>
  );
};