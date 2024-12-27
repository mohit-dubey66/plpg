import { z } from 'zod';

export const validateJsonStructure = <T>(
  json: string,
  schema: z.ZodType<T>
): T => {
  try {
    // Parse JSON string to object
    const parsed = JSON.parse(json);
    
    // Validate against schema
    return schema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Schema validation error:', error.errors);
      throw new Error('Invalid JSON structure');
    }
    if (error instanceof SyntaxError) {
      console.error('JSON parsing error:', error);
      throw new Error('Invalid JSON syntax');
    }
    throw error;
  }
};