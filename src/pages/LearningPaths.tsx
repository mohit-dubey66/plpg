import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export const LearningPaths = () => {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-auto">
      <GlassCard className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
        <p className="text-gray-400">
          Discover and follow structured learning paths tailored to your goals.
        </p>
      </GlassCard>
    </div>
  );
};