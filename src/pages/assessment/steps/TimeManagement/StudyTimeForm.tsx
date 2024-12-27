import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';

interface StudyTimeFormProps {
  form: UseFormReturn<any>;
}

export const StudyTimeForm: React.FC<StudyTimeFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Study Time</h2>
      
      <FormField
        label="How many months do you have for preparation?"
        error={errors.preparationMonths?.message as string}
        required
      >
        <Input
          {...register('preparationMonths', { valueAsNumber: true })}
          type="number"
          placeholder="Enter number of months"
          error={!!errors.preparationMonths}
        />
      </FormField>

      <FormField
        label="Hours available for study on weekdays"
        error={errors.weekdayHours?.message as string}
        required
      >
        <Input
          {...register('weekdayHours', { valueAsNumber: true })}
          type="number"
          placeholder="Enter hours per weekday"
          error={!!errors.weekdayHours}
        />
      </FormField>

      <FormField
        label="Hours available for study on weekends"
        error={errors.weekendHours?.message as string}
        required
      >
        <Input
          {...register('weekendHours', { valueAsNumber: true })}
          type="number"
          placeholder="Enter hours per weekend day"
          error={!!errors.weekendHours}
        />
      </FormField>
    </div>
  );
};