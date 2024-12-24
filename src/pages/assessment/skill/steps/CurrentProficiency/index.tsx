import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CurrentProficiencySchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Input } from '../../../../../components/ui/form/Input';
import { Select } from '../../../../../components/ui/form/Select';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

const levelOptions = [
  { value: 'Absolute Beginner', label: 'Absolute Beginner' },
  { value: 'Beginner with some experience', label: 'Beginner with some experience' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export const CurrentProficiency = () => {
  const { currentProficiency, updateCurrentProficiency } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(CurrentProficiencySchema),
    defaultValues: currentProficiency
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateCurrentProficiency(data);
    return true;
  };

  return (
    <form className="space-y-6">
      <FormField
        label="What is your current level?"
        error={form.formState.errors.currentLevel?.message}
        required
      >
        <Select
          {...form.register('currentLevel')}
          options={levelOptions}
          error={!!form.formState.errors.currentLevel}
        />
      </FormField>

      <FormField
        label="Rate your current proficiency (1-10)"
        error={form.formState.errors.proficiencyRating?.message}
        required
      >
        <Input
          {...form.register('proficiencyRating', { valueAsNumber: true })}
          type="number"
          min="1"
          max="10"
          error={!!form.formState.errors.proficiencyRating}
        />
      </FormField>

      <FormField
        label="Describe your prior experience"
        error={form.formState.errors.priorExperience?.message}
      >
        <Input
          {...form.register('priorExperience')}
          placeholder="Describe any relevant experience or projects"
          error={!!form.formState.errors.priorExperience}
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};