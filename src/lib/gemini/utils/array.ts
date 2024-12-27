/**
 * Cleans array items by trimming whitespace and removing empty items
 */
export const cleanArrayItems = (items: string[]): string[] => {
  return items
    .map(item => item.trim())
    .filter(item => item.length > 0);
};