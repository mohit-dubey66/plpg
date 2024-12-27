import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubjectSelectionSchema } from '../../../../types/academicAssessment';
import { useAcademicAssessmentStore } from '../../../../store/useAcademicAssessmentStore';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Select } from '../../../../components/ui/form/Select';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

const levelOptions = [
  { value: 'High School', label: 'High School' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Self-Learning', label: 'Self-Learning' }
];

const goalOptions = [
  { value: 'Pass an exam', label: 'Pass an exam' },
  { value: 'Deep understanding', label: 'Deep understanding' },
  { value: 'Practical application', label: 'Practical application' },
  { value: 'Other', label: 'Other' }
];

export const SubjectSelection = () => {
  const { subjectSelection, updateSubjectSelection } = useAcademicAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(SubjectSelectionSchema),
    defaultValues: subjectSelection
  });

  const onNext = async () => {
  const isValid = await form.trigger();
  if (!isValid) return false;

  const data = form.getValues();
  updateSubjectSelection(data);
  useAcademicAssessmentStore.getState().nextStep();
  return true;
};

  const watchLearningGoal = form.watch('learningGoal');

  return (
    <form className="space-y-6">
      <FormField
        label="What subject do you want to learn?"
        error={form.formState.errors.subjectName?.message}
        required
      >
        <Input
          {...form.register('subjectName')}
          placeholder="Enter the subject name"
          error={!!form.formState.errors.subjectName}
        />
      </FormField>

      <FormField
        label="Level of Study"
        error={form.formState.errors.levelOfStudy?.message}
        required
      >
        <Select
          {...form.register('levelOfStudy')}
          options={levelOptions}
          error={!!form.formState.errors.levelOfStudy}
        />
      </FormField>

      <FormField
        label="What is your goal for learning this subject?"
        error={form.formState.errors.learningGoal?.message}
        required
      >
        <Select
          {...form.register('learningGoal')}
          options={goalOptions}
          error={!!form.formState.errors.learningGoal}
        />
      </FormField>

      {watchLearningGoal === 'Other' && (
        <FormField
          label="Specify your goal"
          error={form.formState.errors.customGoal?.message}
          required
        >
          <Input
            {...form.register('customGoal')}
            placeholder="Describe your learning goal"
            error={!!form.formState.errors.customGoal}
          />
        </FormField>
      )}

      <NavigationButtons onNext={onNext} />
    </form>
  );
};