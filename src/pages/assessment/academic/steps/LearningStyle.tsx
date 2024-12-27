import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LearningStyleSchema } from '../../../../types/academicAssessment';
import { useAcademicAssessmentStore } from '../../../../store/useAcademicAssessmentStore';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { MultiSelect } from '../../../../components/ui/form/MultiSelect';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

const methodOptions = [
  'Reading textbooks',
  'Watching videos',
  'Doing practice problems/exercises',
  'Group study/discussion',
  'Projects or practical tasks',
  'Other'
];

export const LearningStyle = () => {
  const { learningStyle, updateLearningStyle } = useAcademicAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(LearningStyleSchema),
    defaultValues: learningStyle
  });

const onNext = async () => {
  const isValid = await form.trigger();
  if (!isValid) return false;

  const data = form.getValues();
  updateLearningStyle(data);
  useAcademicAssessmentStore.getState().nextStep();
  return true;
};


  const watchMethods = form.watch('preferredMethods') || [];

  return (
    <form className="space-y-6">
      <FormField
        label="How do you prefer to learn?"
        error={form.formState.errors.preferredMethods?.message}
        required
      >
        <MultiSelect
          options={methodOptions}
          selected={watchMethods}
          onChange={(selected) => form.setValue('preferredMethods', selected)}
          error={!!form.formState.errors.preferredMethods}
        />
      </FormField>

      {watchMethods.includes('Other') && (
        <FormField
          label="Specify your other learning method"
          error={form.formState.errors.customMethod?.message}
          required
        >
          <Input
            {...form.register('customMethod')}
            placeholder="Describe your learning method"
            error={!!form.formState.errors.customMethod}
          />
        </FormField>
      )}

      <NavigationButtons onNext={onNext} />
    </form>
  );
};