import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { Checkbox } from '../../../../components/ui/form/Checkbox';

interface MotivationFormProps {
  form: UseFormReturn<any>;
}

export const MotivationForm: React.FC<MotivationFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Motivation</h2>
      
      <FormField
        label="What motivates you to prepare for this exam?"
        error={errors.motivation?.message as string}
        required
      >
        <Input
          {...register('motivation')}
          placeholder="Describe your motivation"
          error={!!errors.motivation}
        />
      </FormField>

      <FormField>
        <Checkbox
          {...register('isConfident')}
          label="Are you confident about achieving your target?"
        />
      </FormField>
    </div>
  );
};