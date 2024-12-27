import React from 'react';
import { BookOpen } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { Introduction } from '../../../../lib/gemini/modules/skill/types';

interface IntroductionCardProps {
  introduction: Introduction;
}

export const IntroductionCard: React.FC<IntroductionCardProps> = ({ introduction }) => {
  return (
    <RoadmapCard title="Introduction" icon={BookOpen}>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-primary">{introduction.greeting}</h3>
          <p className="text-gray-400">{introduction.skillOverview}</p>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Your Learning Journey</h3>
          <p className="text-gray-400">{introduction.roadmapOverview}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Personal Note</h3>
          <p className="text-gray-400">{introduction.personalNote}</p>
        </div>
      </div>
    </RoadmapCard>
  );
};