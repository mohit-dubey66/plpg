import React from 'react';
import { motion } from 'framer-motion';
import { Book, Star, ExternalLink } from 'lucide-react';
import type { Book as BookType } from '../../../lib/gemini/modules/skill/types/bookRecommendation';

interface BookRecommendationsProps {
  books: BookType[];
  context: string;
}

export const BookRecommendations: React.FC<BookRecommendationsProps> = ({ books, context }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Book className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Recommended Books</h2>
      </div>

      <div className="bg-white/5 p-4 rounded-lg mb-6">
        <p className="text-gray-400">{context}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl p-6
                     transition-all duration-300 hover:bg-black/50 hover:border-primary/20
                     group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-400">by {book.author}</p>
              </div>
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary hover:text-primary/80 hover:bg-white/5 
                           rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <p className="text-sm text-gray-400 mb-4">{book.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {book.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm px-2 py-1 rounded-full bg-white/5 text-gray-400">
                {book.level}
              </span>
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-primary" />
                  <span className="text-sm text-gray-400">{book.rating}/5</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};