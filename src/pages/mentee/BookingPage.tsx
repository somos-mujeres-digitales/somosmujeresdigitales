import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { ArrowLeft, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const mentor = mentoras.find((m) => m.id === id) || mentoras[0];
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dates = ['22 Enero', '23 Enero', '24 Enero', '25 Enero'];
  const times = ['09:00', '10:00', '14:00', '15:00', '16:00'];

  const sanitizeNumber = (value: string) => value.replace(/\D/g, '');

  const detectCardType = (number: string) => {
    const digits = sanitizeNumber(number);
    if (/^4/.test(digits)) return 'visa';
    if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    return 'unknown';
  };

  const luhnCheck = (number: string) => {
    const digits = sanitizeNumber(number);
    if (digits.length < 12) return false;
    let sum = 0;
    let doubleIt = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (doubleIt) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      doubleIt = !doubleIt;
    }
    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string, type: string) => {
    const digits = sanitizeNumber(value);
    if (type === 'amex') {
      return digits
        .replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join(' '))
        .trim();
    }
    return digits
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const cardType = detectCardType(cardNumber);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const plainNumber = sanitizeNumber(cardNumber);

    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre es obligatorio.';
    }

    if (!plainNumber) {
      newErrors.cardNumber = 'Ingresa el número de tarjeta.';
    } else {
      const expectedLength = cardType === 'amex' ? 15 : 16;
      if (plainNumber.length !== expectedLength) {
        newErrors.cardNumber = `La tarjeta debe tener ${expectedLength} dígitos.`;
      } else if (!luhnCheck(plainNumber)) {
        newErrors.cardNumber = 'Número de tarjeta inválido.';
      }
    }

    if (!expiry) {
      newErrors.expiry = 'Ingresa la fecha de expiración.';
    } else {
      const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
      if (!match) {
        newErrors.expiry = 'Usa el formato MM/YY.';
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt(`20${match[2]}`, 10);
        const now = new Date();
        const expDate = new Date(year, month - 1, 1);
        expDate.setMonth(expDate.getMonth() + 1);
        if (expDate <= now) {
          newErrors.expiry = 'La tarjeta está expirada.';
        }
      }
    }

    const expectedCvv = cardType === 'amex' ? 4 : 3;
    if (!cvv) {
      newErrors.cvv = 'Ingresa el CVV.';
    } else if (!/^\d+$/.test(cvv)) {
      newErrors.cvv = 'Solo dígitos en el CVV.';
    } else if (cvv.length !== expectedCvv) {
      newErrors.cvv = `El CVV debe tener ${expectedCvv} dígitos.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    const ok = validateFields();
    if (!ok) return;
    setIsProcessing(true);

    // Simulación MVP determinista: si valida, siempre confirma
    setTimeout(() => {
      // Guardar sesión confirmada en localStorage para dashboards
      try {
        if (typeof window !== 'undefined' && selectedDate && selectedTime) {
          const key = 'smd_sessions';
          const raw = window.localStorage.getItem(key);
          const existing = raw ? JSON.parse(raw) : [];
          let id: string;
          if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
            id = (crypto as { randomUUID?: () => string }).randomUUID?.() ?? `${Date.now()}`;
          } else {
            id = `${Date.now()}`;
          }

          const newSession = {
            id,
            mentorId: mentor.id,
            mentorName: mentor.name,
            mentorImage: mentor.imageUrl,
            mentorTitle: mentor.title,
            menteeId: user?.id || 'mentee',
            menteeName: user?.name || 'Mentee',
            date: selectedDate,
            time: selectedTime,
            status: 'upcoming' as const,
          };

          const updated = Array.isArray(existing) ? [...existing, newSession] : [newSession];
          window.localStorage.setItem(key, JSON.stringify(updated));
        }
      } catch (error) {
        console.error('No se pudo guardar la sesión en localStorage', error);
      }

      setIsProcessing(false);
      setStep(3);
    }, 1800);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-6 animate-pulse">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <CreditCard className="h-8 w-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-primary">Procesando pago...</h2>
            <p className="text-muted-foreground italic">Estamos conectando con tu entidad bancaria</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen pt-16 px-4">
          <div className="bg-card rounded-2xl border p-8 max-w-md w-full text-center animate-scale-in shadow-2xl">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-2">¡Sesión confirmada!</h1>
            <p className="text-muted-foreground mb-8">
              Tu sesión con <span className="text-foreground font-semibold">{mentor.name}</span> está programada para el <span className="text-primary font-medium">{selectedDate}</span> a las <span className="text-primary font-medium">{selectedTime}</span>.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-primary hover:opacity-90" onClick={() => navigate('/mentee/dashboard')}>Ir a mi dashboard</Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/matching')}>Buscar más mentoras</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="mb-6 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" /> {step === 1 ? 'Volver' : 'Atrás'}
          </Button>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
            <div className="flex items-center gap-4">
              <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
              <div>
                <h2 className="font-bold text-lg">{mentor.name}</h2>
                <p className="text-sm text-primary font-medium uppercase tracking-wider">{mentor.title}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Selecciona fecha y hora
                </h1>
                <div className="mb-8">
                  <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">Fecha sugerida</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-sm font-medium',
                          selectedDate === date 
                            ? 'border-primary bg-primary/10 text-primary shadow-inner scale-[1.02]' 
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        )}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">Horario disponible</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all text-sm font-medium',
                          selectedTime === time 
                            ? 'border-primary bg-primary/10 text-primary shadow-inner scale-[1.02]' 
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        )}
                      >
                        <Clock className="h-3 w-3 inline mr-1 opacity-50" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary h-12 text-base font-bold" disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)}>
                  Continuar al pago
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" /> Pasarela de Pago
                </h1>
                
                <div className="p-6 bg-muted/40 rounded-xl mb-8 space-y-4 border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium italic">Sesión de mentoría 1:1</span>
                    <span className="font-bold text-xl">$29.00 USD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 p-3 rounded-lg border border-primary/20">
                    <Calendar className="h-4 w-4" /> {selectedDate} — <Clock className="h-4 w-4 ml-2" /> {selectedTime}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre en la tarjeta</label>
                    <input 
                      type="text" 
                      placeholder="JUANA DE ARCO" 
                      className="w-full p-4 rounded-xl border bg-background input-focus"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                    {errors.cardName && <p className="text-xs text-destructive">{errors.cardName}</p>}
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Número de tarjeta</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        className="w-full p-4 rounded-xl border bg-background input-focus pl-12"
                        value={formatCardNumber(cardNumber, cardType)}
                        onChange={(e) => {
                          const digits = sanitizeNumber(e.target.value);
                          const maxLen = cardType === 'amex' ? 15 : 16;
                          const next = digits.slice(0, maxLen);
                          const nextType = detectCardType(next);
                          setCardNumber(formatCardNumber(next, nextType));
                        }}
                        inputMode="numeric"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Detectada: {cardType === 'unknown' ? '—' : cardType.toUpperCase()}</span>
                      <span>{cardType === 'amex' ? '15 dígitos' : '16 dígitos'}</span>
                    </div>
                    {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expiración</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="w-full p-4 rounded-xl border bg-background input-focus"
                        value={expiry}
                        onChange={(e) => {
                          const digits = sanitizeNumber(e.target.value).slice(0, 4);
                          const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                          setExpiry(formatted);
                        }}
                        inputMode="numeric"
                      />
                      {errors.expiry && <p className="text-xs text-destructive">{errors.expiry}</p>}
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CVV</label>
                      <input 
                        type="password" 
                        placeholder="***" 
                        className="w-full p-4 rounded-xl border bg-background input-focus font-mono"
                        value={cvv}
                        onChange={(e) => {
                          const maxLen = cardType === 'amex' ? 4 : 3;
                          const digits = sanitizeNumber(e.target.value).slice(0, maxLen);
                          setCvv(digits);
                        }}
                        inputMode="numeric"
                      />
                      <p className="text-[11px] text-muted-foreground">CVV {cardType === 'amex' ? '4 dígitos (frontal)' : '3 dígitos (reverso)'}</p>
                      {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>

                <div className="my-8 flex items-center justify-center gap-6 opacity-30">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                </div>

                <Button 
                  className="w-full bg-gradient-primary h-14 text-lg font-bold shadow-lg" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  Confirmar Pago $29.00
                </Button>
                
                <p className="text-[10px] text-muted-foreground mt-4 text-center uppercase tracking-widest font-bold">
                  Conexión segura SSL de 256 bits
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
