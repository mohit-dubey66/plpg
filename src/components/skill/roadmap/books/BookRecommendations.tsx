import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import type { Book as BookType } from '../../../../lib/gemini/modules/skill/types/bookRecommendation';
import { BookGrid } from './BookGrid';

interface BookRecommendationsProps {
  books: BookType[];
  context: string;
}

export const BookRecommendations: React.FC<BookRecommendationsProps> = ({ books, context }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Book className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Recommended Books</h2>
          <p className="text-gray-400 text-sm">Curated reading list for your learning journey</p>
        </div>
      </div>

      {/* Context */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
        <p className="text-gray-400">{context}</p>
      </div>

      {/* Book Grid */}
      <BookGrid books={books} />
    </motion.div>
  );
};