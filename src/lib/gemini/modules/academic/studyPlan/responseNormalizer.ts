import { cleanArrayItems } from '../../../utils/validation/array';

export const normalizeOverviewResponse = (response: any) => {
  // Ensure all required fields exist
  const normalized = {
    greeting: response.greeting || '',
    duration: response.duration || '',
    mainTopics: [],
    learningObjectives: [],
    totalWeeks: response.totalWeeks || 0,
    weeklyOverviews: []
  };

  // Normalize main topics
  if (Array.isArray(response.mainTopics)) {
    normalized.mainTopics = cleanArrayItems(response.mainTopics);
  } else if (typeof response.mainTopics === 'string') {
    normalized.mainTopics = cleanArrayItems(response.mainTopics.split(','));
  }

  // Normalize learning objectives
  if (Array.isArray(response.learningObjectives)) {
    normalized.learningObjectives = cleanArrayItems(response.learningObjectives);
  } else if (typeof response.learningObjectives === 'string') {
    normalized.learningObjectives = cleanArrayItems(response.learningObjectives.split(','));
  }

  // Normalize weekly overviews
  if (Array.isArray(response.weeklyOverviews)) {
    normalized.weeklyOverviews = response.weeklyOverviews.map((week: any) => ({
      week: week.week || 0,
      theme: week.theme || '',
      objectives: Array.isArray(week.objectives) 
        ? cleanArrayItems(week.objectives)
        : typeof week.objectives === 'string'
          ? cleanArrayItems(week.objectives.split(','))
          : []
    }));
  }

  return normalized;
};