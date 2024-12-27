import { z } from 'zod';
import { cleanComments, cleanControlChars, fixCommas, fixPropertyNames, fixStringValues } from './json/cleaners';
import { extractJsonContent, validateJsonStructure } from './json/extractor';

export const cleanResponse = (response: string): string => {
  try {
    // Log the original response for debugging
    console.log('Original response:', response);

    // Extract JSON content from response
    let jsonContent = extractJsonContent(response);
    console.log('Extracted JSON:', jsonContent);

    // Apply cleaning operations
    jsonContent = cleanComments(jsonContent);
    jsonContent = cleanControlChars(jsonContent);
    jsonContent = fixCommas(jsonContent);
    jsonContent = fixPropertyNames(jsonContent);
    jsonContent = fixStringValues(jsonContent);

    // Log the cleaned content before validation
    console.log('Cleaned content:', jsonContent);

    // Validate and return the cleaned JSON
    const validatedJson = validateJsonStructure(jsonContent);
    console.log('Validated JSON:', validatedJson);
    
    return validatedJson;
  } catch (error) {
    console.error('Error cleaning JSON response:', error);
    console.log('Failed to clean response:', response);
    throw new Error('Failed to clean JSON response');
  }
};

export const safeJsonParse = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parsing error:', error);
    console.log('Failed to parse:', jsonString);
    throw new Error('Failed to parse JSON response');
  }
};

export const validateResponse = <T>(response: unknown, schema: z.ZodType<T>): T => {
  try {
    return schema.parse(response);
  } catch (error) {
    console.error('Response validation error:', error);
    throw new Error('Invalid response format');
  }
};