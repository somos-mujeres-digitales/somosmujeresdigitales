import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, Star, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';

type DashboardSession = {
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

const MentoraDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [upcomingSessions, setUpcomingSessions] = useState<DashboardSession[]>([]);
  const [completedSessions, setCompletedSessions] = useState<DashboardSession[]>([]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem('smd_sessions');
      if (!raw) return;
      const parsed = JSON.parse(raw) as DashboardSession[];
      if (!Array.isArray(parsed)) return;
      const upcoming = parsed.filter((s) => s.status === 'upcoming');
      const completed = parsed.filter((s) => s.status === 'completed');
      setUpcomingSessions(upcoming);
      setCompletedSessions(completed);
    } catch (error) {
      console.error('No se pudieron cargar las sesiones desde localStorage', error);
    }
  }, []);

  const sessionsThisMonth = upcomingSessions.length + completedSessions.length;
  const payoutUsd = (completedSessions.length * 29 * 0.6).toFixed(0);
  const activeMentees = new Set(
    [...upcomingSessions, ...completedSessions].map((s) => s.menteeId || s.menteeName || 'mentee')
  ).size;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              ¡Hola, {user?.name || 'Mentora'}! 👋
            </h1>
            <p className="text-muted-foreground">Tu impacto sigue creciendo. Aquí tienes tu resumen.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Sesiones este mes" value={sessionsThisMonth} icon={Calendar} />
            <StatCard title="Ingresos (60%)" value={`$${payoutUsd}`} icon={DollarSign} subtitle="USD este mes" />
            <StatCard title="Rating promedio" value="4.9" icon={Star} />
            <StatCard title="Mentees activas" value={activeMentees} icon={Users} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Reservas confirmadas
              </h2>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{s.menteeName || 'Mentee'}</p>
                        <p className="text-sm text-muted-foreground">
                          {s.date}, {s.time}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/session/${s.id}`)}>
                        Ver / Unirse
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-muted rounded-lg text-center text-sm text-muted-foreground">
                  Aún no tienes reservas confirmadas. Cuando una mentee pague una sesión, aparecerá aquí.
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Próximas sesiones
              </h2>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Sesión con {session.menteeName || 'mentee'}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.date}, {session.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/session/${session.id}`)}>
                        Unirse
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-muted rounded-lg text-center text-sm text-muted-foreground">
                  Aún no tienes sesiones confirmadas. Cuando una mentee reserve y pague, aparecerán aquí.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 dashboard-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" /> Historial reciente
            </h2>
            {completedSessions.length > 0 ? (
              <div className="space-y-3">
                {completedSessions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Sesión con {s.menteeName || 'mentee'}</p>
                        <p className="text-sm text-muted-foreground">
                          {s.date}, {s.time}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/session/${s.id}`)}>
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-muted rounded-lg text-center text-sm text-muted-foreground">
                Aún no has completado sesiones.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentoraDashboardPage;
