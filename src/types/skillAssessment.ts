import { z } from 'zod';

export const SkillSelectionSchema = z.object({
  skillName: z.string().min(2, 'Skill name must be at least 2 characters'),
  reason: z.string().min(10, 'Please provide a detailed reason'),
  targetLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  specificGoal: z.string().min(10, 'Please provide a specific goal')
});

export const CurrentProficiencySchema = z.object({
  currentLevel: z.enum([
    'Absolute Beginner',
    'Beginner with some experience',
    'Intermediate',
    'Advanced'
  ]),
  proficiencyRating: z.number().min(1).max(10),
  priorExperience: z.string()
});

export const LearningPreferencesSchema = z.object({
  learningStyle: z.enum([
    'Watching videos',
    'Reading books',
    'Hands-on practice',
    'Group learning',
    'One-on-one mentorship',
    'Other'
  ]),
  learningStructure: z.enum([
    'Step-by-step structured lessons',
    'Open-ended exploratory learning'
  ]),
  preferredPlatforms: z.array(z.string()).min(1, 'Select at least one platform')
});

export const ResourcesSchema = z.object({
  currentResources: z.string(),
  budget: z.enum([
    'No Budget (Free Resources Only)',
    'Small Budget ($0-$50 per month)',
    'Moderate Budget ($50-$200 per month)',
    'High Budget ($200+ per month)'
  ]),
  hasInternetAccess: z.boolean()
});

export const TimeCommitmentSchema = z.object({
  dailyTime: z.number().min(0.5, 'Minimum 30 minutes required'),
  availableDays: z.array(z.string()).min(1, 'Select at least one day'),
  timeline: z.string().min(1, 'Please specify a timeline')
});

export const MotivationSchema = z.object({
  motivation: z.string().min(10, 'Please describe your motivation'),
  anticipatedChallenges: z.string().min(10, 'Please describe anticipated challenges'),
  challengeStrategy: z.string().min(10, 'Please describe your strategy')
});

export interface SkillAssessmentState {
  currentStep: number;
  isCompleted: boolean;
  skillSelection: z.infer<typeof SkillSelectionSchema>;
  currentProficiency: z.infer<typeof CurrentProficiencySchema>;
  learningPreferences: z.infer<typeof LearningPreferencesSchema>;
  resources: z.infer<typeof ResourcesSchema>;
  timeCommitment: z.infer<typeof TimeCommitmentSchema>;
  motivation: z.infer<typeof MotivationSchema>;
}

export type SkillAssessmentAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'UPDATE_SKILL_SELECTION'; payload: Partial<z.infer<typeof SkillSelectionSchema>> }
  | { type: 'UPDATE_CURRENT_PROFICIENCY'; payload: Partial<z.infer<typeof CurrentProficiencySchema>> }
  | { type: 'UPDATE_LEARNING_PREFERENCES'; payload: Partial<z.infer<typeof LearningPreferencesSchema>> }
  | { type: 'UPDATE_RESOURCES'; payload: Partial<z.infer<typeof ResourcesSchema>> }
  | { type: 'UPDATE_TIME_COMMITMENT'; payload: Partial<z.infer<typeof TimeCommitmentSchema>> }
  | { type: 'UPDATE_MOTIVATION'; payload: Partial<z.infer<typeof MotivationSchema>> }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };