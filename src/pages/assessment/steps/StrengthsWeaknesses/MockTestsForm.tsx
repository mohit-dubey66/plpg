import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Checkbox } from '../../../../components/ui/form/Checkbox';

interface MockTestsFormProps {
  form: UseFormReturn<any>;
}

export const MockTestsForm: React.FC<MockTestsFormProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const hasTakenMocks = watch('hasTakenMocks');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mock Tests</h2>
      
      <FormField className="mb-6">
        <Checkbox
          {...register('hasTakenMocks')}
          label="Have you attempted any mock tests or past papers?"
        />
      </FormField>

      {hasTakenMocks && (
        <>
          <FormField
            label="How many mock tests have you attempted?"
            error={errors.mockTests?.count?.message as string}
          >
            <Input
              {...register('mockTests.count', { valueAsNumber: true })}
              type="number"
              placeholder="Enter number of mock tests"
              error={!!errors.mockTests?.count}
            />
          </FormField>

          <FormField
            label="What is your average score/rank in mock tests?"
            error={errors.mockTests?.averageScore?.message as string}
          >
            <Input
              {...register('mockTests.averageScore')}
              placeholder="Enter your average score"
              error={!!errors.mockTests?.averageScore}
            />
          </FormField>

          <FormField
            label="Areas where you performed poorly (comma separated)"
            error={errors.mockTests?.weakAreas?.message as string}
          >
            <Input
              {...register('mockTests.weakAreas')}
              placeholder="List areas needing improvement"
              error={!!errors.mockTests?.weakAreas}
            />
          </FormField>
        </>
      )}
    </div>
  );
};