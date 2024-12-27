import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimeCommitmentSchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Input } from '../../../../../components/ui/form/Input';
import { MultiSelect } from '../../../../../components/ui/form/MultiSelect';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

const daysOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const TimeCommitment = () => {
  const { timeCommitment, updateTimeCommitment, nextStep } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(TimeCommitmentSchema),
    defaultValues: timeCommitment
  });

  const onNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateTimeCommitment(data);
    nextStep();
    return true;
  };

  return (
    <form className="space-y-6">
      <FormField
        label="How many hours can you dedicate daily?"
        error={form.formState.errors.dailyTime?.message}
        required
      >
        <Input
          {...form.register('dailyTime', { valueAsNumber: true })}
          type="number"
          step="0.5"
          min="0.5"
          placeholder="Enter hours per day"
          error={!!form.formState.errors.dailyTime}
        />
      </FormField>

      <FormField
        label="Which days are you available?"
        error={form.formState.errors.availableDays?.message}
        required
      >
        <MultiSelect
          options={daysOptions}
          selected={form.watch('availableDays') || []}
          onChange={(selected) => form.setValue('availableDays', selected)}
          error={!!form.formState.errors.availableDays}
        />
      </FormField>

      <FormField
        label="What is your timeline for achieving your goal?"
        error={form.formState.errors.timeline?.message}
        required
      >
        <Input
          {...form.register('timeline')}
          placeholder="E.g., 6 months, By December 2024"
          error={!!form.formState.errors.timeline}
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};