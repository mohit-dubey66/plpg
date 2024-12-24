import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
};