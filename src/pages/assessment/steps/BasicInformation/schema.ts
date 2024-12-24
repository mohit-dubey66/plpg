import { z } from 'zod';

export const basicInformationSchema = z.object({
  personalDetails: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.number().min(15, 'Age must be at least 15').max(100, 'Age must be less than 100'),
    currentStatus: z.enum(['Student', 'Working Professional', 'Both', 'None'])
  }),
  examDetails: z.object({
    examName: z.string().min(2, 'Exam name is required'),
    hasAttemptedBefore: z.boolean(),
    previousScore: z.string().optional(),
    attemptYears: z.array(z.string()).optional(),
    targetScore: z.string().min(1, 'Target score is required'),
    goals: z.array(z.string()).min(1, 'At least one goal is required')
  })
});