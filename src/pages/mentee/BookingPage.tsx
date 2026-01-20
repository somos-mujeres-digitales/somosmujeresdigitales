import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mentoras } from '@/data/mockData';
import { ArrowLeft, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const mentor = mentoras.find((m) => m.id === id) || mentoras[0];
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dates = ['22 Enero', '23 Enero', '24 Enero', '25 Enero'];
  const times = ['09:00', '10:00', '14:00', '15:00', '16:00'];

  const handlePayment = () => {
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen pt-16 px-4">
          <div className="bg-card rounded-2xl border p-8 max-w-md w-full text-center animate-scale-in">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-2">¡Sesión confirmada!</h1>
            <p className="text-muted-foreground mb-6">
              Tu sesión con {mentor.name} está programada para el {selectedDate} a las {selectedTime}.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => navigate('/mentee/dashboard')}>Ir a mi dashboard</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/matching')}>Buscar más mentoras</Button>
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
          <Button variant="ghost" onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> {step === 1 ? 'Volver' : 'Cambiar horario'}
          </Button>
          
          <div className="bg-card rounded-2xl border p-6 mb-6">
            <div className="flex items-center gap-4">
              <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h2 className="font-semibold">{mentor.name}</h2>
                <p className="text-sm text-primary">{mentor.title}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border p-8">
            {step === 1 && (
              <>
                <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Selecciona fecha y hora
                </h1>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Fecha</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg border text-sm transition-all ${selectedDate === date ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Hora</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-sm transition-all ${selectedTime === time ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full" disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)}>
                  Continuar al pago
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" /> Confirmar y pagar
                </h1>
                <div className="p-4 bg-muted rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Sesión 1:1 (60 min)</span>
                    <span className="font-medium">USD $29</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {selectedDate} a las {selectedTime}
                  </div>
                </div>
                <div className="p-4 border rounded-lg mb-6">
                  <p className="text-sm text-center text-muted-foreground">
                    Simulación de checkout (demo)
                  </p>
                </div>
                <Button className="w-full" onClick={handlePayment}>
                  Pagar USD $29
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
