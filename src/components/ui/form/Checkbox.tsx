import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            className="sr-only"
            checked={checked}
            {...props}
          />
          <motion.div
            className={cn(
              'w-5 h-5 border rounded transition-colors duration-200',
              checked
                ? 'bg-primary border-primary'
                : 'border-white/20 bg-white/5'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {checked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>
        <span className="text-sm text-gray-200">{label}</span>
      </label>
    );
  }
);