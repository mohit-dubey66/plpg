import { z } from 'zod';

export const resourceAvailabilitySchema = z.object({
  currentResources: z.array(z.string()).min(1, 'Select at least one current resource'),
  isResourcesSufficient: z.boolean(),
  additionalResourcesNeeded: z.array(z.string())
});