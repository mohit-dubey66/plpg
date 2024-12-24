import React from 'react';
import { CheckCircle } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { FinalReview } from '../../../../lib/gemini/modules/skill/types';

interface FinalReviewCardProps {
  finalReview: FinalReview;
}

export const FinalReviewCard: React.FC<FinalReviewCardProps> = ({ finalReview }) => {
  return (
    <RoadmapCard title="Final Review" icon={CheckCircle}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Progress Indicators</h3>
          <ul className="space-y-1">
            {finalReview.progress.map((item, index) => (
              <li key={index} className="text-gray-400">• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Growth Opportunities</h3>
          <ul className="space-y-1">
            {finalReview.opportunities.map((opportunity, index) => (
              <li key={index} className="text-gray-400">• {opportunity}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Next Steps</h3>
          <ul className="space-y-1">
            {finalReview.nextSteps.map((step, index) => (
              <li key={index} className="text-gray-400">• {step}</li>
            ))}
          </ul>
        </div>
      </div>
    </RoadmapCard>
  );
};