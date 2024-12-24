export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};
export const parseTimelineToMonths = (timeline: string): number => {
  const timelineStr = timeline.toLowerCase();
  
  // Extract number and unit from string (e.g., "6 months", "1 year")
  const match = timelineStr.match(/(\d+)\s*(month|months|year|years)/);
  if (!match) return 3; // Default to 3 months if parsing fails
  
  const [, number, unit] = match;
  const value = parseInt(number);
  
  // Convert years to months if necessary
  if (unit.includes('year')) {
    return value * 12;
  }
  
  return value;
};