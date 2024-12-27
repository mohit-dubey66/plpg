import { z } from 'zod';

export const SubjectSelectionSchema = z.object({
  subjectName: z.string().min(2, 'Subject name must be at least 2 characters'),
  levelOfStudy: z.enum(['High School', 'Undergraduate', 'Graduate', 'Self-Learning']),
  learningGoal: z.enum(['Pass an exam', 'Deep understanding', 'Practical application', 'Other']),
  customGoal: z.string().optional()
});

export const TimeCommitmentSchema = z.object({
  availableDays: z.array(z.string()).min(1, 'Select at least one day'),
  deadline: z.string().min(1, 'Please specify a deadline'),
  studyDuration: z.number().min(1, 'Duration must be at least 1 week'),
  dailyHours: z.number().min(1).max(8)
});

export const LearningStyleSchema = z.object({
  preferredMethods: z.array(z.string()).min(1, 'Select at least one learning method'),
  customMethod: z.string().optional()
});

export const CurrentKnowledgeSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  additionalPreferences: z.string()
});

export interface AcademicAssessmentState {
  currentStep: number;
  isCompleted: boolean;
  subjectSelection: z.infer<typeof SubjectSelectionSchema>;
  timeCommitment: z.infer<typeof TimeCommitmentSchema>;
  learningStyle: z.infer<typeof LearningStyleSchema>;
  currentKnowledge: z.infer<typeof CurrentKnowledgeSchema>;
}