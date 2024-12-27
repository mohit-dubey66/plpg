import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, ExternalLink } from 'lucide-react';
import { useResourceOptimization } from '../../../hooks/useResourceOptimization';
import { ResourceOptimizationModal } from './ResourceOptimizationModal';
import type { Resource } from '../../../lib/gemini/modules/skill/types';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const {
    optimizeResource,
    isLoading,
    optimizationData,
    isModalOpen,
    closeModal
  } = useResourceOptimization();

  const handleOptimize = () => {
    optimizeResource(resource);
  };

  return (
    <>
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium mb-1">{resource.name}</h4>
            <p className="text-sm text-gray-400">{resource.type}</p>
            <p className="text-sm text-gray-500 mt-2">{resource.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOptimize}
            disabled={isLoading}
            className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     group relative"
            title="Find online resources"
          >
            <Wand2 size={16} className="group-hover:animate-pulse" />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <ResourceOptimizationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={optimizationData}
        isLoading={isLoading}
        resource={resource}
      />
    </>
  );
};