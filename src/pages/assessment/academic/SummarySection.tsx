import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, Clock, Brain, 
  GraduationCap 
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface SummarySectionProps {
  title: string;
  data: Record<string, any>;
  fields: Record<string, string>;
}

const getIconForSection = (title: string) => {
  switch (title) {
    case 'Subject Selection':
      return GraduationCap;
    case 'Time Commitment':
      return Clock;
    case 'Learning Style':
      return Brain;
    case 'Current Knowledge':
      return Book;
    default:
      return Book;
  }
};

const DataField = ({ label, value }: { label: string; value: any }) => {
  const formatValue = (val: any) => {
    if (Array.isArray(val)) {
      return val.length > 0 ? val.join(', ') : 'None specified';
    }
    if (typeof val === 'boolean') {
      return val ? 'Yes' : 'No';
    }
    if (typeof val === 'number') {
      return val.toString();
    }
    if (val === undefined || val === null || val === '') {
      return 'Not specified';
    }
    return val;
  };

  return (
    <div className="group">
      <dt className="text-sm text-gray-400 mb-1 transition-colors group-hover:text-gray-300">
        {label}
      </dt>
      <dd className="text-white/90 transition-colors group-hover:text-white">
        {formatValue(value)}
      </dd>
    </div>
  );
};

export const SummarySection: React.FC<SummarySectionProps> = ({ 
  title, 
  data, 
  fields 
}) => {
  const Icon = getIconForSection(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden',
        'transition-all duration-300 hover:bg-black/50 hover:border-primary/20',
        'hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]'
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fields).map(([key, label]) => (
            <DataField
              key={key}
              label={label}
              value={data[key]}
            />
          ))}
        </dl>
      </div>
    </motion.div>
  );
};