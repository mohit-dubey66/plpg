import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LearningPreferencesSchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Select } from '../../../../../components/ui/form/Select';
import { MultiSelect } from '../../../../../components/ui/form/MultiSelect';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

const learningStyleOptions = [
  { value: 'Watching videos', label: 'Watching videos' },
  { value: 'Reading books', label: 'Reading books' },
  { value: 'Hands-on practice', label: 'Hands-on practice' },
  { value: 'Group learning', label: 'Group learning' },
  { value: 'One-on-one mentorship', label: 'One-on-one mentorship' },
  { value: 'Other', label: 'Other' }
];

const structureOptions = [
  { value: 'Step-by-step structured lessons', label: 'Step-by-step structured lessons' },
  { value: 'Open-ended exploratory learning', label: 'Open-ended exploratory learning' }
];

const platformOptions = [
  'YouTube',
  'Coursera',
  'Udemy',
  'Books',
  'Mentorship',
  'Other'
];

export const LearningPreferences = () => {
  const { learningPreferences, updateLearningPreferences, nextStep } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(LearningPreferencesSchema),
    defaultValues: learningPreferences
  });

  const onNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateLearningPreferences(data);
    nextStep();
    return true;
  };

  return (
    <form className="space-y-6">
      <FormField
        label="How do you prefer to learn?"
        error={form.formState.errors.learningStyle?.message}
        required
      >
        <Select
          {...form.register('learningStyle')}
          options={learningStyleOptions}
          error={!!form.formState.errors.learningStyle}
        />
      </FormField>

      <FormField
        label="What structure do you prefer?"
        error={form.formState.errors.learningStructure?.message}
        required
      >
        <Select
          {...form.register('learningStructure')}
          options={structureOptions}
          error={!!form.formState.errors.learningStructure}
        />
      </FormField>

      <FormField
        label="Which platforms do you prefer?"
        error={form.formState.errors.preferredPlatforms?.message}
        required
      >
        <MultiSelect
          options={platformOptions}
          selected={form.watch('preferredPlatforms') || []}
          onChange={(selected) => form.setValue('preferredPlatforms', selected)}
          error={!!form.formState.errors.preferredPlatforms}
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};