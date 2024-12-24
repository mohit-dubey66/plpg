import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SkillRoadmap } from '../lib/gemini/modules/skill/types';

interface SkillRoadmapState {
  isGenerating: boolean;
  currentModule: string;
  roadmap: SkillRoadmap | null;
  error: string | null;
  showAssessment: boolean;

  // Actions
  setGenerating: (isGenerating: boolean) => void;
  setCurrentModule: (module: string) => void;
  setRoadmap: (roadmap: SkillRoadmap) => void;
  setError: (error: string | null) => void;
  setShowAssessment: (show: boolean) => void;
  toggleAssessment: () => void;
  reset: () => void;
}

const initialState = {
  isGenerating: false,
  currentModule: '',
  roadmap: null,
  error: null,
  showAssessment: true,
};

export const useSkillRoadmapStore = create<SkillRoadmapState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setGenerating: (isGenerating) => set({ isGenerating }),
        setCurrentModule: (module) => set({ currentModule: module }),
        setRoadmap: (roadmap) => set({ roadmap }),
        setError: (error) => set({ error }),
        setShowAssessment: (show) => set({ showAssessment: show }),
        toggleAssessment: () => set((state) => ({ showAssessment: !state.showAssessment })),
        reset: () => set(initialState),
      }),
      {
        name: 'skill-roadmap-store',
        partialize: (state) => ({
          roadmap: state.roadmap,
          showAssessment: state.showAssessment
        })
      }
    )
  )
);