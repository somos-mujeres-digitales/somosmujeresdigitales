import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Target,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const stages = ['escolar', 'preuniversitaria', 'universitaria', 'laboral'] as const;
const interests = ['Tecnología', 'Ciencia', 'Ingeniería', 'Matemáticas'] as const;
const objectives = [
  'Decidir carrera',
  'Cambiar a STEM',
  'Ruta de aprendizaje',
  'Preparar entrevistas',
  'Buscar becas',
  'Claridad profesional',
] as const;
const levels = ['principiante', 'intermedio', 'avanzado'] as const;

const MenteeOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [stage, setStage] = useState<typeof stages[number] | ''>('');
  const [interest, setInterest] = useState<typeof interests[number] | ''>('');
  const [objective, setObjective] = useState<typeof objectives[number] | ''>('');
  const [level, setLevel] = useState<typeof levels[number] | ''>('');
  const [preferredLanguage, setPreferredLanguage] = useState('Español');
  const [preferredSchedule, setPreferredSchedule] = useState('');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate('/mentee/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return age && city && country && stage;
      case 2:
        return interest && objective;
      case 3:
        return level;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepIcons = [User, Target, Heart, Sparkles];
  const stepTitles = [
    'Información básica',
    'Objetivos STEM',
    'Tu nivel actual',
    'Preferencias de mentora',
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {stepTitles.map((title, index) => {
                const Icon = stepIcons[index];
                return (
                  <div
                    key={index}
                    className={cn(
                      'flex flex-col items-center gap-2',
                      index + 1 <= step ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                        index + 1 < step
                          ? 'bg-primary text-primary-foreground'
                          : index + 1 === step
                          ? 'bg-primary/10 ring-2 ring-primary'
                          : 'bg-muted'
                      )}
                    >
                      {index + 1 < step ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden md:block">{title}</span>
                  </div>
                );
              })}
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-scale-in">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Cuéntanos sobre ti
                  </h2>
                  <p className="text-muted-foreground">
                    Esta información nos ayuda a encontrar mentoras ideales para ti.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      min="14"
                      max="30"
                      placeholder="Ej: 22"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="input-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Ej: Lima"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input-focus"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Ej: Perú"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="input-focus"
                  />
                </div>

                <div className="space-y-3">
                  <Label>¿En qué etapa estás?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {stages.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStage(s)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-left capitalize',
                          stage === s
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {s === 'laboral' ? 'Primeros años laborales' : s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Tus objetivos STEM
                  </h2>
                  <p className="text-muted-foreground">
                    ¿En qué área te interesa y qué quieres lograr?
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Área de interés STEM</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setInterest(i)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-center',
                          interest === i
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>¿Cuál es tu objetivo principal?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {objectives.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setObjective(o)}
                        className={cn(
                          'p-3 rounded-xl border-2 transition-all text-center text-sm',
                          objective === o
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Tu nivel actual
                  </h2>
                  <p className="text-muted-foreground">
                    Esto nos ayuda a recomendarte mentoras con el enfoque adecuado.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>¿Cuál es tu nivel en el área de interés?</Label>
                  <div className="space-y-3">
                    {levels.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLevel(l)}
                        className={cn(
                          'w-full p-4 rounded-xl border-2 transition-all text-left',
                          level === l
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <p className="font-medium capitalize">{l}</p>
                        <p className="text-sm text-muted-foreground">
                          {l === 'principiante' && 'Estoy empezando o explorando'}
                          {l === 'intermedio' && 'Tengo conocimientos básicos'}
                          {l === 'avanzado' && 'Tengo experiencia práctica'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Preferencias de mentora
                  </h2>
                  <p className="text-muted-foreground">
                    Opcional: personaliza aún más tu matching.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma preferido</Label>
                    <Input
                      id="language"
                      type="text"
                      placeholder="Ej: Español"
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="input-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Horario preferido</Label>
                    <Input
                      id="schedule"
                      type="text"
                      placeholder="Ej: Tardes, fines de semana"
                      value={preferredSchedule}
                      onChange={(e) => setPreferredSchedule(e.target.value)}
                      className="input-focus"
                    />
                  </div>
                </div>

                <div className="p-6 bg-gradient-primary rounded-xl text-primary-foreground">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-8 w-8 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        ¡Listo para el matching!
                      </h3>
                      <p className="text-primary-foreground/90">
                        Al completar, generaremos recomendaciones de mentoras basadas en:
                        tu etapa ({stage}), objetivo ({objective}), interés ({interest}),
                        y nivel ({level}).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {step === totalSteps ? 'Completar' : 'Siguiente'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeOnboardingPage;
