import { model } from '../../../config';
import { cleanResponse, safeJsonParse, validateResponse } from '../../../utils/response';
import { WeeklyPlanSchema } from '../types';
import { createWeekGenerationPrompt } from './prompts/weekGeneration';
import type { Book } from '../types';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class WeekGenerator {
  async generateWeeks(
    assessment: AcademicAssessmentState,
    selectedBook: Book,
    startWeek: number,
    previousWeeks: any[] = []
  ) {
    try {
      const prompt = createWeekGenerationPrompt(assessment, selectedBook, startWeek, previousWeeks);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const cleanedResponse = cleanResponse(response);
      const parsedResponse = safeJsonParse(cleanedResponse);
      
      return parsedResponse.map(week => validateResponse(week, WeeklyPlanSchema));
    } catch (error) {
      console.error('Week generation error:', error);
      throw new Error('Failed to generate weekly plan');
    }
  }
}