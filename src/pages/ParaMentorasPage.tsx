import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mentoras, platformStats } from '@/data/mockData';
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Heart,
  Shield,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
  Star,
} from 'lucide-react';

const ParaMentorasPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: 'Ingresos flexibles',
      description: 'Gana USD $17.40 por sesión (60% del precio). Tú defines tu disponibilidad.',
    },
    {
      icon: Heart,
      title: 'Impacto real',
      description: 'Ayuda a mujeres jóvenes a tomar decisiones que cambiarán sus vidas.',
    },
    {
      icon: Shield,
      title: 'Sin complicaciones',
      description: 'Nosotras manejamos pagos, scheduling y matching. Tú solo mentorear.',
    },
    {
      icon: Users,
      title: 'Comunidad exclusiva',
      description: 'Conecta con otras mentoras STEM de toda Latinoamérica.',
    },
  ];

  const requirements = [
    'Mínimo 3 años de experiencia profesional en STEM',
    'Compromiso con el empoderamiento femenino',
    'Disponibilidad de al menos 2 horas semanales',
    'Conexión estable a internet para videollamadas',
    'Capacidad de dar orientación práctica y empática',
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Aplica y verificamos',
      description: 'Completa tu perfil. Validamos tu experiencia y te integramos.',
    },
    {
      step: 2,
      title: 'Recibe solicitudes',
      description: 'Nuestro algoritmo te conecta con mentees que encajan con tu perfil.',
    },
    {
      step: 3,
      title: 'Mentorea y gana',
      description: 'Realiza sesiones de 60 min. Recibe el 60% de cada sesión.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6 animate-fade-in">
              <Award className="h-4 w-4" />
              Para profesionales STEM
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Comparte tu experiencia,{' '}
              <span className="text-gradient">transforma carreras</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              Únete a una comunidad de mentoras que están cerrando la brecha de género en STEM, 
              una mentoría a la vez.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                Aplicar como mentora
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/matching')}>
                Ver mentoras actuales
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up animation-delay-300">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.mentorsActive}+</p>
                <p className="text-sm text-muted-foreground">Mentoras activas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.countriesReached}</p>
                <p className="text-sm text-muted-foreground">Países</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">60%</p>
                <p className="text-sm text-muted-foreground">Para ti</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.satisfactionRate}%</p>
                <p className="text-sm text-muted-foreground">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why become a mentor */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué ser mentora?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Más que ingresos extra, es la oportunidad de ser el referente que tú hubieras querido tener.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="dashboard-card card-hover">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="dashboard-card text-center card-hover h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Gana haciendo lo que amas
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Modelo de ingresos transparente y justo. Tú te quedas con la mayor parte.
              </p>

              <div className="dashboard-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Precio por sesión</span>
                  <span className="text-2xl font-bold text-foreground">USD $29</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Tu ganancia (60%)</span>
                  <span className="text-2xl font-bold text-success">USD $17.40</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Plataforma (40%)</span>
                  <span className="text-muted-foreground">USD $11.60</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Ejemplo:</strong> Con 10 sesiones mensuales, ganarías ~USD $174. 
                  Con 20 sesiones, ~USD $348. Tú decides cuánto tiempo dedicar.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Requisitos</h3>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" size="lg" onClick={() => navigate('/register')}>
                Aplicar ahora
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current mentors */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conoce a nuestras mentoras
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales de empresas líderes que ya son parte de la comunidad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mentoras.slice(0, 3).map((mentor) => (
              <div key={mentor.id} className="dashboard-card card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                    <p className="text-sm text-primary">{mentor.title}</p>
                    <p className="text-xs text-muted-foreground">{mentor.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> {mentor.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" /> {mentor.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {mentor.sessionsCompleted} sesiones
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Te apoyamos en todo
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="dashboard-card text-center card-hover">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Gestión de agenda</h3>
              <p className="text-sm text-muted-foreground">Sistema de calendario integrado. Las mentees reservan según tu disponibilidad.</p>
            </div>
            <div className="dashboard-card text-center card-hover">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Pagos automáticos</h3>
              <p className="text-sm text-muted-foreground">Recibe tus ganancias sin complicaciones. Pagos seguros y puntuales.</p>
            </div>
            <div className="dashboard-card text-center card-hover">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Métricas de impacto</h3>
              <p className="text-sm text-muted-foreground">Dashboard con tus estadísticas: sesiones, ratings, ingresos y más.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            ¿Lista para inspirar a la próxima generación?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Únete a {platformStats.mentorsActive}+ mentoras que ya están cambiando vidas en STEM.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
            Aplicar como mentora
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaMentorasPage;
