import React from 'react';
import { Clock } from 'lucide-react';
import { RoadmapCard } from './shared/RoadmapCard';
import type { TimeManagement } from '../../../../lib/gemini/modules/skill/types';

interface TimeManagementCardProps {
  timeManagement: TimeManagement;
}

export const TimeManagementCard: React.FC<TimeManagementCardProps> = ({ timeManagement }) => {
  return (
    <RoadmapCard title="Time Management" icon={Clock}>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-primary mb-2">Daily Schedule</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Weekday Schedule</h4>
              <p className="text-gray-400">{timeManagement.schedule.weekday}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Weekend Schedule</h4>
              <p className="text-gray-400">{timeManagement.schedule.weekend}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-primary mb-2">Micro-Learning Sessions</h3>
          <ul className="space-y-1">
            {timeManagement.microSessions.map((session, index) => (
              <li key={index} className="text-gray-400">• {session}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-2">Preventing Burnout</h3>
          <ul className="space-y-1">
            {timeManagement.burnoutPrevention.map((tip, index) => (
              <li key={index} className="text-gray-400">• {tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </RoadmapCard>
  );
};