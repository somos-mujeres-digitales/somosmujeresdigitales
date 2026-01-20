import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from './ui/button';

interface SessionCardProps {
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  onJoin?: () => void;
  onReschedule?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  mentorName,
  mentorImage,
  mentorTitle,
  date,
  time,
  status,
  onJoin,
  onReschedule,
  onViewDetails,
  className,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
            Próxima
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
            Completada
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
            Cancelada
          </span>
        );
    }
  };

  return (
    <div className={cn('dashboard-card', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={mentorImage}
            alt={mentorName}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-medium text-foreground">{mentorName}</h4>
            <p className="text-sm text-muted-foreground">{mentorTitle}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {status === 'upcoming' && (
          <>
            <Button size="sm" onClick={onJoin} className="flex-1">
              <Video className="h-4 w-4 mr-1.5" />
              Unirse
            </Button>
            <Button variant="outline" size="sm" onClick={onReschedule}>
              Reagendar
            </Button>
          </>
        )}
        {status === 'completed' && (
          <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1">
            Ver detalles
          </Button>
        )}
      </div>
    </div>
  );
};
