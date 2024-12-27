import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, isActive }: NavItemProps) => (
  <motion.div
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      'flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200',
      'backdrop-blur-sm hover:backdrop-blur-md',
      isActive 
        ? 'bg-primary/10 text-primary border border-primary/20' 
        : 'hover:bg-white/5 border border-transparent'
    )}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

export const Sidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 h-screen bg-black/20 backdrop-blur-xl border-r border-white/5 p-4 flex flex-col"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold text-primary mb-8"
      >
        Learning Assistant
      </motion.h1>
      
      <nav className="space-y-2">
        <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" isActive />
        <NavItem icon={<BookOpen size={20} />} label="Learning Paths" />
        <NavItem icon={<GraduationCap size={20} />} label="Revision Guides" />
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-auto"
      >
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Mohit Dubey</span>
            <span className="text-xs text-gray-400">mohitdubey1024@gmail.com</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};