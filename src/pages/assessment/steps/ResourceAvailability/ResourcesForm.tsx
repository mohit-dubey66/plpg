import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Checkbox } from '../../../../components/ui/form/Checkbox';
import { MultiSelect } from '../../../../components/ui/form/MultiSelect';

const resourceOptions = [
  'Coaching classes',
  'Online courses/platforms',
  'Books and study material',
  'Previous year question papers',
  'Mock tests',
  'Mobile apps',
  'Other'
];

interface ResourcesFormProps {
  form: UseFormReturn<any>;
}

export const ResourcesForm: React.FC<ResourcesFormProps> = ({ form }) => {
  const { register, watch, setValue, formState: { errors } } = form;
  const currentResources = watch('currentResources') || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Resources</h2>
        <FormField
          error={errors.currentResources?.message as string}
        >
          <MultiSelect
            options={resourceOptions}
            selected={currentResources}
            onChange={(selected) => setValue('currentResources', selected)}
            placeholder="Select your current resources"
            error={!!errors.currentResources}
          />
        </FormField>
      </div>

      <FormField>
        <Checkbox
          {...register('isResourcesSufficient')}
          label="Do you feel your current resources are sufficient?"
        />
      </FormField>

      <FormField
        label="What additional resources do you need?"
        error={errors.additionalResourcesNeeded?.message as string}
      >
        <MultiSelect
          options={resourceOptions.filter(option => !currentResources.includes(option))}
          selected={watch('additionalResourcesNeeded') || []}
          onChange={(selected) => setValue('additionalResourcesNeeded', selected)}
          placeholder="Select additional resources needed"
          error={!!errors.additionalResourcesNeeded}
        />
      </FormField>
    </div>
  );
};