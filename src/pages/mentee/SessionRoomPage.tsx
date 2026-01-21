import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle } from 'lucide-react';

type StoredSession = {
  id: string;
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  menteeId?: string;
  menteeName?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const SessionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let session: StoredSession | null = null;

  if (typeof window !== 'undefined' && id) {
    try {
      const raw = window.localStorage.getItem('smd_sessions');
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSession[];
        session = Array.isArray(parsed) ? parsed.find((s) => s.id === id) || null : null;
      }
    } catch (error) {
      console.error('No se pudo leer la sesión desde localStorage', error);
    }
  }

  const handleEndSession = () => {
    try {
      if (typeof window !== 'undefined' && id) {
        const raw = window.localStorage.getItem('smd_sessions');
        if (raw) {
          const parsed = JSON.parse(raw) as StoredSession[];
          if (Array.isArray(parsed)) {
            const updated = parsed.map((s) =>
              s.id === id ? { ...s, status: 'completed' as const } : s
            );
            window.localStorage.setItem('smd_sessions', JSON.stringify(updated));
          }
        }
      }
    } catch (error) {
      console.error('No se pudo actualizar el estado de la sesión', error);
    }
    navigate('/mentee/dashboard');
  };

  const displaySession = session || {
    mentorName: 'Mentora',
    mentorImage: '',
    mentorTitle: 'Sesión de mentoría 1:1',
    date: 'Hoy',
    time: 'Ahora',
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-1">
                  Sesión en vivo
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Mentoría con {displaySession.mentorName}
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {displaySession.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {displaySession.time}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs md:text-sm text-muted-foreground">
                <p className="font-medium text-success flex items-center justify-end gap-2">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Conectada
                </p>
                <p className="mt-1">Recuerda estar en un lugar tranquilo y con buena conexión.</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[3fr,2fr] gap-6 items-start">
              {/* Área de “video” */}
              <div className="bg-card rounded-2xl border border-border/60 shadow-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#22d3ee_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#6366f1_0,_transparent_55%)]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center mb-4 border border-white/10 shadow-2xl">
                      {displaySession.mentorImage ? (
                        <img
                          src={displaySession.mentorImage}
                          alt={displaySession.mentorName}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl text-white font-semibold">
                          {displaySession.mentorName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      {displaySession.mentorName}
                    </h2>
                    <p className="text-sm text-slate-200/80">
                      {displaySession.mentorTitle}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-card">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Conectada a sala segura de mentoría</span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <Button size="icon" variant="outline" className="rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-full bg-destructive hover:bg-destructive/90"
                      onClick={handleEndSession}
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Panel lateral */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl border border-border/60 p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Agenda de la sesión
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 5 min: bienvenida y contexto rápido.</li>
                    <li>• 35 min: conversación profunda sobre tu objetivo.</li>
                    <li>• 10 min: próximos pasos y recursos recomendados.</li>
                  </ul>
                </div>

                <div className="bg-card rounded-2xl border border-border/60 p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Tips para aprovecharla al máximo
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Ten a mano tus preguntas principales.</li>
                    <li>• Toma notas de frases o ideas clave.</li>
                    <li>• Al final, acuerden un siguiente pequeño paso.</li>
                  </ul>
                </div>

                <div className="bg-muted/60 rounded-2xl border border-dashed border-border/80 p-4 text-xs text-muted-foreground">
                  Esta es una sala simulada de mentoría. En una versión completa se conectaría con
                  tu herramienta de videollamadas favorita (Zoom, Meet, etc.).
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SessionRoomPage;

