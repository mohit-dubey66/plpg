import { useState } from 'react';
import { ResourceOptimizer } from '../lib/gemini/modules/skill/resourceOptimizer';
import type { Resource } from '../lib/gemini/modules/skill/types';
import type { ResourceOptimizationResponse } from '../lib/gemini/modules/skill/types/resourceOptimization';

const optimizer = new ResourceOptimizer();

export const useResourceOptimization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimizationData, setOptimizationData] = useState<ResourceOptimizationResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const optimizeResource = async (resource: Resource) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await optimizer.optimize(resource);
      setOptimizationData(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize resource');
      console.error('Resource optimization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    optimizeResource,
    isLoading,
    error,
    optimizationData,
    isModalOpen,
    closeModal
  };
};