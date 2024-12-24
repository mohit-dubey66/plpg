import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MotivationSchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Input } from '../../../../../components/ui/form/Input';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

export const Motivation = () => {
  const { motivation, updateMotivation, completeAssessment } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(MotivationSchema),
    defaultValues: motivation
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateMotivation(data);
    completeAssessment();
    return true;
  };

  return (
    <form className="space-y-6">
      <FormField
        label="What motivates you to learn this skill?"
        error={form.formState.errors.motivation?.message}
        required
      >
        <Input
          {...form.register('motivation')}
          placeholder="Describe your motivation (career growth, personal satisfaction, etc.)"
          error={!!form.formState.errors.motivation}
        />
      </FormField>

      <FormField
        label="What challenges do you anticipate?"
        error={form.formState.errors.anticipatedChallenges?.message}
        required
      >
        <Input
          {...form.register('anticipatedChallenges')}
          placeholder="List potential challenges (time management, consistency, etc.)"
          error={!!form.formState.errors.anticipatedChallenges}
        />
      </FormField>

      <FormField
        label="How do you usually overcome learning challenges?"
        error={form.formState.errors.challengeStrategy?.message}
        required
      >
        <Input
          {...form.register('challengeStrategy')}
          placeholder="Describe your strategies for overcoming challenges"
          error={!!form.formState.errors.challengeStrategy}
        />
      </FormField>

      <NavigationButtons onNext={onNext} isLastStep />
    </form>
  );
};