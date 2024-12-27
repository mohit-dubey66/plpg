import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ResourceItem } from '../../../lib/gemini/modules/skill/types/resourceOptimization';

interface ResourceListProps {
  resources: ResourceItem[];
  title: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources, title }) => {
  const handleUrlClick = (url: string) => {
    try {
      new URL(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Invalid URL:', url);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-3">{title}</h3>
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{resource.title}</h4>
              <button
                onClick={() => handleUrlClick(resource.link)}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-2">{resource.description}</p>
            <div className="text-sm text-gray-500">
              Type: {resource.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};