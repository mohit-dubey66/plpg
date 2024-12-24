import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PathTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  onClick: () => void;
}

export const PathTypeCard = ({ icon: Icon, title, description, features, onClick }: PathTypeCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden"
    >
      {/* Gradient background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl
                    transition-all duration-300 group-hover:bg-black/50 group-hover:border-primary/20">
        {/* Icon with glow effect */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6
                      group-hover:bg-primary/20 transition-all duration-300
                      relative before:absolute before:inset-0 before:bg-primary/20 
                      before:rounded-2xl before:blur-xl before:opacity-0 
                      group-hover:before:opacity-100 before:transition-opacity">
          <Icon className="w-8 h-8 text-primary relative z-10" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white
                     transition-colors duration-300">
          {title}
        </h2>
        
        <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Features list */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-sm text-gray-400 group-hover:text-gray-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Get Started button */}
        <motion.div 
          className="inline-flex items-center text-primary group-hover:text-primary/80"
          whileHover={{ x: 4 }}
        >
          <span className="font-medium mr-2">Get Started</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};