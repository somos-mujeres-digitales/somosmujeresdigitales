import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MatchScoreBadge } from '@/components/MatchScoreBadge';
import { mentoras } from '@/data/mockData';
import { MapPin, Star, Clock, Globe, Award, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';

const MentoraProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const mentor = mentoras.find((m) => m.id === id) || mentoras[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="section-container">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-6">
                  <img src={mentor.imageUrl} alt={mentor.name} className="w-32 h-32 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">{mentor.name}</h1>
                        <p className="text-primary font-medium">{mentor.title}</p>
                        <p className="text-muted-foreground">{mentor.company}</p>
                      </div>
                      {mentor.matchScore && <MatchScoreBadge score={mentor.matchScore} size="lg" />}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {mentor.location}, {mentor.country}</span>
                      <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {mentor.rating} ({mentor.reviewCount} reseñas)</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {mentor.yearsExperience} años exp.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card">
                <h2 className="text-lg font-semibold mb-4">Sobre mí</h2>
                <p className="text-muted-foreground">{mentor.bio}</p>
              </div>
              
              <div className="dashboard-card">
                <h2 className="text-lg font-semibold mb-4">Especialidades</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="dashboard-card">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-foreground">USD ${mentor.pricePerSession}</p>
                  <p className="text-muted-foreground">por sesión</p>
                </div>
                <Button className="w-full" size="lg" onClick={() => navigate(`/booking/${mentor.id}`)}>
                  <Calendar className="h-4 w-4 mr-2" /> Reservar sesión
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">60% mentora / 40% plataforma</p>
              </div>
              
              <div className="dashboard-card">
                <h3 className="font-semibold mb-3">Disponibilidad</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.availability.map((day) => (
                    <span key={day} className="px-3 py-1 bg-muted rounded-md text-sm">{day}</span>
                  ))}
                </div>
              </div>
              
              <div className="dashboard-card">
                <h3 className="font-semibold mb-3">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((lang) => (
                    <span key={lang} className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" /> {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              {mentor.isVerified && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-success text-sm">
                  <Award className="h-4 w-4" /> Verificada por Mujeres Digitales
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentoraProfilePage;
