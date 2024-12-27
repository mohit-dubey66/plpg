import type { Resource, ResourceType } from '../types/resource';

const normalizeResourceType = (type: string): ResourceType => {
  // Map common variations to valid types
  const typeMap: Record<string, ResourceType> = {
    'video': 'Video',
    'videos': 'Video',
    'article': 'Article',
    'articles': 'Article',
    'blog': 'Article',
    'book': 'Book',
    'books': 'Book',
    'ebook': 'Book',
    'tutorial': 'Tutorial',
    'tutorials': 'Tutorial',
    'course': 'Tutorial',
    'website': 'Article',
    'resource': 'Article'
  };

  const normalizedType = typeMap[type.toLowerCase()];
  return normalizedType || 'Article'; // Default to Article if unknown
};

export const normalizeResource = (resource: any): Resource => {
  return {
    type: normalizeResourceType(resource.type),
    title: resource.title || resource.name || 'Untitled Resource',
    description: resource.description || '',
    url: null // Always set URL to null
  };
};

export const normalizeResources = (resources: any[]): Resource[] => {
  if (!Array.isArray(resources)) return [];
  return resources.map(normalizeResource);
};