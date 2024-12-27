import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, BookOpen, ChevronDown, ChevronUp, ListChecks, BookText } from 'lucide-react';
import type { Book } from '../../../../lib/gemini/modules/academic/types';
import { cn } from '../../../../lib/utils';

interface BookCardProps {
  book: Book;
  isSelected: boolean;
  onSelect: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onSelect}
      className={cn(
        'group cursor-pointer relative overflow-hidden',
        'bg-black/40 backdrop-blur-xl border rounded-xl p-6',
        'transition-all duration-300 hover:bg-black/50',
        isSelected 
          ? 'border-primary shadow-[0_0_30px_rgba(var(--primary),0.2)]' 
          : 'border-white/5 hover:border-primary/20'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <BookText className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-semibold text-white/90 group-hover:text-white">
              {book.title}
            </h3>
          </div>
          <p className="text-sm text-gray-400 group-hover:text-gray-300">
            by {book.author}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {book.rating && (
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-sm text-gray-400">{book.rating}/5</span>
            </div>
          )}
          <motion.div
            animate={{ rotate: isSelected ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-primary"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        {book.topics.slice(0, isSelected ? undefined : 3).map((topic) => (
          <span
            key={topic}
            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary
                     transition-colors group-hover:bg-primary/20"
          >
            {topic}
          </span>
        ))}
        {!isSelected && book.topics.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
            +{book.topics.length - 3} more
          </span>
        )}
      </div>

      {/* Level Badge */}
      <div className={cn(
        'text-xs px-2 py-1 rounded-full inline-flex items-center gap-1',
        book.level === 'Beginner' && 'bg-green-500/10 text-green-400',
        book.level === 'Intermediate' && 'bg-yellow-500/10 text-yellow-400',
        book.level === 'Advanced' && 'bg-red-500/10 text-red-400'
      )}>
        <BookOpen size={12} />
        {book.level}
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                  <BookText size={16} />
                  Description
                </h4>
                <p className="text-sm text-gray-400">{book.description}</p>
              </div>

              {/* Recommendation */}
              <div>
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                  <ListChecks size={16} />
                  Why this book?
                </h4>
                <p className="text-sm text-gray-400">{book.reasonForRecommendation}</p>
              </div>

              {/* Amazon Link */}
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 
                           text-sm mt-2 hover:underline"
                >
                  <ExternalLink size={14} />
                  View on Amazon
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};