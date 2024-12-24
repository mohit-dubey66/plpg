import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeManagementSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { StudyTimeForm } from './StudyTimeForm';
import { PreferencesForm } from './PreferencesForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const TimeManagement = () => {
  const { timeManagement, updateTimeManagement } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(timeManagementSchema),
    defaultValues: timeManagement
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateTimeManagement(data);
    return true;
  };

  return (
    <AssessmentLayout
      title="Time Management"
      description="Let's understand your time availability and study preferences to create an optimal schedule."
    >
      <form className="space-y-8">
        <StudyTimeForm form={form} />
        <PreferencesForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};