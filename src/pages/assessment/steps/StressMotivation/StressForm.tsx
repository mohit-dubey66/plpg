import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Checkbox } from '../../../../components/ui/form/Checkbox';
import { Input } from '../../../../components/ui/form/Input';

interface StressFormProps {
  form: UseFormReturn<any>;
}

export const StressForm: React.FC<StressFormProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const isStressed = watch('isStressed');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Stress Management</h2>
      
      <FormField>
        <Checkbox
          {...register('isStressed')}
          label="Do you feel stressed or anxious about the exam?"
        />
      </FormField>

      {isStressed && (
        <FormField
          label="How do you usually manage stress? (comma separated)"
          error={errors.stressManagement?.message as string}
        >
          <Input
            {...register('stressManagement')}
            placeholder="E.g., meditation, exercise, hobbies"
            error={!!errors.stressManagement}
          />
        </FormField>
      )}
    </div>
  );
};