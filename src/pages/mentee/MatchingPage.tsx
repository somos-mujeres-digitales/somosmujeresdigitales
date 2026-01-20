import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mentoras } from '@/data/mockData';
import {
  Search,
  Filter,
  Brain,
  Sparkles,
  ChevronDown,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const MatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const filteredMentoras = mentoras.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesArea = !areaFilter || mentor.specialties.some((s) => s.toLowerCase().includes(areaFilter.toLowerCase()));
    const matchesCountry = !countryFilter || mentor.country === countryFilter;
    const matchesLanguage = !languageFilter || mentor.languages.includes(languageFilter);

    return matchesSearch && matchesArea && matchesCountry && matchesLanguage;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setAreaFilter('');
    setCountryFilter('');
    setLanguageFilter('');
  };

  const hasActiveFilters = searchQuery || areaFilter || countryFilter || languageFilter;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Encuentra tu mentora ideal
            </h1>
            <p className="text-muted-foreground">
              Nuestro algoritmo de matching conecta tu perfil con mentoras expertas en STEM.
            </p>
          </div>

          {/* Algorithm Explanation */}
          <div className="dashboard-card mb-8 bg-gradient-hero">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  Matching inteligente
                  <Sparkles className="h-4 w-4 text-primary" />
                </h2>
                <p className="text-sm text-muted-foreground">
                  Analizamos tu <strong>etapa de vida</strong> + <strong>objetivo profesional</strong> + 
                  <strong> interés STEM</strong> + <strong>disponibilidad</strong> + 
                  <strong> experiencia de mentora</strong> para recomendarte las mejores opciones.
                  El porcentaje de match indica qué tan alineada está la mentora con tu perfil.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre, especialidad o habilidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-focus"
              />
            </div>

            <div className="flex gap-2">
              {/* Desktop Filters */}
              <div className="hidden md:flex gap-2">
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Área STEM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Backend">Software</SelectItem>
                    <SelectItem value="ML">Data Science</SelectItem>
                    <SelectItem value="Security">Ciberseguridad</SelectItem>
                    <SelectItem value="Aeroespacial">Ingeniería</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="País" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Perú">Perú</SelectItem>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                    <SelectItem value="Reino Unido">Reino Unido</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Español">Español</SelectItem>
                    <SelectItem value="Inglés">Inglés</SelectItem>
                    <SelectItem value="Portugués">Portugués</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label>Área STEM</Label>
                      <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Backend">Software</SelectItem>
                          <SelectItem value="ML">Data Science</SelectItem>
                          <SelectItem value="Security">Ciberseguridad</SelectItem>
                          <SelectItem value="Aeroespacial">Ingeniería</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>País</Label>
                      <Select value={countryFilter} onValueChange={setCountryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="México">México</SelectItem>
                          <SelectItem value="Perú">Perú</SelectItem>
                          <SelectItem value="Colombia">Colombia</SelectItem>
                          <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select value={languageFilter} onValueChange={setLanguageFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Español">Español</SelectItem>
                          <SelectItem value="Inglés">Inglés</SelectItem>
                          <SelectItem value="Portugués">Portugués</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {hasActiveFilters && (
                      <Button variant="outline" onClick={clearFilters} className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Limpiar filtros
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="hidden md:flex"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-4">
            {filteredMentoras.length} mentora{filteredMentoras.length !== 1 ? 's' : ''} encontrada{filteredMentoras.length !== 1 ? 's' : ''}
          </p>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {filteredMentoras.map((mentor) => (
              <MentorCard
                key={mentor.id}
                {...mentor}
                className="h-full"
                isRecommended={mentor.matchScore && mentor.matchScore >= 90}
                onViewProfile={() => navigate(`/mentora/${mentor.id}`)}
                onBook={() => navigate(`/booking/${mentor.id}`)}
              />
            ))}
          </div>

          {filteredMentoras.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No encontramos mentoras con esos filtros.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchingPage;
