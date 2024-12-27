import { SkillAssessmentState } from '../../../../types/skillAssessment';
import { parseTimelineToMonths } from '../../../utils/time';

export const prompts = {
  introduction: (data: SkillAssessmentState) => `
You are an expert learning coach specializing in creating personalized skill roadmaps for users.
The user wants to learn ${data.skillSelection.skillName}, and their goal is ${data.skillSelection.specificGoal}.
Their current skill level is ${data.currentProficiency.currentLevel}, and their motivation for learning this skill is ${data.skillSelection.reason}.

Create a warm and engaging introduction for their personalized learning roadmap that includes:
- A motivational greeting to inspire the user
- A concise summary of the skill and its benefits, tailored to their goal
- An overview of how the roadmap will help them achieve their learning objectives
- A personalized note that highlights their motivation for learning

Return ONLY a clean JSON object with this exact structure (no comments or trailing commas):
{
  "greeting": "string",
  "skillOverview": "string",
  "roadmapOverview": "string",
  "personalNote": "string"
}`,

  foundation: (data: SkillAssessmentState) => `
The user wants to learn ${data.skillSelection.skillName}, and their current skill level is ${data.currentProficiency.currentLevel}.
Their learning style preference is ${data.learningPreferences.learningStyle}.

Design a foundation module that introduces the basic concepts and initial steps required for learning this skill. Include:
- Essential topics or concepts they need to understand first
- Beginner-friendly resources tailored to their learning style
- A suggested daily routine to establish consistent practice
- A small milestone or "quick win" they can achieve within their first week

Return ONLY a clean JSON object with this exact structure:
{
  "essentials": ["string"],
  "resources": [{"name": "string", "type": "string", "description": "string"}],
  "dailyHabits": ["string"],
  "quickWin": "string"
}`,

  learningPlan: (data: SkillAssessmentState) => {
    const months = parseTimelineToMonths(data.timeCommitment.timeline);
    
    return `
You are an expert learning coach creating a learning plan for a student who wants to learn ${data.skillSelection.skillName}.
Their current level is ${data.currentProficiency.currentLevel} and they aim to reach ${data.skillSelection.targetLevel}.
They can dedicate ${data.timeCommitment.dailyTime} hours daily on ${data.timeCommitment.availableDays.join(', ')}.
Their learning style preference is ${data.learningPreferences.learningStyle}.

Create a ${months}-month learning plan with:
1. Detailed weekly breakdown for the first month
2. High-level objectives for the remaining months

For the first month, include:
- Weekly goals and tasks
- Practice exercises and projects
- Study materials and resources
- Review and assessment activities

For remaining months, provide:
- Monthly theme
- 3-4 key objectives

Return ONLY a clean JSON object with this exact structure:
{
  "firstMonth": {
    "month": 1,
    "theme": "string",
    "objectives": ["string"],
    "weeks": [{
      "week": 1,
      "goals": ["string"],
      "tasks": ["string"],
      "practice": {
        "exercises": ["string"],
        "project": "string",
        "timeAllocation": "string"
      },
      "resources": ["string"],
      "assessment": "string",
      "review": "string"
    }]
  },
  "upcomingMonths": [{
    "month": "number",
    "theme": "string",
    "objectives": ["string"]
  }]
}`;
  },

  monthDetail: (data: SkillAssessmentState, monthOverview: MonthOverview, previousMonths: MonthDetail[]) => `
You are an expert learning coach detailing month ${monthOverview.month} of a learning plan for ${data.skillSelection.skillName}.

Context:
- Current level: ${data.currentProficiency.currentLevel}
- Target level: ${data.skillSelection.targetLevel}
- Daily time: ${data.timeCommitment.dailyTime} hours
- Available days: ${data.timeCommitment.availableDays.join(', ')}
- Learning style: ${data.learningPreferences.learningStyle}

Previous months progress:
${previousMonths.map(month => `
Month ${month.month}:
- Theme: ${month.theme}
- Objectives: ${month.objectives.join(', ')}
`).join('\n')}

Current month overview:
- Theme: ${monthOverview.theme}
- Objectives: ${monthOverview.objectives.join(', ')}

Create a detailed weekly breakdown for this month that builds upon previous progress.

Return ONLY a clean JSON object with this exact structure:
{
  "month": ${monthOverview.month},
  "theme": "string",
  "objectives": ["string"],
  "weeks": [{
    "week": 1,
    "goals": ["string"],
    "tasks": ["string"],
    "practice": {
      "exercises": ["string"],
      "project": "string",
      "timeAllocation": "string"
    },
    "resources": ["string"],
    "assessment": "string",
    "review": "string"
  }]
}`,

  strengthening: (data: SkillAssessmentState) => `
The user is learning ${data.skillSelection.skillName} at a ${data.currentProficiency.currentLevel} level 
(${data.currentProficiency.proficiencyRating}/10) and aims to reach ${data.skillSelection.targetLevel}.

Create a strengthening module that includes:
- Practice exercises tailored to their current level and goals
- Clear, measurable milestones to track progress
- Methods for self-assessment and feedback
- Challenging mini-projects to apply their skills

Return ONLY a clean JSON object with this exact structure:
{
  "practices": ["string"],
  "milestones": ["string"],
  "feedbackMethods": ["string"],
  "challenges": ["string"]
}`,

  advancedLearning: (data: SkillAssessmentState) => `
The user wants to advance from ${data.currentProficiency.currentLevel} to ${data.skillSelection.targetLevel} 
in ${data.skillSelection.skillName}. Their budget is ${data.resources.budget}.

Design an advanced learning module that includes:
- Advanced topics to focus on
- High-quality resources within their budget
- Project ideas for practical application
- Community engagement opportunities

Return ONLY a clean JSON object with this exact structure:
{
  "topics": ["string"],
  "resources": [{"name": "string", "type": "string", "description": "string"}],
  "projects": ["string"],
  "communities": ["string"]
}`,

  timeManagement: (data: SkillAssessmentState) => `
The user is learning ${data.skillSelection.skillName} with ${data.timeCommitment.dailyTime} hours available daily 
on ${data.timeCommitment.availableDays.join(', ')}.

Create a time management module that includes:
- Optimized schedule balancing learning with commitments
- Micro-learning session suggestions for busy days
- Strategies for handling interruptions
- Burnout prevention techniques

Return ONLY a clean JSON object with this exact structure:
{
  "schedule": {
    "weekday": "string",
    "weekend": "string"
  },
  "microSessions": ["string"],
  "burnoutPrevention": ["string"]
}`,

  motivation: (data: SkillAssessmentState) => `
The user is learning ${data.skillSelection.skillName} and their main motivation is ${data.motivation.motivation}.
They anticipate challenges like ${data.motivation.anticipatedChallenges}.

Create a motivation module that includes:
- Uplifting messages related to their specific journey
- Progress tracking milestones
- A rewards system for celebrating progress
- Strategies for overcoming their anticipated challenges

Return ONLY a clean JSON object with this exact structure:
{
  "messages": ["string"],
  "progress": ["string"],
  "rewards": ["string"],
  "challenges": ["string"]
}`,

  finalReview: (data: SkillAssessmentState) => `
The user has been learning ${data.skillSelection.skillName} with the goal of ${data.skillSelection.specificGoal}
over ${data.timeCommitment.timeline}.

Create a final review module that includes:
- Progress summary and key accomplishments
- Real-world application opportunities
- Suggestions for continued growth
- Reflection prompts on their journey

Return ONLY a clean JSON object with this exact structure:
{
  "progress": ["string"],
  "opportunities": ["string"],
  "nextSteps": ["string"]
}`
};
