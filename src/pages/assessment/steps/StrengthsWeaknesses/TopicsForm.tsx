import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';

interface TopicsFormProps {
  form: UseFormReturn<any>;
}

export const TopicsForm: React.FC<TopicsFormProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Topic Analysis</h2>
      
      <FormField
        label="Which topics do you find most difficult? Why?"
        error={errors.difficultTopics?.message as string}
        required
      >
        <Input
          {...register('difficultTopics')}
          placeholder="Describe the topics you struggle with and why"
          error={!!errors.difficultTopics}
        />
      </FormField>

      <FormField
        label="Which topics are you most confident in? Why?"
        error={errors.confidentTopics?.message as string}
        required
      >
        <Input
          {...register('confidentTopics')}
          placeholder="Describe the topics you're confident in and why"
          error={!!errors.confidentTopics}
        />
      </FormField>
    </div>
  );
};