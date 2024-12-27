import { model } from '../../../config';
import { cleanResponse, safeJsonParse, validateResponse } from '../../../utils/response';
import { handleApiError } from '../../../utils/error';
import { StudyPlanOverviewSchema } from '../types';
import { createOverviewPrompt } from './prompts/overviewPrompt';
import { normalizeOverviewResponse } from './responseNormalizer';
import type { Book } from '../types';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class StudyPlanOverviewGenerator {
  async generate(assessment: AcademicAssessmentState, selectedBook: Book) {
    try {
      const prompt = createOverviewPrompt(assessment, selectedBook);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      // Enhanced error handling
      let cleanedResponse;
      try {
        cleanedResponse = cleanResponse(response);
        console.log('Cleaned overview response:', cleanedResponse);
      } catch (error) {
        console.error('Overview response cleaning error:', error);
        throw new Error('Failed to clean overview response');
      }

      let parsedResponse;
      try {
        parsedResponse = safeJsonParse(cleanedResponse);
        console.log('Parsed overview response:', parsedResponse);
      } catch (error) {
        console.error('Overview JSON parsing error:', error);
        console.log('Failed to parse overview:', cleanedResponse);
        throw new Error('Failed to parse overview response');
      }

      // Normalize the response to ensure correct structure
      const normalizedResponse = normalizeOverviewResponse(parsedResponse);
      console.log('Normalized overview response:', normalizedResponse);

      // Validate the normalized response
      return validateResponse(normalizedResponse, StudyPlanOverviewSchema);
    } catch (error) {
      console.error('Study plan overview generation error:', error);
      handleApiError(error, 'Study Plan Overview Generation');
    }
  }
}