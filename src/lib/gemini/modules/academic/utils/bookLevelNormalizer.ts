import { BookLevelEnum } from '../types';

const levelMappings: Record<string, keyof typeof BookLevelEnum.enum> = {
  'beginner': 'Beginner',
  'beginner/intermediate': 'Beginner-Intermediate',
  'intermediate': 'Intermediate',
  'intermediate/advanced': 'Intermediate-Advanced',
  'advanced': 'Advanced'
};

export const normalizeBookLevel = (level: string): keyof typeof BookLevelEnum.enum => {
  const normalizedInput = level.toLowerCase().trim();
  const mappedLevel = levelMappings[normalizedInput];
  
  if (!mappedLevel) {
    // Default to closest match or throw error
    if (normalizedInput.includes('beginner') && normalizedInput.includes('intermediate')) {
      return 'Beginner-Intermediate';
    }
    if (normalizedInput.includes('intermediate') && normalizedInput.includes('advanced')) {
      return 'Intermediate-Advanced';
    }
    return 'Intermediate'; // Default fallback
  }
  
  return mappedLevel;
};