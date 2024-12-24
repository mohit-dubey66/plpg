import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Checkbox } from '../../../../components/ui/form/Checkbox';

const challengeOptions = [
  'Difficulty in time management',
  'Lack of accuracy',
  'Difficulty in solving specific types of questions',
  'Stress or exam anxiety',
  'Other'
];

interface SkillsFormProps {
  form: UseFormReturn<any>;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-8">
      <FormField
        label="How comfortable are you with solving numerical/analytical questions? (1-10)"
        error={errors.numericalComfort?.message as string}
        required
      >
        <Input
          {...register('numericalComfort', { valueAsNumber: true })}
          type="number"
          min="1"
          max="10"
          error={!!errors.numericalComfort}
        />
      </FormField>

      <FormField
        label="How confident are you in managing time during the exam? (1-10)"
        error={errors.timeManagementConfidence?.message as string}
        required
      >
        <Input
          {...register('timeManagementConfidence', { valueAsNumber: true })}
          type="number"
          min="1"
          max="10"
          error={!!errors.timeManagementConfidence}
        />
      </FormField>

      <div>
        <h2 className="text-xl font-semibold mb-4">Challenges</h2>
        <div className="space-y-3">
          {challengeOptions.map((challenge) => (
            <FormField key={challenge}>
              <Checkbox
                {...register('challenges')}
                label={challenge}
                value={challenge}
              />
            </FormField>
          ))}
        </div>
        {errors.challenges && (
          <p className="mt-2 text-sm text-red-400">
            {errors.challenges.message as string}
          </p>
        )}
      </div>
    </div>
  );
};