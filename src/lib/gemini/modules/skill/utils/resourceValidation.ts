import { validateAndFixUrl } from '../../utils/url';

export interface ResourceValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateResource = (resource: any): ResourceValidationResult => {
  const errors: string[] = [];

  if (!resource.title?.trim()) {
    errors.push('Title is required');
  }

  if (!resource.type?.trim()) {
    errors.push('Type is required');
  }

  if (!resource.link?.trim()) {
    errors.push('Link is required');
  } else {
    try {
      validateAndFixUrl(resource.link);
    } catch {
      errors.push('Invalid URL format');
    }
  }

  if (!resource.description?.trim()) {
    errors.push('Description is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};