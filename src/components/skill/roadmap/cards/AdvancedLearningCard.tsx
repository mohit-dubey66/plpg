import React from 'react';
import { Lightbulb } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { AdvancedLearning } from '../../../../lib/gemini/modules/skill/types';

interface AdvancedLearningCardProps {
  advancedLearning: AdvancedLearning;
}

export const AdvancedLearningCard: React.FC<AdvancedLearningCardProps> = ({ advancedLearning }) => {
  return (
    <RoadmapCard title="Advanced Learning" icon={Lightbulb}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Advanced Topics</h3>
          <ul className="space-y-1">
            {advancedLearning.topics.map((topic, index) => (
              <li key={index} className="text-gray-400">• {topic}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Advanced Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {advancedLearning.resources.map((resource, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{resource.name}</h4>
                <p className="text-sm text-gray-400">{resource.type}</p>
                <p className="text-sm text-gray-500 mt-2">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Project Ideas</h3>
          <ul className="space-y-1">
            {advancedLearning.projects.map((project, index) => (
              <li key={index} className="text-gray-400">• {project}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Learning Communities</h3>
          <ul className="space-y-1">
            {advancedLearning.communities.map((community, index) => (
              <li key={index} className="text-gray-400">• {community}</li>
            ))}
          </ul>
        </div>
      </div>
    </RoadmapCard>
  );
};