import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Select } from '../../../../components/ui/form/Select';

const statusOptions = [
  { value: 'Student', label: 'Student' },
  { value: 'Working Professional', label: 'Working Professional' },
  { value: 'Both', label: 'Both' },
  { value: 'None', label: 'None' }
];

interface PersonalDetailsFormProps {
  form: UseFormReturn<any>;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      
      <FormField
        label="Full Name"
        error={errors.personalDetails?.name?.message as string}
        required
      >
        <Input
          {...register('personalDetails.name')}
          placeholder="Enter your full name"
          error={!!errors.personalDetails?.name}
        />
      </FormField>

      <FormField
        label="Age"
        error={errors.personalDetails?.age?.message as string}
        required
      >
        <Input
          {...register('personalDetails.age', { valueAsNumber: true })}
          type="number"
          placeholder="Enter your age"
          error={!!errors.personalDetails?.age}
        />
      </FormField>

      <FormField
        label="Current Status"
        error={errors.personalDetails?.currentStatus?.message as string}
        required
      >
        <Select
          {...register('personalDetails.currentStatus')}
          options={statusOptions}
          error={!!errors.personalDetails?.currentStatus}
        />
      </FormField>
    </div>
  );
};