import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { SessionCard } from '@/components/SessionCard';
import { MentorCard } from '@/components/MentorCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar,
  MessageSquare,
  Target,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';

const MenteeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const upcomingSessions = [
    {
      id: '1',
      mentorName: 'María García',
      mentorImage: mentoras[0].imageUrl,
      mentorTitle: 'Ingeniera de Software Senior',
      date: '22 Enero 2026',
      time: '15:00 - 16:00',
      status: 'upcoming' as const,
    },
  ];

  const completedSessions = [
    {
      id: '2',
      mentorName: 'Lucía Mendoza',
      mentorImage: mentoras[2].imageUrl,
      mentorTitle: 'Data Scientist Lead',
      date: '15 Enero 2026',
      time: '10:00 - 11:00',
      status: 'completed' as const,
    },
  ];

  const recommendedMentors = mentoras.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="section-container">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              ¡Hola, {user?.name || 'Mentee'}! 👋
            </h1>
            <p className="text-muted-foreground">
              Tu camino en STEM continúa. Aquí tienes tu progreso y próximos pasos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Card */}
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Tu progreso
                  </h2>
                  <span className="text-sm text-muted-foreground">Claridad profesional</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Antes de mentoría</p>
                    <ProgressBar value={35} variant="warning" label="Claridad inicial" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Después de mentoría</p>
                    <ProgressBar value={78} variant="success" label="Claridad actual" />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-success/5 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    +43% de mejora en claridad profesional
                  </p>
                </div>
              </div>

              {/* Best Match */}
              <div className="dashboard-card border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Tu mejor match recomendado
                  </h2>
                </div>
                <div className="py-2">
                  <MentorCard
                    {...recommendedMentors[2]}
                    className="h-full"
                    isRecommended
                    onViewProfile={() => navigate(`/mentora/${recommendedMentors[2].id}`)}
                    onBook={() => navigate(`/booking/${recommendedMentors[2].id}`)}
                  />
                </div>
              </div>

              {/* Recommended Mentors */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Mentoras recomendadas
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/matching')}>
                    Ver todas
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendedMentors.slice(0, 2).map((mentor) => (
                    <MentorCard
                      key={mentor.id}
                      {...mentor}
                      className="h-full"
                      onViewProfile={() => navigate(`/mentora/${mentor.id}`)}
                      onBook={() => navigate(`/booking/${mentor.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Sesiones"
                  value={3}
                  subtitle="completadas"
                  icon={Calendar}
                />
                <StatCard
                  title="Mensajes"
                  value={12}
                  subtitle="sin leer"
                  icon={MessageSquare}
                />
              </div>

              {/* Upcoming Session */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Próxima sesión
                </h3>
                {upcomingSessions.length > 0 ? (
                  <SessionCard
                    {...upcomingSessions[0]}
                    onJoin={() => alert('Unirse a la sesión')}
                    onReschedule={() => alert('Reagendar')}
                  />
                ) : (
                  <div className="dashboard-card text-center py-8">
                    <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      No tienes sesiones programadas
                    </p>
                    <Button onClick={() => navigate('/matching')}>
                      Reservar mentoría
                    </Button>
                  </div>
                )}
              </div>

              {/* Session History */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Historial reciente
                </h3>
                <div className="space-y-3">
                  {completedSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      {...session}
                      onViewDetails={() => alert('Ver detalles')}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-card">
                <h3 className="text-sm font-medium text-foreground mb-4">
                  Acciones rápidas
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/matching')}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Buscar mentoras
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => alert('Mensajes')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ver mensajes
                  </Button>
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

export default MenteeDashboardPage;
