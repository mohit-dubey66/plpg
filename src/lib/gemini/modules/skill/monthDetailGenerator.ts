import { model } from '../../config';
import { prompts } from './prompts';
import { cleanResponse, safeJsonParse, validateResponse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import { MonthDetailSchema, type MonthDetail, type MonthOverview } from './types';
import type { SkillAssessmentState } from '../../../../types/skillAssessment';

export class MonthDetailGenerator {
  async generate(
    assessment: SkillAssessmentState,
    monthOverview: MonthOverview,
    previousMonths: MonthDetail[]
  ): Promise<MonthDetail> {
    try {
      const prompt = prompts.monthDetail(assessment, monthOverview, previousMonths);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const cleanedResponse = cleanResponse(response);
      const parsedResponse = safeJsonParse(cleanedResponse);
      return validateResponse(parsedResponse, MonthDetailSchema);
    } catch (error) {
      console.error('Error generating month detail:', error);
      handleApiError(error, 'Month Detail Generation');
    }
  }
}