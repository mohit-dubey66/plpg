/**
 * Cleans the AI response by removing markdown formatting and extracting JSON
 */
export const cleanResponse = (response: string): string => {
  // Remove comments and trailing commas
  const cleanedText = response
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '') // Remove single-line comments
    .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

  // Try to find JSON in code blocks first
  const jsonMatch = cleanedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }

  // If no code blocks, try to find JSON object/array directly
  const jsonPattern = /({[\s\S]*}|\[[\s\S]*\])/;
  const directMatch = cleanedText.match(jsonPattern);
  if (directMatch) {
    return directMatch[1].trim();
  }

  throw new Error('No valid JSON found in response');
};

/**
 * Safely parses JSON with better error messages
 */
export const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof Error) {
      // Clean the text for error message
      const preview = text.length > 100 ? `${text.slice(0, 100)}...` : text;
      throw new Error(`Invalid JSON: ${error.message}\nReceived: ${preview}`);
    }
    throw error;
  }
};