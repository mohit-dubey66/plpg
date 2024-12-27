import React from 'react';
import { motion } from 'framer-motion';
import type { Book } from '../../../../lib/gemini/modules/skill/types/bookRecommendation';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {books.map((book, index) => (
        <motion.div key={book.title} variants={item}>
          <BookCard book={book} />
        </motion.div>
      ))}
    </motion.div>
  );
};