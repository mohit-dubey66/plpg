import type { Resource } from '../types';

export const resourceOptimizationPrompt = (resource: Resource) => `
You are an expert in curating educational resources. I need you to find high-quality online resources specifically related to:

Resource Name: ${resource.name}
Type: ${resource.type}
Description: ${resource.description}

Find the best online resources that match this specific topic/resource. Ensure all links are working and from reputable sources. Categorize them by skill level.

Return ONLY a clean JSON object with this exact structure (no comments or trailing commas):
{
  "beginner": [
    {
      "title": "string",
      "type": "string (Video/Article/Course/Tutorial)",
      "link": "string (complete URL)",
      "description": "string (brief description focusing on how it relates to ${resource.name})"
    }
  ],
  "intermediate": [
    {
      "title": "string",
      "type": "string (Video/Article/Course/Tutorial)",
      "link": "string (complete URL)",
      "description": "string (brief description focusing on how it relates to ${resource.name})"
    }
  ],
  "advanced": [
    {
      "title": "string",
      "type": "string (Video/Article/Course/Tutorial)",
      "link": "string (complete URL)",
      "description": "string (brief description focusing on how it relates to ${resource.name})"
    }
  ]
}`;