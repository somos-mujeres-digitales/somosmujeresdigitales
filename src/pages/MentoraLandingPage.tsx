import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ArrowRight,
  Award,
  CheckCircle,
  Globe,
  Heart,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

const MentoraLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      icon: Heart,
      title: 'Impacto real',
      description: 'Ayuda a la próxima generación de mujeres en STEM a superar barreras.',
    },
    {
      icon: TrendingUp,
      title: 'Desarrollo de liderazgo',
      description: 'Fortalece tus habilidades de comunicación y liderazgo mentorizando.',
    },
    {
      icon: Globe,
      title: 'Comunidad global',
      description: 'Conéctate con otras profesionales líderes en la industria STEM.',
    },
  ];

  const requirements = [
    'Profesional en áreas STEM (Ciencia, Tecnología, Ingeniería, Matemáticas).',
    'Mínimo 3 años de experiencia en la industria.',
    'Pasión por la enseñanza y el empoderamiento femenino.',
    'Disponibilidad de al menos 2 horas al mes.',
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
              Comparte tu experiencia, inspira el futuro
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Conviértete en <span className="text-gradient">Mentora STEM</span> y genera impacto real en la próxima generación de mujeres
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de mujeres líderes y ayuda a cerrar la brecha de género en STEM compartiendo tu camino y conocimientos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                Aplicar como mentora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why be a mentor Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué ser mentora en Mujeres Digitales?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => (
              <div key={index} className="dashboard-card text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <reason.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>

          {/* Key Benefits - High Impact Design */}
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10" />
            
            <div className="bg-gradient-to-br from-card to-secondary/20 rounded-3xl border border-primary/20 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
              
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Beneficios <span className="text-gradient">clave</span> de ser mentora
                </h3>
                <div className="h-1 w-20 bg-gradient-primary mx-auto rounded-full" />
              </div>

              <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                {[
                  {
                    title: 'Matching Inteligente',
                    text: 'Mentorías 1:1 con mujeres alineadas exactamente a tu experiencia profesional.',
                    icon: Sparkles
                  },
                  {
                    title: 'Monetiza tu Experiencia',
                    text: 'Recibe USD $29 por cada sesión (retienes el 60% neto sin comisiones ocultas).',
                    icon: TrendingUp
                  },
                  {
                    title: 'Impacto Tangible',
                    text: 'Guía decisiones cruciales de mujeres que están definiendo su futuro en STEM.',
                    icon: Target
                  },
                  {
                    title: 'Posicionamiento Senior',
                    text: 'Perfil validado y reconocimiento como referente de alto nivel en nuestra red.',
                    icon: Award
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                      <benefit.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Requisitos para ser mentora
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Buscamos profesionales comprometidas que quieran marcar una diferencia real.
              </p>

              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">Beneficios MD</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">1</span>
                  </div>
                  <p className="text-muted-foreground">Remuneración justa por tu tiempo (USD $29 por sesión).</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  <p className="text-muted-foreground">Acceso a red exclusiva de networking con otras mentoras.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">3</span>
                  </div>
                  <p className="text-muted-foreground">Plataforma automatizada para gestionar tus sesiones y pagos.</p>
                </li>
              </ul>
              <Button className="w-full mt-8" onClick={() => navigate('/register')}>Aplicar ahora</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentoraLandingPage;
