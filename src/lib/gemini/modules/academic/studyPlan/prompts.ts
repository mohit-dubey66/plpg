import type { AcademicAssessmentState } from '../../../../../types/academicAssessment';
import type { Book } from '../types';

export const createStudyPlanPrompt = (assessment: AcademicAssessmentState, selectedBook: Book) => `
You are a friendly and knowledgeable academic advisor creating a personalized study plan.

Student Profile:
- Subject: ${assessment.subjectSelection.subjectName}
- Current Level: ${assessment.currentKnowledge.level}
- Learning Goal: ${assessment.subjectSelection.learningGoal === 'Other' 
  ? assessment.subjectSelection.customGoal 
  : assessment.subjectSelection.learningGoal}
- Study Level: ${assessment.subjectSelection.levelOfStudy}
- Learning Style: ${assessment.learningStyle.preferredMethods.join(', ')}
- Available Time: ${assessment.timeCommitment.dailyHours} hours daily
- Study Days: ${assessment.timeCommitment.availableDays.join(', ')}
- Duration: ${assessment.timeCommitment.studyDuration} weeks

Selected Book:
- Title: ${selectedBook.title}
- Author: ${selectedBook.author}
- Level: ${selectedBook.level}
- Topics: ${selectedBook.topics.join(', ')}

Create a comprehensive study plan that:
1. Starts with a warm, personalized greeting acknowledging their specific situation
2. Provides a clear overview of what they'll achieve
3. Breaks down the book's content into weekly modules
4. Includes specific practice problems from the book
5. Suggests complementary learning activities based on their style

For each week, include:
- Topics to cover from the book (with specific chapter/section references)
- Daily tasks and readings
- 5 practice problems from the book
- A mini-project that applies the week's concepts
- Additional resources (NO LINKS, only descriptions)
- Review and assessment activities

Return a JSON object with this structure:
{
  "overview": {
    "greeting": "string (warm, personalized greeting)",
    "duration": "string (study duration)",
    "mainTopics": ["string (key topics)"],
    "learningObjectives": ["string (specific objectives)"]
  },
  "weeklyPlans": [{
    "week": number,
    "topics": ["string (specific chapters/sections)"],
    "tasks": ["string (daily activities)"],
    "practice": {
      "problems": ["string (5 specific problems)"],
      "project": "string (mini-project description)",
      "timeAllocation": "string (suggested time breakdown)"
    },
    "resources": [{
      "type": "string (Video|Article|Book|Tutorial)",
      "title": "string",
      "description": "string"
    }],
    "assessment": "string (review strategy)",
    "review": "string (self-assessment tips)"
  }]
}

IMPORTANT:
- Make all responses natural and easy to understand
- Reference specific parts of the chosen book
- Adapt to their learning style
- NO URLs or external links
- Keep language professional but friendly`;