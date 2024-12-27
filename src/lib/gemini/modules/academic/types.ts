import { z } from 'zod';

const ResourceTypeEnum = z.enum(['Video', 'Article', 'Book', 'Tutorial']);

export const BookLevelEnum = z.enum([
  'Beginner',
  'Beginner-Intermediate',
  'Intermediate',
  'Intermediate-Advanced',
  'Advanced'
]);

export const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  level: BookLevelEnum,
  topics: z.array(z.string()),
  amazonUrl: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional(),
  reasonForRecommendation: z.string()
});

export const ResourceSchema = z.object({
  type: ResourceTypeEnum,
  title: z.string(),
  description: z.string(),
  url: z.null()
});

export const BookRecommendationsSchema = z.object({
  recommendations: z.array(BookSchema),
  context: z.string()
});

// Weekly plan schema with more detailed structure
export const WeeklyPlanSchema = z.object({
  week: z.number(),
  goals: z.array(z.string()),
  topics: z.array(z.string()),
  tasks: z.array(z.string()),
  practice: z.object({
    exercises: z.array(z.string()),
    project: z.string(),
    timeAllocation: z.string()
  }),
  resources: z.array(ResourceSchema),
  assessment: z.string(),
  review: z.string()
});

// Overview schema for initial roadmap
export const StudyPlanOverviewSchema = z.object({
  greeting: z.string(),
  duration: z.string(),
  mainTopics: z.array(z.string()),
  learningObjectives: z.array(z.string()),
  totalWeeks: z.number(),
  weeklyOverviews: z.array(z.object({
    week: z.number(),
    theme: z.string(),
    objectives: z.array(z.string())
  }))
});

// Complete study plan schema
export const StudyPlanSchema = z.object({
  overview: StudyPlanOverviewSchema,
  weeklyPlans: z.array(WeeklyPlanSchema)
});

export type Book = z.infer<typeof BookSchema>;
export type BookRecommendations = z.infer<typeof BookRecommendationsSchema>;
export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>;
export type StudyPlanOverview = z.infer<typeof StudyPlanOverviewSchema>;
export type StudyPlan = z.infer<typeof StudyPlanSchema>;