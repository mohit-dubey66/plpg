import { TOTAL_ACADEMIC_STEPS } from '../constants';

export const calculateProgress = (currentStep: number, totalSteps: number): number => {
  return Math.round((currentStep / totalSteps) * 100);
};