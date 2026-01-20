import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { mentoras } from '@/data/mockData';
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  Rocket
} from 'lucide-react';

const MenteeLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Target,
      title: 'Claridad de carrera',
      description: 'Define tu camino en STEM con la guía de quienes ya lo recorrieron.',
    },
    {
      icon: Users,
      title: 'Red de contactos',
      description: 'Conéctate con profesionales en empresas líderes de tecnología y ciencia.',
    },
    {
      icon: Rocket,
      title: 'Crecimiento acelerado',
      description: 'Evita errores comunes y acelera tu desarrollo profesional.',
    },
  ];

  const steps = [
    {
      icon: Users,
      title: 'Crea tu perfil',
      description: 'Cuéntanos tu etapa, intereses y objetivos en menos de 5 minutos.',
    },
    {
      icon: Brain,
      title: 'Matching inteligente',
      description: 'Nuestro algoritmo encuentra mentoras que se alinean con tu camino.',
    },
    {
      icon: Calendar,
      title: 'Reserva tu sesión',
      description: 'Elige horario, paga USD $29, y recibe orientación personalizada.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Impulsa tu carrera en STEM
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              El apoyo que necesitas para{' '}
              <span className="text-gradient">llegar más lejos</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              No camines sola. Encuentra a la mentora ideal que te ayudará a tomar las mejores decisiones para tu futuro profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                Encuentra tu mentora hoy
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué buscar una mentora?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="dashboard-card text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tu camino al éxito
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="dashboard-card text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Featured Mentors Section */}
       <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mentoras destacadas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentoras.slice(0, 3).map((mentora) => (
              <MentorCard
                key={mentora.id}
                {...mentora}
                isRecommended={mentora.matchScore && mentora.matchScore >= 90}
                onViewProfile={() => navigate(`/mentora/${mentora.id}`)}
                onBook={() => navigate(`/booking/${mentora.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenteeLandingPage;
