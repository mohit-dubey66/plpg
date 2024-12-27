import { z } from 'zod';

export const IntroductionSchema = z.object({
  greeting: z.string(),
  skillOverview: z.string(),
  roadmapOverview: z.string(),
  personalNote: z.string()
});

export const FoundationSchema = z.object({
  essentials: z.array(z.string()),
  resources: z.array(z.object({
    name: z.string(),
    type: z.string(),
    description: z.string()
  })),
  dailyHabits: z.array(z.string()),
  quickWin: z.string()
});


export const StrengtheningSchema = z.object({
  practices: z.array(z.string()),
  milestones: z.array(z.string()),
  feedbackMethods: z.array(z.string()),
  challenges: z.array(z.string())
});

export const AdvancedLearningSchema = z.object({
  topics: z.array(z.string()),
  resources: z.array(z.object({
    name: z.string(),
    type: z.string(),
    description: z.string()
  })),
  projects: z.array(z.string()),
  communities: z.array(z.string())
});

export const TimeManagementSchema = z.object({
  schedule: z.object({
    weekday: z.string(),
    weekend: z.string()
  }),
  microSessions: z.array(z.string()),
  burnoutPrevention: z.array(z.string())
});

export const MotivationSchema = z.object({
  messages: z.array(z.string()),
  progress: z.array(z.string()),
  rewards: z.array(z.string()),
  challenges: z.array(z.string())
});

export const FinalReviewSchema = z.object({
  progress: z.array(z.string()),
  opportunities: z.array(z.string()),
  nextSteps: z.array(z.string())
});

export const MonthOverviewSchema = z.object({
  month: z.number(),
  theme: z.string(),
  objectives: z.array(z.string())
});

export const MonthDetailSchema = z.object({
  month: z.number(),
  theme: z.string(),
  objectives: z.array(z.string()),
  weeks: z.array(z.object({
    week: z.number(),
    goals: z.array(z.string()),
    tasks: z.array(z.string()),
    practice: z.object({
      exercises: z.array(z.string()),
      project: z.string(),
      timeAllocation: z.string()
    }),
    resources: z.array(z.string()),
    assessment: z.string(),
    review: z.string()
  }))
});

export const LearningPlanSchema = z.object({
  firstMonth: MonthDetailSchema,
  upcomingMonths: z.array(MonthOverviewSchema)
});


export type Introduction = z.infer<typeof IntroductionSchema>;
export type Foundation = z.infer<typeof FoundationSchema>;
export type MonthOverview = z.infer<typeof MonthOverviewSchema>;
export type MonthDetail = z.infer<typeof MonthDetailSchema>;
export type LearningPlan = z.infer<typeof LearningPlanSchema>;
export type Strengthening = z.infer<typeof StrengtheningSchema>;
export type AdvancedLearning = z.infer<typeof AdvancedLearningSchema>;
export type TimeManagement = z.infer<typeof TimeManagementSchema>;
export type Motivation = z.infer<typeof MotivationSchema>;
export type FinalReview = z.infer<typeof FinalReviewSchema>;

export interface SkillRoadmap {
  introduction: Introduction;
  foundation: Foundation;
  learningPlan: LearningPlan;
  strengthening: Strengthening;
  advancedLearning: AdvancedLearning;
  timeManagement: TimeManagement;
  motivation: Motivation;
  finalReview: FinalReview;
}