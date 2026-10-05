import React, { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FileText,
  Video,
  ExternalLink,
  ChevronRight,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = [
    { title: 'Todos', icon: BookOpen, count: 35 },
    { title: 'Guías de Carrera', icon: BookOpen, count: 12, type: 'Guía' },
    { title: 'Plantillas & Herramientas', icon: FileText, count: 8, type: 'Herramienta' },
    { title: 'Talleres Grabados', icon: Video, count: 15, type: 'Video' },
  ];

  const featuredResources = [
    {
      title: 'Mapa de Carreras STEM 2026',
      description: 'Una guía completa sobre las áreas con mayor demanda y cómo empezar.',
      type: 'Guía',
      date: 'Ene 2026'
    },
    {
      title: 'Plantilla de CV para Tech',
      description: 'Optimiza tu currículum para pasar los filtros de ATS en empresas tech.',
      type: 'Herramienta',
      date: 'Dic 2025'
    },
    {
      title: 'Cómo negociar tu primer salario',
      description: 'Consejos prácticos para obtener la compensación que mereces.',
      type: 'Video',
      date: 'Nov 2025'
    }
  ];

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return featuredResources.filter((resource) => {
      const matchesCategory = activeCategory === 'Todos' || resource.type === activeCategory;
      const matchesQuery =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.type.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Recursos para tu <span className="text-gradient">crecimiento</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos preparando una biblioteca de guías, herramientas y contenido para potenciar tu camino en STEM.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10 h-12 shadow-sm"
              placeholder="Buscar guías, plantillas, videos..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Buscar recursos"
            />
          </div>

          {/* Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {categories.map((cat, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveCategory(cat.title)}
                className={`dashboard-card card-hover flex items-center gap-4 text-left transition-all ${
                  activeCategory === cat.title ? 'ring-2 ring-primary/40 bg-primary/5' : ''
                }`}
                aria-pressed={activeCategory === cat.title}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} recursos</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Featured Resources */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Recursos que estamos preparando</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {filteredResources.map((res, index) => (
              <div key={index} className="dashboard-card card-hover flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                    {res.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{res.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{res.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground">{res.date}</span>
                  <Button variant="ghost" className="gap-2 text-primary" asChild>
                    <a href="https://www.somosmujeresdigitales.org" target="_blank" rel="noreferrer">
                      Conoce más
                    <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {filteredResources.length === 0 && (
            <p className="mb-16 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
              No encontramos recursos con esos criterios. Prueba otra búsqueda.
            </p>
          )}

          {/* Newsletter / CTA */}
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres contenido exclusivo?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Muy pronto compartiremos nuevos recursos y consejos de nuestras mentoras. Mientras tanto, conoce nuestro trabajo.
            </p>
            <div className="flex justify-center">
              <Button variant="secondary" asChild>
                <a href="https://www.somosmujeresdigitales.org" target="_blank" rel="noreferrer">
                  Visita el sitio oficial <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
