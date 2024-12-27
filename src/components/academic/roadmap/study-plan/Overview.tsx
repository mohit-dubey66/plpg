import React from 'react';
import { Target } from 'lucide-react';
import type { StudyPlan } from '../../../../lib/gemini/modules/academic/types';

interface OverviewProps {
  overview: StudyPlan['overview'];
}

export const Overview: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Study Plan Overview</h2>
      </div>

      <div className="mb-6 bg-white/5 p-4 rounded-lg">
        <p className="text-gray-300">{overview.greeting}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-medium text-primary mb-2">Duration</h3>
          <p className="text-gray-400">{overview.duration}</p>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Main Topics</h3>
          <ul className="space-y-1">
            {overview.mainTopics.map((topic, index) => (
              <li key={index} className="text-gray-400">• {topic}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium text-primary mb-2">Learning Objectives</h3>
          <ul className="space-y-1">
            {overview.learningObjectives.map((objective, index) => (
              <li key={index} className="text-gray-400">• {objective}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};