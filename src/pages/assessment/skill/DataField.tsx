import React from 'react';
import { motion } from 'framer-motion';

interface DataFieldProps {
  label: string;
  value: any;
}

export const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <dt className="text-sm text-gray-400 mb-1 transition-colors group-hover:text-gray-300">
        {label}
      </dt>
      <dd className="text-white/90 transition-colors group-hover:text-white">
        {formatValue(value)}
      </dd>
    </motion.div>
  );
};