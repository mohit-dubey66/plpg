import React from 'react';
import { Dumbbell } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { Strengthening } from '../../../../lib/gemini/modules/skill/types';

interface StrengtheningCardProps {
  strengthening: Strengthening;
}

export const StrengtheningCard: React.FC<StrengtheningCardProps> = ({ strengthening }) => {
  return (
    <RoadmapCard title="Strengthening Skills" icon={Dumbbell}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Practice Activities</h3>
          <ul className="space-y-1">
            {strengthening.practices.map((practice, index) => (
              <li key={index} className="text-gray-400">• {practice}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Key Milestones</h3>
          <ul className="space-y-1">
            {strengthening.milestones.map((milestone, index) => (
              <li key={index} className="text-gray-400">• {milestone}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Getting Feedback</h3>
          <ul className="space-y-1">
            {strengthening.feedbackMethods.map((method, index) => (
              <li key={index} className="text-gray-400">• {method}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Challenge Yourself</h3>
          <ul className="space-y-1">
            {strengthening.challenges.map((challenge, index) => (
              <li key={index} className="text-gray-400">• {challenge}</li>
            ))}
          </ul>
        </div>
      </div>
    </RoadmapCard>
  );
};