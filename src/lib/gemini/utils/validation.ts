import { z } from 'zod';

export const PreparationOverviewSchema = z.object({
  examName: z.string(),
  duration: z.number(),
  subjects: z.array(z.object({
    name: z.string(),
    proficiency: z.number(),
    focusAreas: z.array(z.string())
  })),
  strategy: z.string()
});

export const MonthlyPlanSchema = z.array(z.object({
  month: z.number(),
  focus: z.array(z.object({
    subject: z.string(),
    topics: z.array(z.string()),
    goals: z.array(z.string())
  }))
}));

export const WeeklyPlanSchema = z.array(z.object({
  week: z.number(),
  schedule: z.array(z.object({
    day: z.string(),
    tasks: z.array(z.object({
      subject: z.string(),
      duration: z.number(),
      topic: z.string(),
      activity: z.string()
    }))
  }))
}));

export const ResourcePlanSchema = z.object({
  resources: z.array(z.object({
    name: z.string(),
    type: z.string(),
    purpose: z.string(),
    timeline: z.string(),
    priority: z.enum(['High', 'Medium', 'Low'])
  }))
});

export const TestSkillsPlanSchema = z.object({
  timeManagement: z.object({
    tips: z.array(z.string()),
    exercises: z.array(z.string())
  }),
  weakAreas: z.array(z.object({
    area: z.string(),
    strategies: z.array(z.string())
  }))
});

export const MotivationPlanSchema = z.object({
  stressManagement: z.array(z.string()),
  motivationalTips: z.array(z.string()),
  routineAdjustments: z.array(z.string())
});