import { StudyPlanSchema } from '../types';
import type { StudyPlan } from '../types';

export const validateStudyPlan = (response: any): StudyPlan => {
  try {
    // Validate structure and types
    const validatedPlan = StudyPlanSchema.parse(response);

    // Additional validation rules
    validateWeeklyContent(validatedPlan);
    validatePracticeProblems(validatedPlan);
    validateResourceTypes(validatedPlan);

    return validatedPlan;
  } catch (error) {
    console.error('Study plan validation error:', error);
    throw new Error('Invalid study plan format');
  }
};

const validateWeeklyContent = (plan: StudyPlan) => {
  plan.weeklyPlans.forEach((week) => {
    if (week.topics.length === 0) {
      throw new Error(`Week ${week.week} has no topics`);
    }
    if (week.tasks.length === 0) {
      throw new Error(`Week ${week.week} has no tasks`);
    }
  });
};

const validatePracticeProblems = (plan: StudyPlan) => {
  plan.weeklyPlans.forEach((week) => {
    if (week.practice.problems.length !== 5) {
      throw new Error(`Week ${week.week} must have exactly 5 practice problems`);
    }
  });
};

const validateResourceTypes = (plan: StudyPlan) => {
  const validTypes = ['Video', 'Article', 'Book', 'Tutorial'];
  plan.weeklyPlans.forEach((week) => {
    week.resources.forEach((resource) => {
      if (!validTypes.includes(resource.type)) {
        throw new Error(`Invalid resource type: ${resource.type}`);
      }
    });
  });
};