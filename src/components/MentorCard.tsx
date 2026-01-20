import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Star, Sparkles } from 'lucide-react';
import { MatchScoreBadge } from './MatchScoreBadge';
import { Button } from './ui/button';

interface MentorCardProps {
  id: string;
  name: string;
  title: string;
  company?: string;
  location: string;
  imageUrl: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  matchScore?: number;
  pricePerSession: number;
  isRecommended?: boolean;
  onViewProfile?: () => void;
  onBook?: () => void;
  className?: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  name,
  title,
  company,
  location,
  imageUrl,
  skills,
  rating,
  reviewCount,
  matchScore,
  pricePerSession,
  isRecommended = false,
  onViewProfile,
  onBook,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative bg-card rounded-xl border border-border p-5 card-hover',
        isRecommended && 'ring-2 ring-primary/20',
        className
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-4 flex items-center gap-1 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-medium rounded-full">
          <Sparkles className="h-3 w-3" />
          Recomendación IA
        </div>
      )}

      <div className="flex gap-4">
        <div className="relative shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="h-20 w-20 rounded-xl object-cover"
          />
          {matchScore && (
            <div className="absolute -bottom-2 -right-2">
              <MatchScoreBadge score={matchScore} size="sm" showLabel={false} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-primary font-medium">{title}</p>
          {company && (
            <p className="text-sm text-muted-foreground">{company}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-muted-foreground/60">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-md"
          >
            {skill}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{skills.length - 3}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-foreground">
            USD ${pricePerSession}
          </span>
          <span className="text-sm text-muted-foreground"> /sesión</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            Ver perfil
          </Button>
          <Button size="sm" onClick={onBook}>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};
