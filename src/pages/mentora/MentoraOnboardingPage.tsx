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
  GraduationCap,
  Heart,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const roles = ['Profesional', 'Investigadora', 'Founder / Ejecutiva'] as const;
const experienceYears = ['3–5', '6–9', '10 a más'] as const;
const countries = ['Perú', 'Colombia', 'México', 'Brasil'] as const;

const stemAreas = [
  { id: 'S', name: 'Ciencia', icon: '🔬' },
  { id: 'T', name: 'Tecnología', icon: '💻' },
  { id: 'E', name: 'Ingeniería', icon: '⚙️' },
  { id: 'M', name: 'Matemáticas', icon: '🔢' },
] as const;

const subThemes = {
  S: ['Biología', 'Química', 'Ciencias ambientales', 'Neurociencia', 'Investigación científica', 'Ciencia aplicada'],
  T: ['Programación / desarrollo de software', 'Data Science / análisis de datos', 'Inteligencia artificial', 'Ciberseguridad', 'UX / producto digital', 'Tecnología para impacto social'],
  E: ['Mecatrónica', 'Automatización industrial', 'Ingeniería de sistemas', 'Electrónica', 'Robótica', 'Procesos industriales'],
  M: ['Estadística', 'Modelamiento matemático', 'Matemáticas aplicadas', 'Finanzas'],
};

const supportTypes = [
  'Plan de estudio y recursos',
  'Innovación/creación',
  'Investigación/tesis',
  'Portafolio/proyectos',
  'Entrevistas (técnicas/HR)',
  'Becas/internacional',
  'Networking/carrera',
  'Liderazgo/confianza',
] as const;

const industries = [
  'Tech/SaaS', 'Educación', 'Salud', 'Fintech', 'Energía', 'Manufactura', 'Investigación', 'Gobierno/ONG', 'Startups', 'Otro'
] as const;

const initialStages = ['Escolar', 'Preuniversitaria', 'Universitaria', 'Primeros años laborales'] as const;
const mentorLevels = ['Principiante', 'Intermedio', 'Avanzado'] as const;

const scheduleOptions = [
  { id: 'morning', label: 'Mañanas (6:00 – 12:00)' },
  { id: 'afternoon', label: 'Tardes (12:00 – 18:00)' },
  { id: 'night', label: 'Noches (18:00 – 22:00)' },
  { id: 'weekend', label: 'Fines de semana' },
];

const MentoraOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Info Básica
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<typeof roles[number] | ''>('');
  const [experience, setExperience] = useState<typeof experienceYears[number] | ''>('');
  const [linkedin, setLinkedin] = useState('');

  // Step 2: Experiencia STEM
  const [stemArea, setStemArea] = useState<typeof stemAreas[number]['id'] | ''>('');
  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Step 3: Nivel de Mentoría
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  // Step 4: Preferencias
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

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
    navigate('/mentora/dashboard');
  };

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void, max?: number) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else if (!max || list.length < max) {
      setList([...list, item]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return age && city && country && role && experience && linkedin;
      case 2:
        return stemArea && selectedSubThemes.length > 0 && selectedSupport.length > 0 && selectedIndustries.length > 0;
      case 3:
        return selectedLevels.length > 0 && selectedStages.length > 0;
      case 4:
        return selectedSchedules.length > 0;
      default:
        return false;
    }
  };

  const stepIcons = [User, Target, Heart, Sparkles];
  const stepTitles = [
    'Información básica',
    'Experiencia STEM',
    'Nivel de mentoría',
    'Disponibilidad',
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
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
                    <span className="text-xs font-medium hidden md:block text-center">{title}</span>
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
                    Información Básica (Mentora)
                  </h2>
                  <p className="text-muted-foreground">
                    Tu experiencia profesional es clave para inspirar a más mujeres.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input id="age" type="number" placeholder="Ej: 32" value={age} onChange={(e) => setAge(e.target.value)} className="input-focus" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" type="text" placeholder="Ej: Madrid" value={city} onChange={(e) => setCity(e.target.value)} className="input-focus" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>País</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {countries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCountry(c)}
                        className={cn(
                          'p-3 rounded-xl border-2 transition-all text-center text-sm font-medium',
                          country === c
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Rol principal</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-center font-medium',
                          role === r ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Años de experiencia</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {experienceYears.map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setExperience(exp)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-center font-medium',
                          experience === exp ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">Perfil LinkedIn</Label>
                  <div className="relative">
                    <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/tuperfil" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="input-focus pl-10" />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Experiencia STEM
                  </h2>
                  <p className="text-muted-foreground">
                    Detalla tus áreas de dominio y sectores donde te desempeñas.
                  </p>
                </div>

                {/* STEM Area */}
                <div className="space-y-4">
                  <Label className="text-base font-bold">Área STEM principal (Elige una principal)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stemAreas.map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => {
                          setStemArea(area.id);
                          setSelectedSubThemes([]);
                        }}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                          stemArea === area.id ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <span className="text-2xl">{area.icon}</span>
                        <span className="text-xs font-bold uppercase">{area.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-Themes */}
                {stemArea && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-base font-bold">Sub-áreas que dominas (Elige hasta 5)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subThemes[stemArea as keyof typeof subThemes].map((theme) => (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => toggleSelection(theme, selectedSubThemes, setSelectedSubThemes, 5)}
                          className={cn(
                            'p-3 rounded-lg border text-left text-sm transition-all flex items-center justify-between',
                            selectedSubThemes.includes(theme) ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted border-border'
                          )}
                        >
                          {theme}
                          {selectedSubThemes.includes(theme) && <CheckCircle className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Problems to solve */}
                <div className="space-y-4">
                  <Label className="text-base font-bold">Tipo de problemas que ayudas a resolver (Elige hasta 5)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {supportTypes.map((support) => (
                      <button
                        key={support}
                        type="button"
                        onClick={() => toggleSelection(support, selectedSupport, setSelectedSupport, 5)}
                        className={cn(
                          'p-3 rounded-lg border text-left text-sm transition-all flex items-center justify-between',
                          selectedSupport.includes(support) ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted border-border'
                        )}
                      >
                        {support}
                        {selectedSupport.includes(support) && <CheckCircle className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div className="space-y-4">
                  <Label className="text-base font-bold">Industrias/sectores con experiencia (Elige hasta 3)</Label>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => toggleSelection(ind, selectedIndustries, setSelectedIndustries, 3)}
                        className={cn(
                          'px-4 py-2 rounded-full border text-sm transition-all',
                          selectedIndustries.includes(ind) ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted border-border'
                        )}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Nivel de Mentoría</h2>
                  <p className="text-muted-foreground">Define con quiénes te gustaría compartir tu conocimiento.</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-bold">Niveles que te gustaría mentorear (Puedes elegir múltiples)</Label>
                  <div className="space-y-3">
                    {mentorLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleSelection(lvl, selectedLevels, setSelectedLevels)}
                        className={cn(
                          'w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between',
                          selectedLevels.includes(lvl) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <span className="font-bold">{lvl}</span>
                        {selectedLevels.includes(lvl) && <CheckCircle className="h-5 w-5 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-bold">Etapas que aceptas (Puedes elegir múltiples)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {initialStages.map((stg) => (
                      <button
                        key={stg}
                        type="button"
                        onClick={() => toggleSelection(stg, selectedStages, setSelectedStages)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between font-medium',
                          selectedStages.includes(stg) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        {stg}
                        {selectedStages.includes(stg) && <CheckCircle className="h-5 w-5 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Disponibilidad y Preferencias</h2>
                  <p className="text-muted-foreground">Queremos que tu experiencia dando mentorías sea cómoda y gratificante.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-bold">Idioma preferido</Label>
                    <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">Español</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">Todas nuestras mentorías actuales se realizan en español.</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-bold">¿En qué momentos te resulta más fácil dar una mentoría? (Elige hasta 2)</Label>
                    <div className="grid gap-3">
                      {scheduleOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleSelection(option.id, selectedSchedules, setSelectedSchedules, 2)}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between',
                            selectedSchedules.includes(option.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                          )}
                        >
                          <span className="font-medium">{option.label}</span>
                          {selectedSchedules.includes(option.id) && <CheckCircle className="h-5 w-5 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-primary rounded-xl text-primary-foreground mt-8 shadow-xl">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-8 w-8 shrink-0 animate-pulse" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">¡Bienvenida a bordo!</h3>
                      <p className="text-primary-foreground/90 text-sm leading-relaxed">
                        Al completar, evaluaremos tu perfil para conectarte con las mentees que más se beneficien de tu expertiz en {stemArea}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="font-bold uppercase tracking-wider text-xs">
                <ArrowLeft className="h-4 w-4 mr-2" /> Atrás
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()} className="bg-gradient-primary hover:opacity-90 font-bold uppercase tracking-wider text-xs px-8">
                {step === totalSteps ? 'Completar Perfil' : 'Siguiente'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoraOnboardingPage;
