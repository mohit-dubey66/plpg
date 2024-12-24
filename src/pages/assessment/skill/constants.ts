import { motion } from 'framer-motion';

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const sections = [
  {
    title: 'Skill Selection',
    dataKey: 'skillSelection',
    fields: {
      skillName: 'Skill',
      reason: 'Reason for Learning',
      targetLevel: 'Target Level',
      specificGoal: 'Specific Goal'
    }
  },
  {
    title: 'Current Proficiency',
    dataKey: 'currentProficiency',
    fields: {
      currentLevel: 'Current Level',
      proficiencyRating: 'Proficiency Rating',
      priorExperience: 'Prior Experience'
    }
  },
  {
    title: 'Learning Preferences',
    dataKey: 'learningPreferences',
    fields: {
      learningStyle: 'Learning Style',
      learningStructure: 'Learning Structure',
      preferredPlatforms: 'Preferred Platforms'
    }
  },
  {
    title: 'Resources',
    dataKey: 'resources',
    fields: {
      currentResources: 'Current Resources',
      budget: 'Budget',
      hasInternetAccess: 'Internet Access'
    }
  },
  {
    title: 'Time Commitment',
    dataKey: 'timeCommitment',
    fields: {
      dailyTime: 'Daily Time (hours)',
      availableDays: 'Available Days',
      timeline: 'Timeline'
    }
  },
  {
    title: 'Motivation & Challenges',
    dataKey: 'motivation',
    fields: {
      motivation: 'Motivation',
      anticipatedChallenges: 'Anticipated Challenges',
      challengeStrategy: 'Challenge Strategy'
    }
  }
];