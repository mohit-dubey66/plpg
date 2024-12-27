import { z } from 'zod';

export const personalPreferencesSchema = z.object({
  learningMethods: z.array(z.string()).min(1, 'Select at least one learning method'),
  wantsDetailedTimetable: z.boolean(),
  wantsMotivationalTips: z.boolean(),
  specificChallenges: z.string()
});