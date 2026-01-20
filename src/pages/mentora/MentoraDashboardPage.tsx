import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, Star, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';

const MentoraDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const pendingRequests = [
    { id: '1', name: 'Sofía Martínez', objective: 'Transición a Tech', matchScore: 89 },
    { id: '2', name: 'Camila Herrera', objective: 'Decidir carrera', matchScore: 92 },
  ];

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
            <StatCard title="Sesiones este mes" value={12} icon={Calendar} trend={{ value: 20, isPositive: true }} />
            <StatCard title="Ingresos (60%)" value="$208" icon={DollarSign} subtitle="USD este mes" />
            <StatCard title="Rating promedio" value="4.9" icon={Star} />
            <StatCard title="Mentees activas" value={8} icon={Users} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Solicitudes pendientes
              </h2>
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-sm text-muted-foreground">{req.objective}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-success font-medium">{req.matchScore}% match</span>
                      <Button size="sm">Aceptar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Próximas sesiones
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Ana Rodríguez</p>
                      <p className="text-sm text-muted-foreground">Hoy, 15:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Unirse</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">María López</p>
                      <p className="text-sm text-muted-foreground">Mañana, 10:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Ver detalles</Button>
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

export default MentoraDashboardPage;
