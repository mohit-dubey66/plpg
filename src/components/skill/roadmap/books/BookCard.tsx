import React from 'react';
import { motion } from 'framer-motion';
import { Book, Star, ExternalLink } from 'lucide-react';
import type { Book as BookType } from '../../../../lib/gemini/modules/skill/types/bookRecommendation';
import { cn } from '../../../../lib/utils';

interface BookCardProps {
  book: BookType;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 p-6 rounded-xl
                    transition-all duration-300 group-hover:bg-black/50 group-hover:border-primary/20
                    hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-white/90 group-hover:text-white
                         transition-colors line-clamp-1">
              {book.title}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">by {book.author}</p>
          </div>
          {book.amazonUrl && (
            <motion.a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-primary hover:text-primary/80 hover:bg-white/5 
                       rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300">
          {book.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {book.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary
                       transition-colors group-hover:bg-primary/20"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={cn(
            'text-xs px-2 py-1 rounded-full',
            book.level === 'Beginner' && 'bg-green-500/10 text-green-400',
            book.level === 'Intermediate' && 'bg-yellow-500/10 text-yellow-400',
            book.level === 'Advanced' && 'bg-red-500/10 text-red-400'
          )}>
            {book.level}
          </span>
          {book.rating && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-sm text-gray-400">{book.rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};