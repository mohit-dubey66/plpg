import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

export const RevisionGuides = () => {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-auto">
      <GlassCard className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">Revision Guides</h1>
        <p className="text-gray-400">
          Access quick revision guides to reinforce your learning.
        </p>
      </GlassCard>
    </div>
  );
};