import type { AcademicAssessmentState } from '../../../../../types/academicAssessment';
import type { Book, WeeklyPlan } from '../../types';

export const createWeeklyPrompt = (
  assessment: AcademicAssessmentState,
  selectedBook: Book,
  weekNumbers: number[],
  previousWeeks: WeeklyPlan[] = []
) => `
You are creating detailed weekly plans for weeks ${weekNumbers.join(', ')} of learning ${assessment.subjectSelection.subjectName}.

Context:
- Book: ${selectedBook.title} by ${selectedBook.author}
- Current Level: ${assessment.currentKnowledge.level}
- Learning Style: ${assessment.learningStyle.preferredMethods.join(', ')}
- Daily Time: ${assessment.timeCommitment.dailyHours} hours

Previous Progress:
${previousWeeks.map(week => `
Week ${week.week}:
- Topics: ${week.topics.join(', ')}
- Goals: ${week.goals.join(', ')}
`).join('\n')}

Create detailed plans for the specified weeks that build upon previous progress.
Include specific chapters/sections from the book, practice problems, and resources.

Return a JSON array of week objects with this structure:
[{
  "week": number,
  "goals": ["string"],
  "topics": ["string"],
  "tasks": ["string"],
  "practice": {
    "exercises": ["string"],
    "project": "string",
    "timeAllocation": "string"
  },
  "resources": [{
    "type": "string (Video|Article|Book|Tutorial)",
    "title": "string",
    "description": "string"
  }],
  "assessment": "string",
  "review": "string"
}]`;