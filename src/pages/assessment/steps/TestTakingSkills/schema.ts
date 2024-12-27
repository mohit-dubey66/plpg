import { z } from 'zod';

export const testTakingSkillsSchema = z.object({
  numericalComfort: z.number().min(1).max(10),
  timeManagementConfidence: z.number().min(1).max(10),
  challenges: z.array(z.string()).min(1, 'Select at least one challenge')
});