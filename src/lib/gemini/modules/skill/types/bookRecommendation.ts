import { z } from 'zod';

export const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  topics: z.array(z.string()),
  amazonUrl: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional()
});

export const BookRecommendationResponseSchema = z.object({
  recommendations: z.array(BookSchema),
  context: z.string()
});

export type Book = z.infer<typeof BookSchema>;
export type BookRecommendationResponse = z.infer<typeof BookRecommendationResponseSchema>;