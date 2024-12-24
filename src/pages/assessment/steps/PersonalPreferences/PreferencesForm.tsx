import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Checkbox } from '../../../../components/ui/form/Checkbox';
import { Input } from '../../../../components/ui/form/Input';

const learningMethodOptions = [
  'Reading theory from books',
  'Watching video lectures',
  'Solving problems',
  'Group discussions',
  'Other'
];

interface PreferencesFormProps {
  form: UseFormReturn<any>;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Learning Methods</h2>
        <div className="space-y-3">
          {learningMethodOptions.map((method) => (
            <FormField key={method}>
              <Checkbox
                {...register('learningMethods')}
                label={method}
                value={method}
              />
            </FormField>
          ))}
        </div>
        {errors.learningMethods && (
          <p className="mt-2 text-sm text-red-400">
            {errors.learningMethods.message as string}
          </p>
        )}
      </div>

      <FormField>
        <Checkbox
          {...register('wantsDetailedTimetable')}
          label="Do you want a detailed subject-wise timetable?"
        />
      </FormField>

      <FormField>
        <Checkbox
          {...register('wantsMotivationalTips')}
          label="Do you want the roadmap to include motivational tips and strategies?"
        />
      </FormField>

      <FormField
        label="Any specific challenges or issues you're facing?"
        error={errors.specificChallenges?.message as string}
      >
        <Input
          {...register('specificChallenges')}
          placeholder="Describe any specific challenges"
          error={!!errors.specificChallenges}
        />
      </FormField>
    </div>
  );
};