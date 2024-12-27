import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Book, BookRecommendations, StudyPlan, WeeklyPlan } from '../lib/gemini/modules/academic/types';
import { BookRecommender } from '../lib/gemini/modules/academic/bookRecommender';
import { StudyPlanGenerator } from '../lib/gemini/modules/academic/studyPlanGenerator';
import { useAcademicAssessmentStore } from './useAcademicAssessmentStore';

const bookRecommender = new BookRecommender();
const studyPlanGenerator = new StudyPlanGenerator();

interface AcademicRoadmapState {
  showAssessment: boolean;
  isGeneratingBooks: boolean;
  isGeneratingPlan: boolean;
  isGeneratingWeeks: boolean;
  error: string | null;
  bookRecommendations: BookRecommendations | null;
  selectedBook: Book | null;
  studyPlan: StudyPlan | null;

  // Actions
  toggleAssessment: () => void;
  generateBookRecommendations: () => Promise<void>;
  selectBook: (book: Book) => void;
  generateStudyPlan: () => Promise<void>;
  generateNextTwoWeeks: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  showAssessment: true,
  isGeneratingBooks: false,
  isGeneratingPlan: false,
  isGeneratingWeeks: false,
  error: null,
  bookRecommendations: null,
  selectedBook: null,
  studyPlan: null,
};

export const useAcademicRoadmapStore = create<AcademicRoadmapState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        toggleAssessment: () => 
          set(state => ({ showAssessment: !state.showAssessment })),

        generateBookRecommendations: async () => {
          set({ isGeneratingBooks: true, error: null });
          try {
            const assessment = useAcademicAssessmentStore.getState();
            const recommendations = await bookRecommender.recommend(assessment);
            set({ bookRecommendations: recommendations });
          } catch (error) {
            set({ error: 'Failed to generate book recommendations' });
          } finally {
            set({ isGeneratingBooks: false });
          }
        },

        selectBook: (book: Book) => 
          set({ selectedBook: book }),

        generateStudyPlan: async () => {
          const { selectedBook } = get();
          if (!selectedBook) {
            set({ error: 'Please select a book first' });
            return;
          }

          set({ isGeneratingPlan: true, error: null });
          try {
            const assessment = useAcademicAssessmentStore.getState();
            const plan = await studyPlanGenerator.generate(assessment, selectedBook);
            set({ studyPlan: plan });
          } catch (error) {
            set({ error: 'Failed to generate study plan' });
          } finally {
            set({ isGeneratingPlan: false });
          }
        },

        generateNextTwoWeeks: async () => {
          const { selectedBook, studyPlan } = get();
          if (!selectedBook || !studyPlan) {
            set({ error: 'Missing required data' });
            return;
          }

          set({ isGeneratingWeeks: true, error: null });
          try {
            const assessment = useAcademicAssessmentStore.getState();
            const newWeeks = await studyPlanGenerator.generateAdditionalWeeks(
              assessment,
              selectedBook,
              studyPlan.weeklyPlans
            );

            if (newWeeks) {
              set(state => ({
                studyPlan: {
                  ...state.studyPlan!,
                  weeklyPlans: [...state.studyPlan!.weeklyPlans, ...newWeeks]
                }
              }));
            }
          } catch (error) {
            set({ error: 'Failed to generate additional weeks' });
          } finally {
            set({ isGeneratingWeeks: false });
          }
        },

        reset: () => set(initialState)
      }),
      {
        name: 'academic-roadmap-store',
        partialize: (state) => ({
          showAssessment: state.showAssessment,
          bookRecommendations: state.bookRecommendations,
          selectedBook: state.selectedBook,
          studyPlan: state.studyPlan
        })
      }
    )
  )
);