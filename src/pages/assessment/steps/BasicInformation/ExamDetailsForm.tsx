import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Checkbox } from '../../../../components/ui/form/Checkbox';

interface ExamDetailsFormProps {
  form: UseFormReturn<any>;
}

export const ExamDetailsForm: React.FC<ExamDetailsFormProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const hasAttemptedBefore = watch('examDetails.hasAttemptedBefore');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Exam Details</h2>
      
      <FormField
        label="Which exam are you preparing for?"
        error={errors.examDetails?.examName?.message as string}
        required
      >
        <Input
          {...register('examDetails.examName')}
          placeholder="E.g., GATE, CAT, NEET"
          error={!!errors.examDetails?.examName}
        />
      </FormField>

      <FormField>
        <Checkbox
          {...register('examDetails.hasAttemptedBefore')}
          label="Have you attempted this exam before?"
        />
      </FormField>

      {hasAttemptedBefore && (
        <>
          <FormField
            label="Previous Score"
            error={errors.examDetails?.previousScore?.message as string}
          >
            <Input
              {...register('examDetails.previousScore')}
              placeholder="Enter your previous score"
              error={!!errors.examDetails?.previousScore}
            />
          </FormField>

          <FormField
            label="Year(s) of Attempt"
            error={errors.examDetails?.attemptYears?.message as string}
          >
            <Input
              {...register('examDetails.attemptYears')}
              placeholder="E.g., 2022, 2023"
              error={!!errors.examDetails?.attemptYears}
            />
          </FormField>
        </>
      )}

      <FormField
        label="Target Score/Rank"
        error={errors.examDetails?.targetScore?.message as string}
        required
      >
        <Input
          {...register('examDetails.targetScore')}
          placeholder="Enter your target score or rank"
          error={!!errors.examDetails?.targetScore}
        />
      </FormField>

      <FormField
        label="Primary Goals"
        error={errors.examDetails?.goals?.message as string}
        required
      >
        <Input
          {...register('examDetails.goals')}
          placeholder="E.g., College admission, PSU job"
          error={!!errors.examDetails?.goals}
        />
      </FormField>
    </div>
  );
};