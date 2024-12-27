import { motion } from 'framer-motion';
import { getGreeting } from '../../lib/utils/time';

interface GreetingProps {
  name: string;
}

export const Greeting = ({ name }: GreetingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        {getGreeting()}, {name}!
        <motion.span
          animate={{ rotate: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        >
          👋
        </motion.span>
      </h1>
      <p className="text-gray-400">
        Ready to continue your learning journey? Choose from creating a new
        learning path or generating a quick revision guide.
      </p>
    </motion.div>
  );
};