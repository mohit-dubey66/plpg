import { model } from '../../config';
import { prompts } from './prompts';
import { cleanResponse, safeJsonParse, validateResponse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import { TimeManagementGenerator } from './timeManagement';
import type { SkillRoadmap } from './types';
import type { SkillAssessmentState } from '../../../../types/skillAssessment';

export class SkillRoadmapGenerator {
  private timeManagementGenerator = new TimeManagementGenerator();

  async generate(assessment: SkillAssessmentState): Promise<SkillRoadmap> {
    try {
      // Generate each section of the roadmap
      const [
        introduction,
        foundation,
        learningPlan,
        strengthening,
        advancedLearning,
        timeManagement,
        motivation,
        finalReview
      ] = await Promise.all([
        this.generateSection('introduction', assessment),
        this.generateSection('foundation', assessment),
        this.generateSection('learningPlan', assessment),
        this.generateSection('strengthening', assessment),
        this.generateSection('advancedLearning', assessment),
        this.timeManagementGenerator.generate(assessment),
        this.generateSection('motivation', assessment),
        this.generateSection('finalReview', assessment)
      ]);

      return {
        introduction,
        foundation,
        learningPlan,
        strengthening,
        advancedLearning,
        timeManagement,
        motivation,
        finalReview
      };
    } catch (error) {
      console.error('Error generating roadmap:', error);
      handleApiError(error, 'Roadmap Generation');
    }
  }

  private async generateSection(section: keyof typeof prompts, assessment: SkillAssessmentState) {
    try {
      const prompt = prompts[section](assessment);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const cleanedResponse = cleanResponse(response);
      return safeJsonParse(cleanedResponse);
    } catch (error) {
      console.error(`Error generating ${section}:`, error);
      throw error;
    }
  }
}