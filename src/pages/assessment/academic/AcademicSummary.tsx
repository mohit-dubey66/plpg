import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useAcademicAssessmentStore } from '../../../store/useAcademicAssessmentStore';
import { useAcademicRoadmapStore } from '../../../store/useAcademicRoadmapStore';
import { SummarySection } from './SummarySection';
import { RoadmapGenerator } from '../../../components/academic/roadmap/RoadmapGenerator';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const sections = [
  {
    title: 'Subject Selection',
    dataKey: 'subjectSelection',
    fields: {
      subjectName: 'Subject',
      levelOfStudy: 'Level of Study',
      learningGoal: 'Learning Goal',
      customGoal: 'Custom Goal'
    }
  },
  {
    title: 'Time Commitment',
    dataKey: 'timeCommitment',
    fields: {
      availableDays: 'Available Days',
      deadline: 'Deadline',
      studyDuration: 'Study Duration (weeks)',
      dailyHours: 'Daily Hours'
    }
  },
  {
    title: 'Learning Style',
    dataKey: 'learningStyle',
    fields: {
      preferredMethods: 'Preferred Methods',
      customMethod: 'Custom Method'
    }
  },
  {
    title: 'Current Knowledge',
    dataKey: 'currentKnowledge',
    fields: {
      level: 'Current Level',
      additionalPreferences: 'Additional Preferences'
    }
  }
];

export const AcademicSummary = () => {
  const navigate = useNavigate();
  const assessment = useAcademicAssessmentStore();
  const { showAssessment, toggleAssessment } = useAcademicRoadmapStore();

  useEffect(() => {
    if (!assessment.isCompleted) {
      navigate('/learning-paths/academic');
    }
  }, [assessment.isCompleted, navigate]);

  const handleStartOver = () => {
    assessment.resetAssessment();
    useAcademicRoadmapStore.getState().reset();
    navigate('/create-learning-path');
  };

  if (!assessment.isCompleted) return null;

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Academic Learning Summary
          </h1>
          <p className="text-gray-400">
            Review your assessment details and generate your personalized study plan
          </p>
        </motion.div>

        {/* Assessment Summary with Toggle */}
        <div className="space-y-4">
          <button
            onClick={toggleAssessment}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            {showAssessment ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            <span>Assessment Details</span>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: showAssessment ? 'auto' : 0,
              opacity: showAssessment ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-8">
              {sections.map((section) => (
                <SummarySection
                  key={section.title}
                  title={section.title}
                  data={assessment[section.dataKey as keyof typeof assessment]}
                  fields={section.fields}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Roadmap Generator */}
        <RoadmapGenerator />

        {/* Start Over Button */}
        <motion.div
          variants={container}
          className="flex justify-center gap-4 pt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white 
                     px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
            onClick={handleStartOver}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Start Over</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};