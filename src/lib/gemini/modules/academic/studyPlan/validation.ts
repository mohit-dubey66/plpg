import { cleanArrayItems } from '../../../utils/validation/array';

export const validateArrayItems = (arr: any[], path: string) => {
  if (!Array.isArray(arr)) {
    throw new Error(`Expected array at ${path}`);
  }
  
  // Clean and validate each item
  return arr.map((item, index) => {
    if (typeof item === 'string') {
      // Split comma-separated values into array items
      if (item.includes(',')) {
        return cleanArrayItems(item.split(','));
      }
      return item.trim();
    }
    return item;
  }).flat();
};

export const validateStudyPlanArrays = (response: any) => {
  // Validate overview arrays
  if (response.overview) {
    if (response.overview.mainTopics) {
      response.overview.mainTopics = validateArrayItems(response.overview.mainTopics, 'overview.mainTopics');
    }
    if (response.overview.learningObjectives) {
      response.overview.learningObjectives = validateArrayItems(response.overview.learningObjectives, 'overview.learningObjectives');
    }
  }

  // Validate weekly plans
  if (response.weeklyPlans) {
    response.weeklyPlans.forEach((plan: any, weekIndex: number) => {
      if (plan.topics) {
        plan.topics = validateArrayItems(plan.topics, `weeklyPlans[${weekIndex}].topics`);
      }
      if (plan.tasks) {
        plan.tasks = validateArrayItems(plan.tasks, `weeklyPlans[${weekIndex}].tasks`);
      }
      if (plan.practice?.problems) {
        plan.practice.problems = validateArrayItems(plan.practice.problems, `weeklyPlans[${weekIndex}].practice.problems`);
      }
      if (plan.practice?.projects) {
        plan.practice.projects = validateArrayItems(plan.practice.projects, `weeklyPlans[${weekIndex}].practice.projects`);
      }
    });
  }

  return response;
};