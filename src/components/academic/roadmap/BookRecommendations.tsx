import React from 'react';
import { motion } from 'framer-motion';
import type { Book } from '../../../lib/gemini/modules/academic/types';
import { useAcademicRoadmapStore } from '../../../store/useAcademicRoadmapStore';
import { BookHeader } from './books/BookHeader';
import { BookGrid } from './books/BookGrid';

interface BookRecommendationsProps {
  books: Book[];
  context: string;
}

export const BookRecommendations: React.FC<BookRecommendationsProps> = ({ books, context }) => {
  const { selectBook, selectedBook } = useAcademicRoadmapStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <BookHeader context={context} />
      <BookGrid 
        books={books}
        selectedBook={selectedBook}
        onSelectBook={selectBook}
      />
    </motion.div>
  );
};