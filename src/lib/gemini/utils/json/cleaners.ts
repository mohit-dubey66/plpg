// Specialized JSON cleaning functions
export const cleanComments = (json: string): string => {
  return json
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove multi-line comments
    .replace(/\/\/.*/g, '');           // Remove single-line comments
};

export const cleanControlChars = (json: string): string => {
  return json.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
};

export const fixCommas = (json: string): string => {
  return json
    .replace(/,(\s*[}\]])/g, '$1')           // Fix trailing commas
    .replace(/}(\s*){/g, '},{')              // Fix missing commas between objects
    .replace(/](\s*)\[/g, '],[')             // Fix missing commas between arrays
    .replace(/](\s*){/g, '],{')              // Fix array-object transitions
    .replace(/}(\s*)\[/g, '},[');            // Fix object-array transitions
};

export const fixPropertyNames = (json: string): string => {
  return json
    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')  // Add quotes to property names
    .replace(/"([^"]+)"(\s*):/g, '"$1":');                // Fix spaces in property names
};

export const fixStringValues = (json: string): string => {
  return json
    .replace(/:\s*'([^']*)'/g, ':"$1"')      // Replace single quotes with double quotes
    .replace(/"([^"]*)""/g, '"$1"')          // Fix double quoted strings
    .replace(/\\"/g, '"')                    // Fix escaped quotes
    .replace(/"\s*"\s*"/g, '"');             // Fix multiple quotes
};