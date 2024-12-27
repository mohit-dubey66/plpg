import React from 'react';
import { Calendar } from 'lucide-react';
import type { WeeklyPlan } from '../../../../lib/gemini/modules/academic/types';

interface WeekContentProps {
  week: WeeklyPlan;
}

export const WeekContent: React.FC<WeekContentProps> = ({ week }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Week {week.week}</h2>
      </div>

      {/* Topics */}
      {week.topics && week.topics.length > 0 && (
        <div>
          <h3 className="font-medium text-primary mb-2">Topics</h3>
          <ul className="space-y-1">
            {week.topics.map((topic, index) => (
              <li key={index} className="text-gray-400">• {topic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Daily Tasks */}
      {week.tasks && week.tasks.length > 0 && (
        <div>
          <h3 className="font-medium text-primary mb-2">Daily Tasks</h3>
          <ul className="space-y-1">
            {week.tasks.map((task, index) => (
              <li key={index} className="text-gray-400">• {task}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Practice Section */}
      {week.practice && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-primary mb-2">Practice</h3>
            <div className="space-y-3">
              {/* Problems */}
              {week.practice.problems && week.practice.problems.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Problems</h4>
                  <ul className="space-y-1">
                    {week.practice.problems.map((problem, index) => (
                      <li key={index} className="text-sm text-gray-400">• {problem}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project */}
              {week.practice.project && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Project</h4>
                  <p className="text-sm text-gray-400">{week.practice.project}</p>
                </div>
              )}

              {/* Time Allocation */}
              {week.practice.timeAllocation && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Time Allocation</h4>
                  <p className="text-sm text-gray-400">{week.practice.timeAllocation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assessment and Review */}
          <div className="space-y-4">
            {week.assessment && (
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Assessment</h3>
                <p className="text-sm text-gray-400">{week.assessment}</p>
              </div>
            )}

            {week.review && (
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Review</h3>
                <p className="text-sm text-gray-400">{week.review}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};