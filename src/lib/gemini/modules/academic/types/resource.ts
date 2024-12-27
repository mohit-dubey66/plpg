import { z } from 'zod';

export const ResourceTypeEnum = z.enum(['Video', 'Article', 'Book', 'Tutorial']);

export const ResourceSchema = z.object({
  type: ResourceTypeEnum,
  title: z.string(),
  description: z.string(),
  url: z.null() // URLs are always null for security
});

export type Resource = z.infer<typeof ResourceSchema>;
export type ResourceType = z.infer<typeof ResourceTypeEnum>;