import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/mujeresdigitales.jpg" 
                alt="Logo" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="font-semibold text-lg">Mujeres Digitales</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Conectando mujeres con mentoras STEM para decisiones informadas y carreras exitosas.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/somos-mujeresdigitales/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/somosmujeresdigitales/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/para-mentees" className="hover:text-primary-foreground">Para Mentees</Link></li>
              <li><Link to="/para-mentoras" className="hover:text-primary-foreground">Para Mentoras</Link></li>
              <li><Link to="/matching" className="hover:text-primary-foreground">Matching IA</Link></li>
              <li><Link to="/recursos" className="hover:text-primary-foreground">Recursos</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground">Sobre nosotras</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Impacto</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground">Términos de uso</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2026 Mujeres Digitales. Todos los derechos reservados.
          </p>
          <p className="text-sm text-primary-foreground/70 flex items-center gap-1">
            Hecho con <Heart className="h-4 w-4 text-destructive fill-destructive" /> para mujeres en STEM
          </p>
        </div>
      </div>
    </footer>
  );
};
