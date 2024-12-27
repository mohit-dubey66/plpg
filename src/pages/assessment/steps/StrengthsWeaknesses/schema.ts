import { z } from 'zod';

export const strengthsWeaknessesSchema = z.object({
  proficiencyRatings: z.array(z.object({
    subject: z.string().min(1, 'Subject name is required'),
    rating: z.number().min(1).max(10)
  })).min(1, 'At least one subject proficiency rating is required'),
  difficultTopics: z.string().min(1, 'Please describe your difficult topics'),
  confidentTopics: z.string().min(1, 'Please describe your confident topics'),
  hasTakenMocks: z.boolean(),
  mockTests: z.object({
    count: z.number().min(0),
    averageScore: z.string(),
    weakAreas: z.array(z.string())
  }).optional()
});