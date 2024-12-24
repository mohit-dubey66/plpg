import React from 'react';
import { Calendar } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { LearningPlan } from '../../../../lib/gemini/modules/skill/types';

interface LearningPlanCardProps {
  learningPlan: LearningPlan;
}

export const LearningPlanCard: React.FC<LearningPlanCardProps> = ({ learningPlan }) => {
  return (
    <RoadmapCard title="Learning Plan" icon={Calendar}>
      <div className="space-y-8">
        {learningPlan.months.map((month) => (
          <div key={month.month} className="space-y-4">
            <h3 className="text-lg font-medium">Month {month.month}</h3>
            
            {month.weeks.map((week) => (
              <div key={week.week} className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-medium text-primary mb-3">Week {week.week}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Goals</h5>
                    <ul className="space-y-1">
                      {week.goals.map((goal, index) => (
                        <li key={index} className="text-sm text-gray-400">• {goal}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Tasks</h5>
                    <ul className="space-y-1">
                      {week.tasks.map((task, index) => (
                        <li key={index} className="text-sm text-gray-400">• {task}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Practice</h5>
                    <p className="text-sm text-gray-400">{week.practice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </RoadmapCard>
  );
};