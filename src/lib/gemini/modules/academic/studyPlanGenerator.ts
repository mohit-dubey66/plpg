import { handleApiError } from '../../utils/error';
import { StudyPlanOverviewGenerator } from './studyPlan/overviewGenerator';
import { WeeklyPlanGenerator } from './studyPlan/weeklyGenerator';
import type { Book, StudyPlan } from './types';
import type { AcademicAssessmentState } from '../../../../types/academicAssessment';

export class StudyPlanGenerator {
  private overviewGenerator = new StudyPlanOverviewGenerator();
  private weeklyGenerator = new WeeklyPlanGenerator();

  async generate(assessment: AcademicAssessmentState, selectedBook: Book) {
    try {
      // First generate the overview
      const overview = await this.overviewGenerator.generate(assessment, selectedBook);
      if (!overview) throw new Error('Failed to generate study plan overview');

      // Then generate first two weeks
      const weeklyPlans = await this.weeklyGenerator.generate(
        assessment,
        selectedBook,
        [1, 2]
      );
      if (!weeklyPlans) throw new Error('Failed to generate weekly plans');

      return {
        overview,
        weeklyPlans
      };
    } catch (error) {
      console.error('Study plan generation error:', error);
      handleApiError(error, 'Study Plan Generation');
    }
  }

  async generateAdditionalWeeks(
    assessment: AcademicAssessmentState,
    selectedBook: Book,
    currentWeeks: StudyPlan['weeklyPlans']
  ) {
    try {
      const nextWeekNumber = currentWeeks.length + 1;
      const newWeeks = await this.weeklyGenerator.generate(
        assessment,
        selectedBook,
        [nextWeekNumber, nextWeekNumber + 1],
        currentWeeks
      );
      
      if (!newWeeks) throw new Error('Failed to generate additional weeks');
      return newWeeks;
    } catch (error) {
      console.error('Additional weeks generation error:', error);
      handleApiError(error, 'Additional Weeks Generation');
    }
  }
}