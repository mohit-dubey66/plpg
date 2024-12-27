import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MobileNav = ({ isOpen, onToggle, children }: MobileNavProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary/10 lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};