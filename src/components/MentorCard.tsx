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
        'group relative bg-card rounded-xl border border-border p-5 pt-7 pr-14 card-hover flex flex-col',
        isRecommended && 'ring-2 ring-primary/20',
        className
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 bg-gradient-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg border border-white/20 whitespace-nowrap">
          <Sparkles className="h-3 w-3" />
          Recomendación IA
        </div>
      )}

      {matchScore && (
        <div className="absolute top-4 right-4 z-10 shadow-sm border border-border/40 rounded-full bg-background overflow-hidden">
          <MatchScoreBadge score={matchScore} size="sm" showLabel={false} />
        </div>
      )}

      <div className="flex gap-4 mb-5">
        <div className="relative shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="h-20 w-20 rounded-2xl object-cover shadow-sm bg-muted border border-border/50"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate text-lg leading-tight tracking-tight">{name}</h3>
          <p className="text-sm text-primary font-bold line-clamp-1 mb-1">{title}</p>
          {company && (
            <p className="text-[11px] text-muted-foreground truncate font-semibold uppercase tracking-wide opacity-70">{company}</p>
          )}
          <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-semibold">
              <MapPin className="h-3.5 w-3.5 text-primary/50" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground/90 mb-6 italic line-clamp-2 min-h-[40px] leading-relaxed font-medium">
        {name === 'Camila' ? 'Enfocada en telecomunicaciones y redes de nueva generación en Huawei.' : 
         name === 'Ingrid' ? 'Experta en automatización industrial y mecatrónica con visión global.' : 
         name === 'Fiorella' ? 'Líder en innovación tecnológica y emprendimiento con impacto social.' :
         name === 'Rocio' ? 'Apasionada por el diseño de productos y la investigación UX con enfoque humano.' :
         'Profesional en STEM comprometida con el desarrollo de talento femenino.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
        {skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-secondary/60 text-secondary-foreground text-[10px] font-bold uppercase tracking-wide rounded-lg border border-border/50"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="pt-5 border-t border-border flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-foreground tracking-tighter">USD ${pricePerSession}</span>
          </div>
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.15em]">/ sesión</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-10 px-4 font-bold text-xs uppercase tracking-wider hover:bg-secondary/50" onClick={onViewProfile}>
            Perfil
          </Button>
          <Button size="sm" className="h-10 px-5 font-bold text-xs uppercase tracking-wider bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95" onClick={onBook}>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};
