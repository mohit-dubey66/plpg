import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

interface BookHeaderProps {
  context: string;
}

export const BookHeader: React.FC<BookHeaderProps> = ({ context }) => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Book className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Recommended Books</h2>
          <p className="text-sm text-gray-400">Personalized reading list for your learning journey</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 
                   p-6 rounded-xl backdrop-blur-sm"
      >
        <p className="text-gray-300 leading-relaxed">{context}</p>
      </motion.div>
    </div>
  );
};