import React from 'react';
import { Flame } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { Motivation } from '../../../../lib/gemini/modules/skill/types';

interface MotivationCardProps {
  motivation: Motivation;
}

export const MotivationCard: React.FC<MotivationCardProps> = ({ motivation }) => {
  return (
    <RoadmapCard title="Motivation & Progress" icon={Flame}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Motivational Messages</h3>
          <ul className="space-y-1">
            {motivation.messages.map((message, index) => (
              <li key={index} className="text-gray-400">• {message}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Progress Tracking</h3>
          <ul className="space-y-1">
            {motivation.progress.map((item, index) => (
              <li key={index} className="text-gray-400">• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Reward System</h3>
          <ul className="space-y-1">
            {motivation.rewards.map((reward, index) => (
              <li key={index} className="text-gray-400">• {reward}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Overcoming Challenges</h3>
          <ul className="space-y-1">
            {motivation.challenges.map((challenge, index) => (
              <li key={index} className="text-gray-400">• {challenge}</li>
            ))}
          </ul>
        </div>
      </div>
    </RoadmapCard>
  );
};