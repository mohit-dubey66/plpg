import { model } from '../../../config';
import { cleanResponse, safeJsonParse, validateResponse } from '../../../utils/response';
import { handleApiError } from '../../../utils/error';
import { WeeklyPlanSchema } from '../types';
import { createWeeklyPrompt } from './prompts/weeklyPrompt';
import { normalizeResources } from '../utils/resourceNormalizer';
import type { Book, WeeklyPlan } from '../types';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class WeeklyPlanGenerator {
  async generate(
    assessment: AcademicAssessmentState,
    selectedBook: Book,
    weekNumbers: number[],
    previousWeeks: WeeklyPlan[] = []
  ) {
    try {
      const prompt = createWeeklyPrompt(assessment, selectedBook, weekNumbers, previousWeeks);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      console.log('Raw response:', response);

      let cleanedResponse;
      try {
        cleanedResponse = cleanResponse(response);
        console.log('Cleaned response:', cleanedResponse);
      } catch (error) {
        console.error('Response cleaning error:', error);
        throw new Error('Failed to parse weekly plan response');
      }

      let parsedResponse;
      try {
        parsedResponse = safeJsonParse(cleanedResponse);
        console.log('Parsed response:', parsedResponse);
      } catch (error) {
        console.error('JSON parsing error:', error);
        throw new Error('Failed to parse weekly plan data');
      }

      if (!Array.isArray(parsedResponse)) {
        console.error('Invalid response format - expected array:', parsedResponse);
        throw new Error('Invalid weekly plan format');
      }

      // Normalize and validate each week
      const validatedWeeks = parsedResponse.map((week, index) => {
        try {
          // Normalize resources before validation
          const normalizedWeek = {
            ...week,
            resources: normalizeResources(week.resources)
          };
          
          return validateResponse(normalizedWeek, WeeklyPlanSchema);
        } catch (error) {
          console.error(`Validation error for week ${index + 1}:`, error);
          throw new Error(`Invalid format for week ${index + 1}`);
        }
      });

      return validatedWeeks;
    } catch (error) {
      console.error('Weekly plan generation error:', error);
      handleApiError(error, 'Weekly Plan Generation');
    }
  }
}