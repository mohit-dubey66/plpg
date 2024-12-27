import { cleanResponse, safeJsonParse, validateResponse } from '../../../utils/response';
import { validateStudyPlanArrays } from './validation';
import { validateWeeklyPlans } from './resourceValidator';
import { StudyPlanSchema } from '../types';

export const parseStudyPlanResponse = (response: string) => {
  const cleanedResponse = cleanResponse(response);
  const parsedResponse = safeJsonParse(cleanedResponse);
  
  // Validate resources and URLs
  if (parsedResponse.weeklyPlans) {
    parsedResponse.weeklyPlans = validateWeeklyPlans(parsedResponse.weeklyPlans);
  }
  
  // Validate arrays and structure
  const validatedArrays = validateStudyPlanArrays(parsedResponse);
  return validateResponse(validatedArrays, StudyPlanSchema);
};