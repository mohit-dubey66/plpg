import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../../../lib/utils';

interface RoadmapCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden',
        'transition-all duration-300 hover:bg-black/50 hover:border-primary/20',
        'hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]',
        className
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};