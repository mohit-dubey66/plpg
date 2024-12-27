import { model } from '../../config';
import { createTimeManagementPrompt } from './prompts/timeManagement';
import { extractJsonFromText } from '../../utils/json/parser';
import { validateJsonStructure } from '../../utils/json/validator';
import { TimeManagementSchema } from './types';
import { handleApiError } from '../../utils/error';

export class TimeManagementGenerator {
  async generate(assessment: any) {
    try {
      // Generate the prompt
      const prompt = createTimeManagementPrompt(assessment);
      
      // Get response from model
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      // Extract and validate JSON
      const jsonString = extractJsonFromText(response);
      const validated = validateJsonStructure(jsonString, TimeManagementSchema);
      
      return validated;
    } catch (error) {
      console.error('Time management generation error:', error);
      handleApiError(error, 'Time Management Generation');
    }
  }
}