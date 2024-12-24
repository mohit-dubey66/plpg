import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export const ActionCard = ({ icon: Icon, title, description, onClick }: ActionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-black/40 backdrop-blur-lg border border-white/5 p-6 rounded-xl
                    transition-all duration-300 hover:bg-black/50">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4
                      group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-400 mb-4">{description}</p>
        <motion.button 
          className="text-primary hover:text-primary/80 inline-flex items-center
                     transition-colors duration-200"
          whileHover={{ x: 4 }}
        >
          Get Started
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};