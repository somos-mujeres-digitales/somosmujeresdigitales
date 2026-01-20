import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { mentoras, testimonials, platformStats } from '@/data/mockData';
import { ArrowRight, Sparkles, Users, Calendar, Target, CheckCircle, Quote, ChevronDown, Brain, Lightbulb, Rocket, Globe, Award, TrendingUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const steps = [{
    icon: Users,
    title: 'Crea tu perfil',
    description: 'Cuéntanos tu etapa, intereses y objetivos en menos de 5 minutos.'
  }, {
    icon: Brain,
    title: 'Matching inteligente',
    description: 'Nuestro algoritmo encuentra mentoras que se alinean con tu camino.'
  }, {
    icon: Calendar,
    title: 'Reserva tu sesión',
    description: 'Elige horario, paga USD $29, y recibe orientación personalizada.'
  }];
  const problems = [{
    icon: Target,
    title: 'Falta de referentes',
    description: 'Solo el 35% de profesionales STEM son mujeres. ¿Dónde están las mentoras?'
  }, {
    icon: Lightbulb,
    title: 'Decisiones sin guía',
    description: 'Elegir carrera, cambiar de área o crecer profesionalmente sin apoyo experto.'
  }, {
    icon: Rocket,
    title: 'Brecha de género',
    description: 'Las mujeres abandonan STEM 45% más que los hombres por falta de comunidad.'
  }];
  const faqs = [{
    question: '¿Qué es Mujeres Digitales?',
    answer: 'Somos un marketplace de mentoría 1:1 que conecta mujeres de 14-30 años con mentoras profesionales en STEM. No vendemos cursos ni contenido: facilitamos decisiones informadas a través de mentoría personalizada.'
  }, {
    question: '¿Cómo funciona el matching inteligente?',
    answer: 'Nuestro algoritmo analiza tu etapa de vida, objetivos, área de interés STEM, disponibilidad y preferencias para recomendarte mentoras con experiencia relevante. Cada match incluye un porcentaje de compatibilidad explicable.'
  }, {
    question: '¿Cuánto cuesta una sesión?',
    answer: 'Cada sesión de mentoría tiene un precio fijo de USD $29. De este monto, el 60% va directo a la mentora y el 40% a la plataforma para cubrir matching, gestión y aseguramiento de calidad.'
  }, {
    question: '¿Cómo puedo ser mentora?',
    answer: 'Si eres profesional en STEM con al menos 3 años de experiencia, puedes aplicar. Validamos tu perfil, verificamos tu experiencia, y te integramos al marketplace. Tú defines tu disponibilidad y áreas de mentoría.'
  }, {
    question: '¿Qué pasa después de la sesión?',
    answer: 'Después de cada sesión recibes un plan de acción personalizado. Puedes continuar con la misma mentora o explorar nuevas recomendaciones. Hacemos seguimiento de tu progreso y claridad.'
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Matching inteligente + Mentoría 1:1
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Encuentra a la mentora STEM correcta para{' '}
              <span className="text-gradient">tomar tu mejor decisión</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              Conectamos mujeres de 14-30 años con profesionales STEM verificadas. 
              Decisiones de carrera informadas, no más incertidumbre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                Encuentra tu mentora
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/para-mentoras')}>
                Quiero ser mentora
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up animation-delay-300">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.mentorsActive}+</p>
                <p className="text-sm text-muted-foreground">Mentoras activas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{(platformStats.sessionsCompleted / 1000).toFixed(1)}k+</p>
                <p className="text-sm text-muted-foreground">Sesiones completadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.countriesReached}</p>
                <p className="text-sm text-muted-foreground">Países</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{platformStats.satisfactionRate}%</p>
                <p className="text-sm text-muted-foreground">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              El problema que resolvemos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Las mujeres enfrentan barreras únicas para entrar y crecer en STEM.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => <div key={index} className="dashboard-card text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nuestra solución:{' '}
                <span className="text-gradient">Mentoría con matching inteligente</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Combinamos tecnología de matching con mentoría humana experta. 
                No más búsquedas al azar: conectamos perfiles con precisión.
              </p>

              <div className="space-y-4">
                {['Algoritmo que analiza etapa, objetivos e intereses', 'Mentoras verificadas con experiencia real en STEM', 'Sesiones 1:1 enfocadas en tus decisiones específicas', 'Seguimiento y planes de acción personalizados'].map((item, index) => <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>)}
              </div>

              <div className="mt-8 p-4 bg-card rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Modelo de precios transparente</p>
                <p className="text-lg font-semibold text-foreground">
                  USD $29 por sesión → 60% mentora / 40% plataforma
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mentoras.slice(0, 4).map((mentora, index) => <div key={mentora.id} className={`dashboard-card card-hover ${index === 0 ? 'col-span-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <img src={mentora.imageUrl} alt={mentora.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{mentora.name}</p>
                      <p className="text-sm text-primary truncate">{mentora.title}</p>
                      <p className="text-xs text-muted-foreground">{mentora.country}</p>
                    </div>
                    {mentora.matchScore && <div className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        {mentora.matchScore}%
                      </div>}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En 3 simples pasos, conecta con tu mentora ideal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => <div key={index} className="relative">
                <div className="dashboard-card text-center card-hover h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 mt-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />}
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/register')}>
              Comenzar ahora
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conoce a nuestras mentoras
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales verificadas de empresas líderes en tecnología, ciencia e ingeniería.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentoras.slice(0, 3).map(mentora => <MentorCard key={mentora.id} {...mentora} isRecommended={mentora.matchScore && mentora.matchScore >= 90} onViewProfile={() => navigate(`/mentora/${mentora.id}`)} onBook={() => navigate(`/booking/${mentora.id}`)} />)}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={() => navigate('/matching')}>
              Ver todas las mentoras
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro impacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformando carreras y vidas, una mentoría a la vez.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="dashboard-card text-center card-hover">
              <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">3</p>
              <p className="text-sm text-muted-foreground">Países alcanzados</p>
            </div>
            <div className="dashboard-card text-center card-hover">
              <Award className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">20</p>
              <p className="text-sm text-muted-foreground">Mentoras certificadas</p>
            </div>
            <div className="dashboard-card text-center card-hover">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">78%</p>
              <p className="text-sm text-muted-foreground">Aumento en claridad</p>
            </div>
            <div className="dashboard-card text-center card-hover">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">12.4k</p>
              <p className="text-sm text-muted-foreground">Sesiones realizadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Historias de éxito
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escucha a mujeres que transformaron su camino con mentoría.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => <div key={testimonial.id} className="dashboard-card card-hover">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.age} años, {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Todo lo que necesitas saber sobre Mujeres Digitales.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            ¿Lista para tomar tu mejor decisión?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Únete a miles de mujeres que ya encontraron su camino en STEM con ayuda de mentoras expertas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              Comenzar gratis
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate('/para-mentoras')}>
              Aplicar como mentora
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default LandingPage;