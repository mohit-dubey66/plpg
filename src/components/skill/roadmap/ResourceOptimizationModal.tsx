import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BookOpen, Code, Video, FileText } from 'lucide-react';
import type { ResourceOptimizationResponse } from '../../../lib/gemini/modules/skill/types/resourceOptimization';
import type { Resource } from '../../../lib/gemini/modules/skill/types';

interface ResourceOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResourceOptimizationResponse | null;
  isLoading: boolean;
  resource: Resource;
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return Video;
    case 'article':
      return FileText;
    case 'course':
      return BookOpen;
    case 'tutorial':
      return Code;
    default:
      return FileText;
  }
};

export const ResourceOptimizationModal: React.FC<ResourceOptimizationModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
  resource
}) => {
  if (!isOpen) return null;

  const handleUrlClick = (url: string) => {
    try {
      new URL(url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Invalid URL:', url);
    }
  };

  const ResourceList = ({ title, resources, level }: { title: string; resources: any[]; level: string }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
        <span>{title}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          level === 'beginner' ? 'bg-green-500/10 text-green-400' :
          level === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </h3>
      <div className="grid gap-4">
        {resources.map((item, index) => {
          const Icon = getIconForType(item.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 
                       transition-all duration-300 border border-white/5 hover:border-primary/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-white/90 group-hover:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">
                      {item.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleUrlClick(item.link)}
                  className="p-2 text-primary hover:text-primary/80 hover:bg-white/5 
                           rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-4 md:inset-10 lg:inset-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-black/90 border border-white/10 rounded-2xl w-full max-w-4xl 
                   max-h-[80vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 
                        bg-black/90 backdrop-blur-xl z-10">
            <div>
              <h2 className="text-xl font-semibold">{resource.name}</h2>
              <p className="text-sm text-gray-400">{resource.type}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent 
                              rounded-full animate-spin" />
                <p className="text-gray-400">Finding the best resources...</p>
              </div>
            ) : data ? (
              <div className="space-y-8">
                <ResourceList title="Beginner Resources" resources={data.beginner} level="beginner" />
                <ResourceList title="Intermediate Resources" resources={data.intermediate} level="intermediate" />
                <ResourceList title="Advanced Resources" resources={data.advanced} level="advanced" />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No optimization data available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};