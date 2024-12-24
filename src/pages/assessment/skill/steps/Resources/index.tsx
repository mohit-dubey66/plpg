import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResourcesSchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Input } from '../../../../../components/ui/form/Input';
import { Select } from '../../../../../components/ui/form/Select';
import { Checkbox } from '../../../../../components/ui/form/Checkbox';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

const budgetOptions = [
  { value: 'No Budget (Free Resources Only)', label: 'No Budget (Free Resources Only)' },
  { value: 'Small Budget ($0-$50 per month)', label: 'Small Budget ($0-$50 per month)' },
  { value: 'Moderate Budget ($50-$200 per month)', label: 'Moderate Budget ($50-$200 per month)' },
  { value: 'High Budget ($200+ per month)', label: 'High Budget ($200+ per month)' }
];

export const Resources = () => {
  const { resources, updateResources } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(ResourcesSchema),
    defaultValues: resources
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateResources(data);
    return true;
  };

  return (
    <form className="space-y-6">
      <FormField
        label="What resources do you currently have?"
        error={form.formState.errors.currentResources?.message}
        required
      >
        <Input
          {...form.register('currentResources')}
          placeholder="List your current resources (books, courses, tools, etc.)"
          error={!!form.formState.errors.currentResources}
        />
      </FormField>

      <FormField
        label="What is your budget for learning?"
        error={form.formState.errors.budget?.message}
        required
      >
        <Select
          {...form.register('budget')}
          options={budgetOptions}
          error={!!form.formState.errors.budget}
        />
      </FormField>

      <FormField>
        <Checkbox
          {...form.register('hasInternetAccess')}
          label="Do you have consistent internet access?"
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};