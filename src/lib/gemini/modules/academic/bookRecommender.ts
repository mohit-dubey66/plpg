import { model } from '../../config';
import { cleanResponse, safeJsonParse, validateResponse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import { BookRecommendationsSchema } from './types';
import { normalizeBookRecommendations } from './utils/responseNormalizer';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class BookRecommender {
  async recommend(assessment: AcademicAssessmentState) {
    try {
      const prompt = `
You are a friendly and knowledgeable academic advisor helping a student with their learning journey.

Let's create a personalized book recommendation for someone who wants to learn ${assessment.subjectSelection.subjectName}.

Their Profile:
- Goal: ${assessment.subjectSelection.learningGoal === 'Other' 
  ? assessment.subjectSelection.customGoal 
  : assessment.subjectSelection.learningGoal}
- Study Level: ${assessment.subjectSelection.levelOfStudy}
- Current Knowledge: ${assessment.currentKnowledge.level}
- Learning Style: ${assessment.learningStyle.preferredMethods.join(', ')}
- Time Available: ${assessment.timeCommitment.dailyHours} hours daily
- Study Duration: ${assessment.timeCommitment.studyDuration} weeks

First, write a warm, encouraging greeting that:
1. Acknowledges their specific goal
2. Shows understanding of their current level
3. Expresses enthusiasm for their learning journey
4. Explains how the recommended books will help them succeed

Then, recommend 5 books that perfectly match their:
- Current knowledge level
- Learning style preferences
- Available study time
- Specific goals

For each book, provide a JSON object with these REQUIRED fields:
{
  "title": "Book Title",
  "author": "Author Name",
  "description": "A friendly, detailed explanation of the book's content and how it matches their learning style",
  "level": "one of: Beginner, Beginner-Intermediate, Intermediate, Intermediate-Advanced, Advanced",
  "topics": ["Key topics that align with their goals"],
  "rating": number between 1-5,
  "reasonForRecommendation": "A personal note explaining why this book is perfect for their situation"
}

Return a JSON object with this exact structure:
{
  "recommendations": [
    // 5 book objects with the structure above
  ],
  "context": "Your warm, personalized greeting and explanation of the book selection strategy"
}`;

      console.log('\n=== Book Recommendations Generation ===');
      console.log('\nAssessment Data:', JSON.stringify(assessment, null, 2));
      console.log('\nPrompt:', prompt);

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      console.log('\nRaw Response:', response);

      const cleanedResponse = cleanResponse(response);
      console.log('\nCleaned Response:', cleanedResponse);

      const parsedResponse = safeJsonParse(cleanedResponse);
      console.log('\nParsed Response:', JSON.stringify(parsedResponse, null, 2));

      const normalizedResponse = normalizeBookRecommendations(parsedResponse);
      console.log('\nNormalized Response:', JSON.stringify(normalizedResponse, null, 2));

      const validatedResponse = validateResponse(normalizedResponse, BookRecommendationsSchema);
      console.log('\nValidated Response:', JSON.stringify(validatedResponse, null, 2));

      return validatedResponse;
    } catch (error) {
      console.error('Book recommendation error:', error);
      handleApiError(error, 'Book Recommendations');
    }
  }
}