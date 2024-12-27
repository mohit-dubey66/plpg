import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '../../../../components/ui/form/FormField';
import { Input } from '../../../../components/ui/form/Input';
import { motion } from 'framer-motion';

interface ProficiencyRatingsProps {
  form: UseFormReturn<any>;
}

export const ProficiencyRatings: React.FC<ProficiencyRatingsProps> = ({ form }) => {
  const { control, register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'proficiencyRatings'
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subject Proficiency</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => append({ subject: '', rating: 5 })}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg
                   hover:bg-primary/20 transition-colors"
        >
          <Plus size={20} />
          <span>Add Subject</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 items-start"
          >
            <FormField
              label="Subject Name"
              error={errors.proficiencyRatings?.[index]?.subject?.message as string}
              className="flex-1"
            >
              <Input
                {...register(`proficiencyRatings.${index}.subject`)}
                placeholder="Enter subject name"
                error={!!errors.proficiencyRatings?.[index]?.subject}
              />
            </FormField>

            <FormField
              label="Rating (1-10)"
              error={errors.proficiencyRatings?.[index]?.rating?.message as string}
              className="w-32"
            >
              <Input
                {...register(`proficiencyRatings.${index}.rating`, { valueAsNumber: true })}
                type="number"
                min="1"
                max="10"
                error={!!errors.proficiencyRatings?.[index]?.rating}
              />
            </FormField>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => remove(index)}
              className="mt-8 p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={20} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};