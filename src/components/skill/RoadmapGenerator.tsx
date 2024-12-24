import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader, RefreshCw } from 'lucide-react';
import { useSkillAssessmentStore } from '../../store/useSkillAssessmentStore';
import { useSkillRoadmapStore } from '../../store/useSkillRoadmapStore';
import { SkillRoadmapGenerator } from '../../lib/gemini/modules/skill/generator';

const generator = new SkillRoadmapGenerator();

export const RoadmapGeneratorButton = () => {
  const assessment = useSkillAssessmentStore();
  const { 
    isGenerating, 
    currentModule,
    error,
    roadmap,
    setGenerating,
    setCurrentModule,
    setRoadmap,
    setError,
    setShowAssessment
  } = useSkillRoadmapStore();

  const generateRoadmap = async () => {
    try {
      setGenerating(true);
      setError(null);
      setShowAssessment(false); // Automatically collapse assessment data
      
      setCurrentModule('Generating Roadmap');
      const newRoadmap = await generator.generate(assessment);
      setRoadmap(newRoadmap);

    } catch (error) {
      console.error('Error generating roadmap:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate roadmap');
    } finally {
      setGenerating(false);
      setCurrentModule('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 pt-12"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateRoadmap}
        disabled={isGenerating}
        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary 
                 px-8 py-3 rounded-lg transition-colors duration-200 font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Generating {currentModule}...</span>
          </>
        ) : (
          <>
            {roadmap ? (
              <>
                <RefreshCw className="w-5 h-5" />
                <span>Regenerate Learning Path</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate Learning Path</span>
              </>
            )}
          </>
        )}
      </motion.button>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center max-w-md"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};