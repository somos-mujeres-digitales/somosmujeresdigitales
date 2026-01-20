import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MentorCard } from '@/components/MentorCard';
import { mentoras, testimonials } from '@/data/mockData';
import {
  ArrowRight,
  CheckCircle,
  Target,
  Lightbulb,
  Compass,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Calendar,
  Brain,
  Sparkles,
  Quote,
} from 'lucide-react';

const ParaMenteesPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Target,
      title: 'Claridad en tu camino',
      description: 'Deja de adivinar. Obtén orientación experta para tomar decisiones informadas sobre tu futuro en STEM.',
    },
    {
      icon: Brain,
      title: 'Matching inteligente',
      description: 'Nuestro algoritmo te conecta con mentoras que entienden tu situación específica y objetivos.',
    },
    {
      icon: Users,
      title: 'Red de apoyo',
      description: 'Únete a una comunidad de mujeres que, como tú, están construyendo su camino en tecnología y ciencia.',
    },
    {
      icon: Lightbulb,
      title: 'Consejos prácticos',
      description: 'Recibe orientación real de profesionales que ya pasaron por donde estás ahora.',
    },
  ];

  const forWho = [
    {
      icon: GraduationCap,
      title: 'Estudiantes escolares',
      description: '14-17 años explorando opciones de carrera en STEM',
      age: '14-17',
    },
    {
      icon: Compass,
      title: 'Preuniversitarias',
      description: 'Decidiendo qué estudiar o preparándose para admisión',
      age: '17-19',
    },
    {
      icon: Award,
      title: 'Universitarias',
      description: 'Buscando prácticas, especializaciones o claridad profesional',
      age: '18-25',
    },
    {
      icon: Briefcase,
      title: 'Primeros años laborales',
      description: 'Transicionando a STEM o creciendo profesionalmente',
      age: '22-30',
    },
  ];

  const objectives = [
    'Decidir qué carrera STEM estudiar',
    'Hacer transición de otra área a tecnología',
    'Preparar entrevistas técnicas',
    'Encontrar becas y oportunidades',
    'Definir ruta de aprendizaje',
    'Ganar claridad profesional',
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
              <Sparkles className="h-4 w-4" />
              Para mujeres de 14-30 años
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Tu camino en STEM,{' '}
              <span className="text-gradient">con guía experta</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              Conecta con mentoras profesionales que ya recorrieron el camino que tú quieres seguir. 
              Decisiones informadas, no más incertidumbre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                Encuentra tu mentora
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/matching')}>
                Ver mentoras disponibles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Eres tú?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mujeres Digitales es para mujeres en diferentes etapas de su camino STEM.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forWho.map((item, index) => (
              <div key={index} className="dashboard-card text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {item.age} años
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                ¿Qué quieres lograr?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nuestras mentoras te ayudan con objetivos específicos, no consejos genéricos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((obj, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8" onClick={() => navigate('/register')}>
                Comenzar ahora
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mentoras.slice(0, 4).map((mentor, index) => (
                <div key={mentor.id} className="dashboard-card card-hover">
                  <div className="flex items-center gap-3">
                    <img src={mentor.imageUrl} alt={mentor.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{mentor.name}</p>
                      <p className="text-xs text-primary truncate">{mentor.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué mentoría con nosotras?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No somos cursos ni contenido genérico. Somos conexión humana + tecnología.
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

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Precio simple y transparente
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sin suscripciones. Paga solo por las sesiones que necesitas.
            </p>

            <div className="dashboard-card inline-block">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">USD $29</p>
                <p className="text-muted-foreground mt-2">por sesión de 60 minutos</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Agenda cuando quieras</span>
                </div>
                <Button className="mt-6 w-full" size="lg" onClick={() => navigate('/register')}>
                  Registrarme gratis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Historias de mentees
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="dashboard-card card-hover">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.age} años, {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            ¿Lista para dar el primer paso?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Registrarte es gratis. Explora mentoras y reserva cuando estés lista.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
            Crear mi cuenta gratis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParaMenteesPage;
