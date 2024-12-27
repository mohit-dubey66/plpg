import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AcademicAssessmentState } from '../types/academicAssessment';

const initialState: AcademicAssessmentState = {
  currentStep: 1,
  isCompleted: false,
  subjectSelection: {
    subjectName: '',
    levelOfStudy: 'Undergraduate',
    learningGoal: 'Deep understanding',
    customGoal: ''
  },
  timeCommitment: {
    availableDays: [],
    deadline: '',
    studyDuration: 0,
    dailyHours: 2
  },
  learningStyle: {
    preferredMethods: [],
    customMethod: ''
  },
  currentKnowledge: {
    level: 'Beginner',
    additionalPreferences: ''
  }
};

interface AcademicAssessmentStore extends AcademicAssessmentState {
  updateSubjectSelection: (data: Partial<AcademicAssessmentState['subjectSelection']>) => void;
  updateTimeCommitment: (data: Partial<AcademicAssessmentState['timeCommitment']>) => void;
  updateLearningStyle: (data: Partial<AcademicAssessmentState['learningStyle']>) => void;
  updateCurrentKnowledge: (data: Partial<AcademicAssessmentState['currentKnowledge']>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

export const useAcademicAssessmentStore = create<AcademicAssessmentStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        updateSubjectSelection: (data) =>
          set((state) => ({
            subjectSelection: { ...state.subjectSelection, ...data }
          })),
          
        updateTimeCommitment: (data) =>
          set((state) => ({
            timeCommitment: { ...state.timeCommitment, ...data }
          })),
          
        updateLearningStyle: (data) =>
          set((state) => ({
            learningStyle: { ...state.learningStyle, ...data }
          })),
          
        updateCurrentKnowledge: (data) =>
          set((state) => ({
            currentKnowledge: { ...state.currentKnowledge, ...data }
          })),

        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 4)
          })),

        previousStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1)
          })),

        completeAssessment: () =>
          set({ isCompleted: true }),

        resetAssessment: () =>
          set(initialState)
      }),
      {
        name: 'academic-assessment-store'
      }
    )
  )
);