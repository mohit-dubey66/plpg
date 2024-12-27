export const extractJsonContent = (response: string): string => {
  try {
    // Find JSON boundaries
    const start = response.indexOf('{');
    const arrayStart = response.indexOf('[');
    
    // Get the earliest start of JSON content
    const firstStart = start === -1 ? arrayStart : 
                      arrayStart === -1 ? start : 
                      Math.min(start, arrayStart);
    
    if (firstStart === -1) {
      console.error('No JSON content found in response:', response);
      throw new Error('No JSON object/array found in response');
    }

    // Find the corresponding end
    const lastBrace = response.lastIndexOf('}');
    const lastBracket = response.lastIndexOf(']');
    const end = Math.max(lastBrace, lastBracket) + 1;

    if (end <= firstStart) {
      console.error('Invalid JSON structure - no closing delimiter found');
      throw new Error('Invalid JSON structure');
    }

    const extracted = response.slice(firstStart, end);
    console.log('Extracted JSON content:', extracted);
    return extracted;
  } catch (error) {
    console.error('Error extracting JSON content:', error);
    throw error;
  }
};

export const validateJsonStructure = (json: string): string => {
  try {
    // Attempt to parse the JSON to validate structure
    JSON.parse(json);
    return json;
  } catch (error) {
    console.error('JSON validation error:', error);
    console.log('Invalid JSON:', json);
    
    // Try to fix common array issues
    if (json.trim().match(/^[^[\]{},\s]+(?:\s*,\s*[^[\]{},\s]+)*$/)) {
      const fixedJson = `[${json}]`;
      try {
        // Validate the fixed JSON
        JSON.parse(fixedJson);
        return fixedJson;
      } catch {
        // If fixing failed, throw the original error
        throw new Error('Failed to create valid JSON');
      }
    }
    throw new Error('Failed to create valid JSON');
  }
};