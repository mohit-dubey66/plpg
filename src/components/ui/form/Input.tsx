import React from 'react';
import { cn } from '../../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2',
          'text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20',
          'transition-colors duration-200',
          error && 'border-red-400 focus:ring-red-400/20 focus:border-red-400/20',
          className
        )}
        {...props}
      />
    );
  }
);