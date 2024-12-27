import { z } from 'zod';

export const stressMotivationSchema = z.object({
  isStressed: z.boolean(),
  stressManagement: z.array(z.string()).optional(),
  motivation: z.string().min(1, 'Please describe your motivation'),
  isConfident: z.boolean()
});