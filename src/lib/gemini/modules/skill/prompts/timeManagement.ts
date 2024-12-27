// Separate prompt for time management
export const createTimeManagementPrompt = (data: any) => `
You are creating a time management plan for someone learning ${data.skillSelection.skillName}.

Context:
- Daily Time: ${data.timeCommitment.dailyTime} hours
- Available Days: ${data.timeCommitment.availableDays.join(', ')}
- Timeline: ${data.timeCommitment.timeline}

Create a time management module that includes:
1. Optimized daily schedule for weekdays and weekends
2. Micro-learning session suggestions for busy days
3. Strategies for preventing burnout

Return a clean JSON object with this structure:
{
  "schedule": {
    "weekday": "string (detailed weekday schedule)",
    "weekend": "string (detailed weekend schedule)"
  },
  "microSessions": [
    "string (micro-learning suggestions)"
  ],
  "burnoutPrevention": [
    "string (burnout prevention strategies)"
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text or formatting.
`;