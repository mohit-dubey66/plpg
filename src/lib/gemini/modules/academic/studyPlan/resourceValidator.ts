import { validateAndFixUrl } from '../../../utils/validation/url';
import type { WeeklyPlan } from '../types';

interface Resource {
  url?: string | null;
  type: string;
  title: string;
  description: string;
}

export const validateResources = (resources: Resource[]): Resource[] => {
  return resources.map(resource => ({
    ...resource,
    url: resource.url ? validateAndFixUrlSafely(resource.url) : null
  }));
};

export const validateWeeklyPlans = (weeklyPlans: any[]): WeeklyPlan[] => {
  return weeklyPlans.map(week => ({
    ...week,
    resources: week.resources ? validateResources(week.resources) : []
  }));
};

const validateAndFixUrlSafely = (url: string): string | null => {
  try {
    return validateAndFixUrl(url);
  } catch {
    return null;
  }
};