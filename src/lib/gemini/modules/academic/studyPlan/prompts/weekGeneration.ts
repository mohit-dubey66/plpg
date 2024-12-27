import type { Book } from '../../types';
import type { AcademicAssessmentState } from '../../../../../types/academicAssessment';

export const createWeekGenerationPrompt = (
  assessment: AcademicAssessmentState,
  selectedBook: Book,
  startWeek: number,
  previousWeeks: any[]
) => `
You are creating a detailed study plan for weeks ${startWeek} and ${startWeek + 1} of learning ${assessment.subjectSelection.subjectName}.

Context:
- Book: ${selectedBook.title} by ${selectedBook.author}
- Current Level: ${assessment.currentKnowledge.level}
- Learning Style: ${assessment.learningStyle.preferredMethods.join(', ')}
- Daily Time: ${assessment.timeCommitment.dailyHours} hours

Previous Weeks Progress:
${previousWeeks.map(week => `
Week ${week.week}:
- Topics: ${week.topics.join(', ')}
`).join('\n')}

Create a detailed plan for weeks ${startWeek} and ${startWeek + 1} that builds upon previous progress.
Include specific chapters/sections from the book, practice problems, and resources.

Return a JSON array of two week objects with this structure:
[
  {
    "week": number,
    "topics": ["string"],
    "tasks": ["string"],
    "practice": {
      "problems": ["string"],
      "project": "string",
      "timeAllocation": "string"
    },
    "resources": ["string"],
    "assessment": "string",
    "review": "string"
  }
]`;