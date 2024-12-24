import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PathCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
}

export const PathCard = ({ icon: Icon, title, description, path }: PathCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
      onClick={() => navigate(path)}
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card content */}
      <div className="relative bg-black/40 backdrop-blur-lg border border-white/5 p-8 rounded-xl
                    transition-all duration-300 group-hover:bg-black/50 group-hover:border-primary/20
                    hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
        {/* Icon container with glow effect */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6
                      group-hover:bg-primary/20 transition-colors duration-300
                      relative before:absolute before:inset-0 before:bg-primary/20 
                      before:rounded-2xl before:blur-xl before:opacity-0 
                      group-hover:before:opacity-100 before:transition-opacity">
          <Icon className="w-8 h-8 text-primary relative z-10" />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white
                     transition-colors duration-300 md:text-3xl lg:text-2xl">
          {title}
        </h2>
        
        <p className="text-gray-400 mb-6 text-sm md:text-base lg:text-sm xl:text-base
                    group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
          {description}
        </p>

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