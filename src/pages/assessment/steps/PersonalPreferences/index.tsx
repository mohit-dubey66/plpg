import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { personalPreferencesSchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { PreferencesForm } from './PreferencesForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';
import { SuccessMessage } from '../../../../components/ui/SuccessMessage';

export const PersonalPreferences = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { personalPreferences, updatePersonalPreferences, completeAssessment } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(personalPreferencesSchema),
    defaultValues: personalPreferences
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updatePersonalPreferences(data);
    completeAssessment();
    setShowSuccess(true);
    return true;
  };

  const handleComplete = () => {
    navigate('/assessment/summary');
  };

  return (
    <>
      <AssessmentLayout
        title="Personal Preferences"
        description="Let's customize your learning experience based on your preferences."
      >
        <form className="space-y-8">
          <PreferencesForm form={form} />
          <NavigationButtons onNext={onNext} isLastStep />
        </form>
      </AssessmentLayout>

      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </>
  );
};