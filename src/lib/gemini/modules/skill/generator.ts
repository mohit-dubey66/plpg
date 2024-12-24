import { model } from '../../config';
import { prompts } from './prompts';
import { cleanResponse, safeJsonParse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import {
  IntroductionSchema,
  FoundationSchema,
  LearningPlanSchema,
  StrengtheningSchema,
  AdvancedLearningSchema,
  TimeManagementSchema,
  MotivationSchema,
  FinalReviewSchema,
  type SkillRoadmap
} from './types';
import type { SkillAssessmentState } from '../../../../types/skillAssessment';

export class SkillRoadmapGenerator {
  private async generateModule<T>(
    prompt: string,
    schema: any,
    moduleName: string
  ): Promise<T> {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const cleanedResponse = cleanResponse(response);
      const parsedResponse = safeJsonParse(cleanedResponse);
      return schema.parse(parsedResponse);
    } catch (error) {
      handleApiError(error, `Skill Roadmap - ${moduleName}`);
    }
  }

  async generate(assessment: SkillAssessmentState): Promise<SkillRoadmap> {
    try {
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
        this.generateModule(
          prompts.introduction(assessment),
          IntroductionSchema,
          'Introduction'
        ),
        this.generateModule(
          prompts.foundation(assessment),
          FoundationSchema,
          'Foundation'
        ),
        this.generateModule(
          prompts.learningPlan(assessment),
          LearningPlanSchema,
          'Learning Plan'
        ),
        this.generateModule(
          prompts.strengthening(assessment),
          StrengtheningSchema,
          'Strengthening'
        ),
        this.generateModule(
          prompts.advancedLearning(assessment),
          AdvancedLearningSchema,
          'Advanced Learning'
        ),
        this.generateModule(
          prompts.timeManagement(assessment),
          TimeManagementSchema,
          'Time Management'
        ),
        this.generateModule(
          prompts.motivation(assessment),
          MotivationSchema,
          'Motivation'
        ),
        this.generateModule(
          prompts.finalReview(assessment),
          FinalReviewSchema,
          'Final Review'
        )
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
      handleApiError(error, 'Skill Roadmap Generation');
    }
  }
}