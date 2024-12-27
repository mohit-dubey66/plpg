import { model } from '../../config';
import { resourceOptimizationPrompt } from './prompts/resourceOptimization';
import { ResourceOptimizationResponseSchema } from './types/resourceOptimization';
import { cleanResponse, safeJsonParse } from '../../utils/response';
import { handleApiError } from '../../utils/error';
import { validateAndFixUrl } from '../../utils/validation/url';
import { validateResource } from '../../utils/validation/resource';
import type { Resource } from './types';

export class ResourceOptimizer {
  async optimize(resource: Resource) {
    try {
      const prompt = resourceOptimizationPrompt(resource);
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      // Clean and parse the response
      let parsedResponse;
      try {
        const cleanedResponse = cleanResponse(response);
        parsedResponse = safeJsonParse(cleanedResponse);
      } catch (error) {
        console.error('Response parsing error:', error);
        throw new Error('Failed to parse model response');
      }

      // Validate and process each resource
      const fixedResponse = {
        beginner: this.processAndFilterResources(parsedResponse.beginner),
        intermediate: this.processAndFilterResources(parsedResponse.intermediate),
        advanced: this.processAndFilterResources(parsedResponse.advanced)
      };

      return ResourceOptimizationResponseSchema.parse(fixedResponse);
    } catch (error) {
      handleApiError(error, 'Resource Optimization');
    }
  }

  private processAndFilterResources(resources: any[]) {
    if (!Array.isArray(resources)) {
      throw new Error('Invalid resources format');
    }
    
    return resources
      .map(resource => {
        const validation = validateResource(resource);
        if (!validation.isValid) {
          console.warn('Invalid resource:', validation.errors);
          return null;
        }

        try {
          return {
            ...resource,
            link: validateAndFixUrl(resource.link)
          };
        } catch {
          return null;
        }
      })
      .filter((resource): resource is NonNullable<typeof resource> => resource !== null);
  }
}