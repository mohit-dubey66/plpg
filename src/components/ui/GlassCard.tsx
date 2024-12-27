import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl',
        'shadow-xl hover:shadow-primary/5 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};