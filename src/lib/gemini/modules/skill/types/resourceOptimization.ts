import { z } from 'zod';

const ResourceItemSchema = z.object({
  title: z.string(),
  type: z.string(),
  link: z.string().url(),
  description: z.string()
});

export const ResourceOptimizationResponseSchema = z.object({
  beginner: z.array(ResourceItemSchema),
  intermediate: z.array(ResourceItemSchema),
  advanced: z.array(ResourceItemSchema)
});

export type ResourceItem = z.infer<typeof ResourceItemSchema>;
export type ResourceOptimizationResponse = z.infer<typeof ResourceOptimizationResponseSchema>;