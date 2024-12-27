import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CurrentKnowledgeSchema } from '../../../../types/academicAssessment';
import { useAcademicAssessmentStore } from '../../../../store/useAcademicAssessmentStore';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Select } from '../../../../components/ui/form/Select';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

const levelOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export const CurrentKnowledge = () => {
  const { currentKnowledge, updateCurrentKnowledge, completeAssessment } = useAcademicAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(CurrentKnowledgeSchema),
    defaultValues: currentKnowledge
  });

const onNext = async () => {
  const isValid = await form.trigger();
  if (!isValid) return false;

  const data = form.getValues();
  updateCurrentKnowledge(data);
  completeAssessment();
  return true;
};


  return (
    <form className="space-y-6">
      <FormField
        label="What is your current knowledge level?"
        error={form.formState.errors.level?.message}
        required
      >
        <Select
          {...form.register('level')}
          options={levelOptions}
          error={!!form.formState.errors.level}
        />
      </FormField>

      <FormField
        label="Additional Preferences"
        error={form.formState.errors.additionalPreferences?.message}
      >
        <Input
          {...form.register('additionalPreferences')}
          placeholder="Specify any particular resources, books, or areas of focus"
          error={!!form.formState.errors.additionalPreferences}
        />
      </FormField>

      <NavigationButtons onNext={onNext} isLastStep />
    </form>
  );
};