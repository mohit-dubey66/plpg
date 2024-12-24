import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Book, Clock, BarChart2, 
  Package, Target, Brain, Settings 
} from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { DataField } from './DataField';

interface SummarySectionProps {
  title: string;
  data: Record<string, any>;
  fields: Record<string, string>;
}

const getIconForSection = (title: string) => {
  switch (title) {
    case 'Skill Selection':
      return Book;
    case 'Current Proficiency':
      return BarChart2;
    case 'Learning Preferences':
      return Brain;
    case 'Resources':
      return Package;
    case 'Time Commitment':
      return Clock;
    case 'Motivation & Challenges':
      return Target;
    default:
      return Settings;
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const SummarySection: React.FC<SummarySectionProps> = ({ 
  title, 
  data, 
  fields 
}) => {
  const Icon = getIconForSection(title);

  return (
    <motion.div variants={item}>
      <SummaryCard title={title} icon={Icon}>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fields).map(([key, label]) => (
            <DataField
              key={key}
              label={label}
              value={data[key]}
            />
          ))}
        </dl>
      </SummaryCard>
    </motion.div>
  );
};