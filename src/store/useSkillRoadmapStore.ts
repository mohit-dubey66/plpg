import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SkillRoadmap } from '../lib/gemini/modules/skill/types';
import type { MonthDetail, MonthOverview } from '../lib/gemini/modules/skill/types';
import type { BookRecommendationResponse } from '../lib/gemini/modules/skill/types/bookRecommendation';
import { MonthDetailGenerator } from '../lib/gemini/modules/skill/monthDetailGenerator';
import { BookRecommender } from '../lib/gemini/modules/skill/bookRecommender';
import { useSkillAssessmentStore } from './useSkillAssessmentStore';

const monthDetailGenerator = new MonthDetailGenerator();
const bookRecommender = new BookRecommender();

interface SkillRoadmapState {
  isGenerating: boolean;
  currentModule: string;
  roadmap: SkillRoadmap | null;
  error: string | null;
  showAssessment: boolean;
  monthDetails: Record<number, MonthDetail>;
  isGeneratingMonth: Record<number, boolean>;
  isGeneratingBooks: boolean;
  bookRecommendations: BookRecommendationResponse | null;

  // Actions
  setGenerating: (isGenerating: boolean) => void;
  setCurrentModule: (module: string) => void;
  setRoadmap: (roadmap: SkillRoadmap) => void;
  setError: (error: string | null) => void;
  setShowAssessment: (show: boolean) => void;
  toggleAssessment: () => void;
  generateMonthDetail: (monthOverview: MonthOverview) => Promise<void>;
  generateBookRecommendations: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  isGenerating: false,
  currentModule: '',
  roadmap: null,
  error: null,
  showAssessment: true,
  monthDetails: {},
  isGeneratingMonth: {},
  isGeneratingBooks: false,
  bookRecommendations: null,
};

export const useSkillRoadmapStore = create<SkillRoadmapState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setGenerating: (isGenerating) => set({ isGenerating }),
        setCurrentModule: (module) => set({ currentModule: module }),
        setRoadmap: (roadmap) => set({ roadmap }),
        setError: (error) => set({ error }),
        setShowAssessment: (show) => set({ showAssessment: show }),
        toggleAssessment: () => set((state) => ({ showAssessment: !state.showAssessment })),
        generateMonthDetail: async (monthOverview) => {
          const state = get();
          if (!state.roadmap?.learningPlan) return;

          set((state) => ({
            isGeneratingMonth: { ...state.isGeneratingMonth, [monthOverview.month]: true }
          }));

          try {
            const previousMonths = Object.values(state.monthDetails)
              .filter(month => month.month < monthOverview.month)
              .sort((a, b) => a.month - b.month);

            const monthDetail = await monthDetailGenerator.generate(
              useSkillAssessmentStore.getState(),
              monthOverview,
              previousMonths
            );

            set((state) => ({
              monthDetails: { ...state.monthDetails, [monthOverview.month]: monthDetail }
            }));
          } catch (error) {
            console.error('Error generating month detail:', error);
            set({ error: 'Failed to generate month detail' });
          } finally {
            set((state) => ({
              isGeneratingMonth: { ...state.isGeneratingMonth, [monthOverview.month]: false }
            }));
          }
        },

        generateBookRecommendations: async () => {
          const state = get();
          if (!state.roadmap) return;

          set({ isGeneratingBooks: true, error: null });

          try {
            const assessment = useSkillAssessmentStore.getState();
            const recommendations = await bookRecommender.recommend(
              assessment,
              state.roadmap
            );
            
            if (!recommendations) {
              throw new Error('No recommendations received');
            }
            
            set({ bookRecommendations: recommendations });
          } catch (error) {
            console.error('Error generating book recommendations:', error);
            set({ 
              error: 'Failed to generate book recommendations. Please try again.',
              bookRecommendations: null
            });
          } finally {
            set({ isGeneratingBooks: false });
          }
        },
        
        reset: () => set(initialState),
      }),
      {
        name: 'skill-roadmap-store',
        partialize: (state) => ({
          roadmap: state.roadmap,
          showAssessment: state.showAssessment,
          monthDetails: state.monthDetails,
          bookRecommendations: state.bookRecommendations
        })
      }
    )
  )
);