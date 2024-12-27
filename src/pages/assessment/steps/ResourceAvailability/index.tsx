import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resourceAvailabilitySchema } from './schema';
import { useAssessmentStore } from '../../../../store/useAssessmentStore';
import { AssessmentLayout } from '../../../../components/assessment/AssessmentLayout';
import { ResourcesForm } from './ResourcesForm';
import { NavigationButtons } from '../../../../components/assessment/NavigationButtons';

export const ResourceAvailability = () => {
  const { resourceAvailability, updateResourceAvailability } = useAssessmentStore();
  
  const form = useForm({
    resolver: zodResolver(resourceAvailabilitySchema),
    defaultValues: resourceAvailability
  });

  const onNext = () => {
    const isValid = form.trigger();
    if (!isValid) return false;

    const data = form.getValues();
    updateResourceAvailability(data);
    return true;
  };

  return (
    <AssessmentLayout
      title="Resource Availability"
      description="Let's understand what resources you currently have and what you might need."
    >
      <form className="space-y-8">
        <ResourcesForm form={form} />
        <NavigationButtons onNext={onNext} />
      </form>
    </AssessmentLayout>
  );
};