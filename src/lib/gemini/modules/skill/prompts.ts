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
The user wants to learn ${data.skillSelection.skillName}, and their goal is to achieve ${data.skillSelection.specificGoal} 
in ${data.timeCommitment.timeline} (${months} months). They can dedicate ${data.timeCommitment.dailyTime} hours daily on 
${data.timeCommitment.availableDays.join(', ')}.

Create a structured ${months}-month learning plan that includes:
- ${months} monthly goals aligned with their desired skill level
- Weekly objectives for each month ensuring steps are actionable and specific
- Practical learning activities or tasks for each week
- Flexibility options for limited time scenarios

IMPORTANT: Generate exactly ${months} months of content, with 4 weeks per month.

Return ONLY a clean JSON object with this exact structure:
{
  "months": [{
    "month": 1,
    "weeks": [{
      "week": 1,
      "goals": ["string"],
      "tasks": ["string"],
      "practice": "string"
    }]
  }]
}

The response MUST include exactly ${months} months of content.`;
  },

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
