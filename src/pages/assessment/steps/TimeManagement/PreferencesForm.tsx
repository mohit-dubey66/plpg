import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { MultiSelect } from '../../../../components/ui/form/MultiSelect';

const timeOptions = [
  'Morning',
  'Afternoon',
  'Evening',
  'Night'
];

const commitmentOptions = [
  'Job',
  'College',
  'Family responsibilities',
  'Part-time work',
  'Coaching classes',
  'Other activities'
];

interface PreferencesFormProps {
  form: UseFormReturn<any>;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ form }) => {
  const { watch, setValue, formState: { errors } } = form;

  React.useEffect(() => {
    if (!watch('preferredTime')) {
      setValue('preferredTime', []);
    }
    if (!watch('otherCommitments')) {
      setValue('otherCommitments', []);
    }
  }, [setValue, watch]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
      
      <FormField
        label="When do you prefer to study?"
        error={errors.preferredTime?.message as string}
        required
      >
        <MultiSelect
          options={timeOptions}
          selected={watch('preferredTime') || []}
          onChange={(selected) => setValue('preferredTime', selected)}
          placeholder="Select preferred study times"
          error={!!errors.preferredTime}
        />
      </FormField>

      <FormField
        label="Other commitments"
        error={errors.otherCommitments?.message as string}
      >
        <MultiSelect
          options={commitmentOptions}
          selected={watch('otherCommitments') || []}
          onChange={(selected) => setValue('otherCommitments', selected)}
          placeholder="Select your other commitments"
          error={!!errors.otherCommitments}
        />
      </FormField>
    </div>
  );
};