import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimeCommitmentSchema } from '../../../../types/academicAssessment';
import { useAcademicAssessmentStore } from '../../../../store/useAcademicAssessmentStore';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { MultiSelect } from '../../../../components/ui/form/MultiSelect';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

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
  const { timeCommitment, updateTimeCommitment } = useAcademicAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(TimeCommitmentSchema),
    defaultValues: timeCommitment
  });

const onNext = async () => {
  const isValid = await form.trigger();
  if (!isValid) return false;

  const data = form.getValues();
  updateTimeCommitment(data);
  useAcademicAssessmentStore.getState().nextStep();
  return true;
};


  return (
    <form className="space-y-6">
      <FormField
        label="Which days are you available for study?"
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
        label="When is your deadline/exam date?"
        error={form.formState.errors.deadline?.message}
        required
      >
        <Input
          {...form.register('deadline')}
          type="date"
          min={new Date().toISOString().split('T')[0]}
          error={!!form.formState.errors.deadline}
        />
      </FormField>

      <FormField
        label="Study duration (in weeks)"
        error={form.formState.errors.studyDuration?.message}
        required
      >
        <Input
          {...form.register('studyDuration', { valueAsNumber: true })}
          type="number"
          min="1"
          placeholder="Enter number of weeks"
          error={!!form.formState.errors.studyDuration}
        />
      </FormField>

      <FormField
        label="How many hours can you study daily?"
        error={form.formState.errors.dailyHours?.message}
        required
      >
        <Input
          {...form.register('dailyHours', { valueAsNumber: true })}
          type="number"
          min="1"
          max="8"
          step="0.5"
          placeholder="Enter hours per day"
          error={!!form.formState.errors.dailyHours}
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};