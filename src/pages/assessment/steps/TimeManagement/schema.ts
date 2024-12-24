import { z } from 'zod';

export const timeManagementSchema = z.object({
  preparationMonths: z.number()
    .min(1, 'Preparation duration must be at least 1 month')
    .max(36, 'Preparation duration cannot exceed 36 months'),
  weekdayHours: z.number()
    .min(1, 'Weekday study hours must be at least 1')
    .max(16, 'Weekday study hours cannot exceed 16'),
  weekendHours: z.number()
    .min(1, 'Weekend study hours must be at least 1')
    .max(16, 'Weekend study hours cannot exceed 16'),
  preferredTime: z.array(z.string()).min(1, 'Select at least one preferred time'),
  otherCommitments: z.array(z.string())
});