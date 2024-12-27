import { model } from '../../config';
import { cleanResponse, safeJsonParse, validateResponse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import { BookRecommendationResponseSchema } from './types/bookRecommendation';
import type { SkillRoadmap } from './types';
import type { SkillAssessmentState } from '../../../../types/skillAssessment';

export class BookRecommender {
  async recommend(assessment: SkillAssessmentState, roadmap: SkillRoadmap) {
    try {
      // Simplified prompt to reduce JSON formatting issues
      const prompt = `
Recommend 5 books for learning ${assessment.skillSelection.skillName} based on:
- Current level: ${assessment.currentProficiency.currentLevel}
- Target level: ${assessment.skillSelection.targetLevel}
- Learning style: ${assessment.learningPreferences.learningStyle}
- Goal: ${assessment.skillSelection.specificGoal}
- Topics: ${roadmap.foundation.essentials.join(', ')}

Respond with a JSON object containing:
{
  "recommendations": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Brief description",
      "level": "Beginner|Intermediate|Advanced",
      "topics": ["topic1", "topic2"],
      "rating": 4.5
    }
  ],
  "context": "Why these books were chosen"
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      // Enhanced error handling for JSON parsing
      try {
        const cleanedResponse = cleanResponse(response);
        const parsedResponse = safeJsonParse(cleanedResponse);
        return validateResponse(parsedResponse, BookRecommendationResponseSchema);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.log('Raw Response:', response);
        throw new Error('Failed to parse book recommendations');
      }
    } catch (error) {
      handleApiError(error, 'Book Recommendations');
    }
  }
}