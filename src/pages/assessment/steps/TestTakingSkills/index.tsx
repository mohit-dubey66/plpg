import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testTakingSkillsSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { SkillsForm } from './SkillsForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const TestTakingSkills = () => {
  const { testTakingSkills, updateTestTakingSkills } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(testTakingSkillsSchema),
    defaultValues: testTakingSkills
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateTestTakingSkills(data);
    return true;
  };

  return (
    <AssessmentLayout
      title="Test Taking Skills"
      description="Let's evaluate your comfort level with different aspects of test-taking."
    >
      <form className="space-y-8">
        <SkillsForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};