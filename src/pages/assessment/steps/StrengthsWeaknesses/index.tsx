import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { strengthsWeaknessesSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { ProficiencyRatings } from './ProficiencyRatings';
import { TopicsForm } from './TopicsForm';
import { MockTestsForm } from './MockTestsForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const StrengthsWeaknesses = () => {
  const { strengthsWeaknesses, updateStrengthsWeaknesses } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(strengthsWeaknessesSchema),
    defaultValues: strengthsWeaknesses
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateStrengthsWeaknesses(data);
    return true;
  };

  return (
    <AssessmentLayout
      title="Strengths & Weaknesses"
      description="Let's analyze your current proficiency levels and identify areas for improvement."
    >
      <form className="space-y-8">
        <ProficiencyRatings form={form} />
        <TopicsForm form={form} />
        <MockTestsForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};