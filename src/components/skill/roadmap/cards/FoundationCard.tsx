import React from 'react';
import { Blocks } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import { ResourceCard } from '../ResourceCard';
import type { Foundation } from '../../../../lib/gemini/modules/skill/types';

interface FoundationCardProps {
  foundation: Foundation;
}

export const FoundationCard: React.FC<FoundationCardProps> = ({ foundation }) => {
  return (
    <RoadmapCard title="Foundation" icon={Blocks}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Essential Concepts</h3>
          <ul className="space-y-1">
            {foundation.essentials.map((essential, index) => (
              <li key={index} className="text-gray-400">• {essential}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Recommended Resources</h3>
          <div className="grid gap-4">
            {foundation.resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Daily Habits</h3>
          <ul className="space-y-1">
            {foundation.dailyHabits.map((habit, index) => (
              <li key={index} className="text-gray-400">• {habit}</li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Quick Win</h3>
          <p className="text-gray-400">{foundation.quickWin}</p>
        </div>
      </div>
    </RoadmapCard>
  );
};