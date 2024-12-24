import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SkillSelectionSchema } from '../../../../../types/skillAssessment';
import { useSkillAssessmentStore } from '../../../../../store/useSkillAssessmentStore';
import { FormField } from '../../../../../components/ui/form/FormField';
import { Input } from '../../../../../components/ui/form/Input';
import { Select } from '../../../../../components/ui/form/Select';
import { NavigationButtons } from '../../../../../components/assessment/NavigationButtons';

const targetLevelOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Expert', label: 'Expert' }
];

export const SkillSelection = () => {
  const { skillSelection, updateSkillSelection } = useSkillAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(SkillSelectionSchema),
    defaultValues: skillSelection,
    mode: 'onChange' // Enable real-time validation
  });

  const onNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateSkillSelection(data);
    return true;
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="What skill do you want to learn?"
        error={form.formState.errors.skillName?.message}
        required
      >
        <Input
          {...form.register('skillName')}
          placeholder="Enter the skill name"
          error={!!form.formState.errors.skillName}
        />
      </FormField>

      <FormField
        label="Why do you want to learn this skill?"
        error={form.formState.errors.reason?.message}
        required
      >
        <Input
          {...form.register('reason')}
          placeholder="Describe your motivation (e.g., career growth, personal interest)"
          error={!!form.formState.errors.reason}
        />
      </FormField>

      <FormField
        label="What is your target level of proficiency?"
        error={form.formState.errors.targetLevel?.message}
        required
      >
        <Select
          {...form.register('targetLevel')}
          options={targetLevelOptions}
          error={!!form.formState.errors.targetLevel}
        />
      </FormField>

      <FormField
        label="What specific goal do you want to achieve?"
        error={form.formState.errors.specificGoal?.message}
        required
      >
        <Input
          {...form.register('specificGoal')}
          placeholder="Be specific (e.g., Build a mobile app, Write a novel)"
          error={!!form.formState.errors.specificGoal}
        />
      </FormField>

      <NavigationButtons onNext={onNext} />
    </form>
  );
};