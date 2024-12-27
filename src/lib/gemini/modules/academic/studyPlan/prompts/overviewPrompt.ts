import type { AcademicAssessmentState } from '../../../../../types/academicAssessment';
import type { Book } from '../../types';

export const createOverviewPrompt = (assessment: AcademicAssessmentState, selectedBook: Book) => `
You are creating a study plan overview for learning ${assessment.subjectSelection.subjectName}.

Student Profile:
- Current Level: ${assessment.currentKnowledge.level}
- Learning Goal: ${assessment.subjectSelection.learningGoal === 'Other' 
  ? assessment.subjectSelection.customGoal 
  : assessment.subjectSelection.learningGoal}
- Study Level: ${assessment.subjectSelection.levelOfStudy}
- Learning Style: ${assessment.learningStyle.preferredMethods.join(', ')}
- Available Time: ${assessment.timeCommitment.dailyHours} hours daily
- Study Duration: ${assessment.timeCommitment.studyDuration} weeks

Selected Book:
- Title: ${selectedBook.title}
- Author: ${selectedBook.author}
- Level: ${selectedBook.level}
- Topics: ${selectedBook.topics.join(', ')}

Create a comprehensive study plan overview that includes:
1. A warm, personalized greeting
2. Clear learning objectives
3. Main topics to be covered
4. A brief overview of each week's theme and objectives

Return a JSON object with this structure:
{
  "greeting": "string (warm, personalized greeting)",
  "duration": "string (study duration)",
  "mainTopics": ["string (key topics)"],
  "learningObjectives": ["string (specific objectives)"],
  "totalWeeks": number,
  "weeklyOverviews": [{
    "week": number,
    "theme": "string (weekly theme)",
    "objectives": ["string (weekly objectives)"]
  }]
}`;