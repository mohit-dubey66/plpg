import { normalizeBookLevel } from './bookLevelNormalizer';

export const normalizeBookRecommendation = (book: any) => {
  return {
    ...book,
    level: normalizeBookLevel(book.level),
    topics: Array.isArray(book.topics) ? book.topics : 
           typeof book.topics === 'string' ? book.topics.split(',').map(t => t.trim()) :
           [],
    reasonForRecommendation: book.reasonForRecommendation || 
                            book.reason || 
                            book.recommendation || 
                            'Recommended for its comprehensive coverage'
  };
};

export const normalizeBookRecommendations = (response: any) => {
  if (!response.recommendations || !Array.isArray(response.recommendations)) {
    throw new Error('Invalid recommendations format');
  }

  return {
    recommendations: response.recommendations.map(normalizeBookRecommendation),
    context: response.context || 'Recommended books based on your learning profile'
  };
};