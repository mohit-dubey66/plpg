import React from 'react';
import { cn } from '../../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2',
          'text-white appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20',
          'transition-colors duration-200',
          '[&>option]:bg-black/90 [&>option]:text-white',
          error && 'border-red-400 focus:ring-red-400/20 focus:border-red-400/20',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);