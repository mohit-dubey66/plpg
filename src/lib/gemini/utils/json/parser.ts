import { cleanComments } from './cleaners';

export const extractJsonFromText = (text: string): string => {
  try {
    // Find the first { or [ and last } or ]
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    
    if (start === -1 || end <= start) {
      throw new Error('No valid JSON object found');
    }

    // Extract just the JSON part
    const jsonPart = text.slice(start, end);
    
    // Clean up the extracted JSON
    const cleaned = cleanComments(jsonPart)
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Validate JSON structure
    JSON.parse(cleaned); // This will throw if invalid
    
    return cleaned;
  } catch (error) {
    console.error('JSON extraction error:', error);
    console.log('Original text:', text);
    throw new Error('Failed to extract valid JSON');
  }
};