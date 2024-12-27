import { model } from '../../config';
import { createStudyPlanPrompt } from './prompts';
import { cleanResponse, safeJsonParse } from '../../utils/response';
import { normalizeStudyPlanResponse } from './responseNormalizer';
import { validateStudyPlan } from './validator';
import { handleApiError } from '../../utils/error';
import type { Book, StudyPlan } from '../types';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class StudyPlanGenerator {
  async generate(assessment: AcademicAssessmentState, selectedBook: Book): Promise<StudyPlan> {
    try {
      const prompt = createStudyPlanPrompt(assessment, selectedBook);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      const cleanedResponse = cleanResponse(response);
      const parsedResponse = safeJsonParse(cleanedResponse);
      const normalizedResponse = normalizeStudyPlanResponse(parsedResponse);
      
      return validateStudyPlan(normalizedResponse);
    } catch (error) {
      console.error('Study plan generation error:', error);
      handleApiError(error, 'Study Plan Generation');
    }
  }
}