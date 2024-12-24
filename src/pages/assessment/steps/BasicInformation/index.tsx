import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicInformationSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { ExamDetailsForm } from './ExamDetailsForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const BasicInformation = () => {
  const { personalDetails, examDetails, updatePersonalDetails, updateExamDetails } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      personalDetails,
      examDetails
    }
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const { personalDetails, examDetails } = form.getValues();
    updatePersonalDetails(personalDetails);
    updateExamDetails(examDetails);
    return true;
  };

  return (
    <AssessmentLayout
      title="Basic Information"
      description="Let's start with some basic information about you and your exam preparation goals."
    >
      <form className="space-y-8">
        <PersonalDetailsForm form={form} />
        <ExamDetailsForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};