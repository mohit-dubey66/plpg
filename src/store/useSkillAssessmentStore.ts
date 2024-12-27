import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SkillAssessmentState } from '../types/skillAssessment';

const initialState: SkillAssessmentState = {
  currentStep: 1,
  isCompleted: false,
  skillSelection: {
    skillName: '',
    reason: '',
    targetLevel: 'Beginner',
    specificGoal: ''
  },
  currentProficiency: {
    currentLevel: 'Absolute Beginner',
    proficiencyRating: 1,
    priorExperience: ''
  },
  learningPreferences: {
    learningStyle: 'Watching videos',
    learningStructure: 'Step-by-step structured lessons',
    preferredPlatforms: []
  },
  resources: {
    currentResources: '',
    budget: 'No Budget (Free Resources Only)',
    hasInternetAccess: true
  },
  timeCommitment: {
    dailyTime: 1,
    availableDays: [],
    timeline: ''
  },
  motivation: {
    motivation: '',
    anticipatedChallenges: '',
    challengeStrategy: ''
  }
};

interface SkillAssessmentStore extends SkillAssessmentState {
  updateSkillSelection: (data: Partial<SkillAssessmentState['skillSelection']>) => void;
  updateCurrentProficiency: (data: Partial<SkillAssessmentState['currentProficiency']>) => void;
  updateLearningPreferences: (data: Partial<SkillAssessmentState['learningPreferences']>) => void;
  updateResources: (data: Partial<SkillAssessmentState['resources']>) => void;
  updateTimeCommitment: (data: Partial<SkillAssessmentState['timeCommitment']>) => void;
  updateMotivation: (data: Partial<SkillAssessmentState['motivation']>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

export const useSkillAssessmentStore = create<SkillAssessmentStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        updateSkillSelection: (data) =>
          set((state) => ({
            skillSelection: { ...state.skillSelection, ...data }
          })),
          
        updateCurrentProficiency: (data) =>
          set((state) => ({
            currentProficiency: { ...state.currentProficiency, ...data }
          })),
          
        updateLearningPreferences: (data) =>
          set((state) => ({
            learningPreferences: { ...state.learningPreferences, ...data }
          })),
          
        updateResources: (data) =>
          set((state) => ({
            resources: { ...state.resources, ...data }
          })),
          
        updateTimeCommitment: (data) =>
          set((state) => ({
            timeCommitment: { ...state.timeCommitment, ...data }
          })),
          
        updateMotivation: (data) =>
          set((state) => ({
            motivation: { ...state.motivation, ...data }
          })),

        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 6)
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
        name: 'skill-assessment-store'
      }
    )
  )
);