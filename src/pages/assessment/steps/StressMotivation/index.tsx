import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stressMotivationSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { StressForm } from './StressForm';
import { MotivationForm } from './MotivationForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const StressMotivation = () => {
  const { stressMotivation, updateStressMotivation } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(stressMotivationSchema),
    defaultValues: stressMotivation
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateStressMotivation(data);
    return true;
  };

  return (
    <AssessmentLayout
      title="Stress & Motivation"
      description="Let's understand how you handle stress and what motivates you."
    >
      <form className="space-y-8">
        <StressForm form={form} />
        <MotivationForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};