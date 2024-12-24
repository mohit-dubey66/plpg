import React from 'react';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from './ui/GlassCard';
import { Greeting } from './ui/Greeting';
import { ActionCard } from './ui/ActionCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-4 md:p-8 overflow-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        <GlassCard className="p-6 md:p-8 mb-8">
          <Greeting name="Mohit" />
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            icon={Brain}
            title="Create Learning Path"
            description="Get a personalized roadmap tailored to your goals and current skill level"
            onClick={() => navigate('/create-learning-path')}
          />
          {/* Add more action cards here */}
        </div>
      </motion.div>
    </div>
  );
};