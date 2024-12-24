export class RoadmapGenerationError extends Error {
  constructor(message: string, public module: string) {
    super(`Error in ${module}: ${message}`);
    this.name = 'RoadmapGenerationError';
  }
}

export const handleApiError = (error: unknown, module: string): never => {
  if (error instanceof Error) {
    throw new RoadmapGenerationError(error.message, module);
  }
  throw new RoadmapGenerationError('An unexpected error occurred', module);
};