import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, selected = [], onChange, placeholder = 'Select options', error }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
      const newSelected = Array.isArray(selected) && selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...(Array.isArray(selected) ? selected : []), option];
      onChange(newSelected);
    };

    return (
      <div ref={ref} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2',
            'text-white cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20',
            'transition-colors duration-200',
            error && 'border-red-400 focus:ring-red-400/20 focus:border-red-400/20'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {!Array.isArray(selected) || selected.length === 0 ? (
                <span className="text-gray-400">{placeholder}</span>
              ) : (
                selected.map(item => (
                  <span
                    key={item}
                    className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-sm"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isOpen && 'transform rotate-180'
              )}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 bg-black/90 border border-white/10 rounded-lg 
                       shadow-lg backdrop-blur-xl max-h-60 overflow-auto"
            >
              {options.map(option => (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={cn(
                    'px-4 py-2 cursor-pointer flex items-center justify-between',
                    'hover:bg-white/5 transition-colors duration-150',
                    Array.isArray(selected) && selected.includes(option) && 'text-primary'
                  )}
                >
                  <span>{option}</span>
                  {Array.isArray(selected) && selected.includes(option) && (
                    <Check className="w-4 h-4" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);