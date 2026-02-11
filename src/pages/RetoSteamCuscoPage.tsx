import { useState, useEffect, useRef } from "react";
import { Palette, Droplets, Monitor, BarChart3, Globe, Clock, MapPin, Calendar, ChevronDown, ExternalLink, MessageCircle, Mail, Star, Award, Menu, X, Users, BookOpen, Trophy, Building2, Instagram } from "lucide-react";
import heroBg from "@/assets/reto-steam-hero-bg.jpg";
import logoMD from "@/assets/reto-steam-logo-md.png";
import logoCite from "@/assets/reto-steam-logo-cite.png";
import citeLab from "@/assets/reto-steam-cite-lab.png";

const WHATSAPP = "51986848128";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const STEAM_COLORS = {
  orange: "#F97316",
  purple: "#A855F7",
  green: "#22C55E",
  cyan: "#06B6D4",
  pink: "#EC4899",
  lavender: "#C4B5FD",
};

/* ───────── animated counter ───────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-white">{prefix}{count}{suffix}</div>;
}

/* ───────── navbar ───────── */
function SteamNavbar({ scroll }: { scroll: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-[#0f0f14]/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <img src={logoMD} alt="Mujeres Digitales" className="h-8 md:h-10 object-contain" />
          <span className="text-white font-bold text-sm md:text-base hidden sm:inline">Reto STEAM Cusco</span>
        </div>

        {/* Center - desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scroll("agenda")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Agenda</button>
          <button onClick={() => scroll("programa")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Reto STEAM 2026</button>
        </div>

        {/* Right - desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={waLink("Hola, quiero postular al Reto STEAM 2026 en Cusco. ¿Cómo puedo inscribirme?")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg font-semibold text-sm text-white transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.orange}, ${STEAM_COLORS.purple})` }}
          >
            Postular
          </a>
          <button
            onClick={() => scroll("sponsors")}
            className="px-5 py-2 rounded-lg font-semibold text-sm text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            Quiero ser Sponsor
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f0f14]/98 backdrop-blur-xl border-t border-white/10 px-4 pb-4 space-y-3 animate-fade-in">
          <button onClick={() => { scroll("agenda"); setOpen(false); }} className="block w-full text-left text-gray-300 py-2 text-sm">Agenda</button>
          <button onClick={() => { scroll("programa"); setOpen(false); }} className="block w-full text-left text-gray-300 py-2 text-sm">Reto STEAM 2026</button>
          <a
            href={waLink("Hola, quiero postular al Reto STEAM 2026 en Cusco.")}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-5 py-3 rounded-lg font-semibold text-sm text-white"
            style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.orange}, ${STEAM_COLORS.purple})` }}
          >
            Postular
          </a>
          <button
            onClick={() => { scroll("sponsors"); setOpen(false); }}
            className="block w-full text-center px-5 py-3 rounded-lg font-semibold text-sm text-white border border-white/20 bg-white/5"
          >
            Quiero ser Sponsor
          </button>
        </div>
      )}
    </nav>
  );
}

/* ───────── sponsor card ───────── */
const SponsorCard = ({ tier, price, color, benefits, waMsg, featured }: { tier: string; price: string; color: string; benefits: string[]; waMsg: string; featured?: boolean }) => (
  <div className={`rounded-2xl border p-6 flex flex-col gap-4 transition-all hover:scale-[1.02] ${featured ? "border-2 bg-white/10 shadow-2xl" : "border-white/10 bg-white/5"}`} style={featured ? { borderColor: color } : {}}>
    {featured && <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>⭐ Más popular</span>}
    <div className="flex items-center gap-2">
      <Award size={22} style={{ color }} />
      <h3 className="text-xl font-bold text-white">{tier}</h3>
    </div>
    <p className="text-3xl font-extrabold" style={{ color }}>{price}</p>
    <ul className="space-y-2 text-sm text-gray-300 flex-1">
      {benefits.map((b, i) => (
        <li key={i} className="flex gap-2 items-start">
          <Star size={14} className="mt-0.5 shrink-0" style={{ color }} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
    <a
      href={waLink(waMsg)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <MessageCircle size={18} /> Quiero ser {tier.split(" ")[0]}
    </a>
  </div>
);

/* ───────── station card ───────── */
const StationCard = ({ icon: Icon, color, title, desc }: { icon: any; color: string; title: string; desc: string }) => (
  <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] transition-all duration-300 cursor-default">
    <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: color + "22", color }}>
      <Icon size={32} />
    </div>
    <span className="text-white font-bold text-center text-lg">{title}</span>
    <span className="text-gray-400 text-sm text-center">{desc}</span>
  </div>
);

/* ───────── main page ───────── */
export default function RetoSteamCuscoPage() {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-gray-100 font-sans">
      <SteamNavbar scroll={scroll} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f14]/30 via-[#0f0f14]/50 to-[#0f0f14]" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pt-32 pb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">Reto </span>
            <span className="bg-gradient-to-r from-[#F97316] via-[#A855F7] to-[#06B6D4] bg-clip-text text-transparent">STEAM</span>
            <span className="text-white"> 2026</span>
            <br />
            <span className="text-white text-4xl md:text-6xl">Cusco</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Un viaje exploratorio por laboratorios tecnológicos y espacios de innovación donde las futuras líderes en tecnología y ciencia comienzan a construir su camino.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2 text-sm border border-white/10">
              <Calendar size={16} style={{ color: STEAM_COLORS.orange }} />
              <span className="text-white font-medium">Viernes 06 de marzo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2 text-sm border border-white/10">
              <MapPin size={16} style={{ color: STEAM_COLORS.cyan }} />
              <span className="text-white font-medium">Cusco / Perú</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink("Hola, quiero postular al Reto STEAM 2026 en Cusco. ¿Cómo puedo inscribirme?")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.orange}, ${STEAM_COLORS.purple})` }}
            >
              👉 Postular
            </a>
            <button
              onClick={() => scroll("sponsors")}
              className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105 border-2 border-white/20 bg-white/5 backdrop-blur"
            >
              👉 Quiero ser Sponsor
            </button>
          </div>
        </div>

        <ChevronDown size={32} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce hidden md:block" />
      </section>

      {/* ═══════════════ LOGOS / ORGANIZA ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Organiza</p>
          <img src={logoMD} alt="Mujeres Digitales" className="h-16 md:h-20 mx-auto mb-10 object-contain" />

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Partner Oficial y Sede Principal</p>
          <img src={logoCite} alt="CITE Textil Camélidos Cusco" className="h-14 md:h-16 mx-auto mb-4 object-contain" />
          <p className="text-gray-400 max-w-lg mx-auto mb-12">
            Gracias a su liderazgo en innovación y transferencia tecnológica, este programa se desarrolla en sus espacios especializados.
          </p>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Patrocinan</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Caja Cusco", "Mitchell", "Sponsor 3", "Tu empresa aquí"].map((name, i) => (
              <div key={i} className={`rounded-xl border border-white/10 py-6 px-4 flex items-center justify-center text-center ${i === 3 ? "border-dashed border-white/20 bg-white/[0.02]" : "bg-white/5"}`}>
                <span className={`font-medium text-sm ${i === 3 ? "text-gray-500 italic" : "text-gray-300"}`}>{name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("sponsors")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105 border border-white/20 bg-white/5"
          >
            👉 Convertirme en Sponsor
          </button>
        </div>
      </section>

      {/* ═══════════════ PROGRAMA ═══════════════ */}
      <section id="programa" className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            <span style={{ color: STEAM_COLORS.cyan }}>— </span>¿Qué es el Reto STEAM 2026?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            El Reto STEAM 2026 es una experiencia inmersiva diseñada para fortalecer habilidades en ciencia, tecnología, innovación, creatividad y liderazgo en adolescentes y jóvenes mujeres mediante estaciones exploratorias y mentoría especializada.
          </p>
        </div>
      </section>

      {/* ═══════════════ ESTACIONES STEAM ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
            <span style={{ color: STEAM_COLORS.orange }}>— </span>Estaciones STEAM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <StationCard icon={Palette} color={STEAM_COLORS.orange} title="🎨 Diseño de Moda" desc="Creatividad aplicada al diseño textil" />
            <StationCard icon={Droplets} color={STEAM_COLORS.purple} title="🌈 Tinturación Textil" desc="Ciencia y color en fibras naturales" />
            <StationCard icon={Monitor} color={STEAM_COLORS.cyan} title="💻 Manufactura Digital y Software" desc="Tecnología y fabricación digital" />
            <StationCard icon={BarChart3} color={STEAM_COLORS.green} title="📊 Modelo de Negocio" desc="Emprendimiento e innovación" />
            <StationCard icon={Globe} color={STEAM_COLORS.pink} title="🌍 Oportunidades STEAM Internacional" desc="Becas y redes globales" />
          </div>
        </div>
      </section>

      {/* ═══════════════ AGENDA ═══════════════ */}
      <section id="agenda" className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
            <span style={{ color: STEAM_COLORS.orange }}>— </span>Agenda
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F97316] via-[#A855F7] to-[#06B6D4]" />

            {[
              { time: "9:00 – 9:30", label: "Registro", color: STEAM_COLORS.lavender, icon: BookOpen },
              { time: "9:30 – 9:40", label: "Bienvenida", color: STEAM_COLORS.lavender, icon: Users },
              { time: "9:45 – 10:45", label: "Estación 1: Diseño de Moda 🎨", color: STEAM_COLORS.orange, icon: Palette },
              { time: "10:45 – 11:45", label: "Estación 2: Tinturación 🌈", color: STEAM_COLORS.purple, icon: Droplets },
              { time: "11:45 – 12:45", label: "Estación 3: Manufactura Digital / Software 💻", color: STEAM_COLORS.cyan, icon: Monitor },
              { time: "12:45 – 2:00", label: "Break experiencial 🎭", color: STEAM_COLORS.lavender, icon: Star },
              { time: "2:00 – 3:00", label: "Estación 4: Modelo de Negocio 📊", color: STEAM_COLORS.green, icon: BarChart3 },
              { time: "3:00 – 4:00", label: "Estación 5: Oportunidades STEAM Internacional 🌍", color: STEAM_COLORS.pink, icon: Globe },
              { time: "4:00 – 4:30", label: "Ceremonia de clausura 🎓", color: STEAM_COLORS.lavender, icon: Trophy },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start pl-4 md:pl-6 mb-6 relative">
                <div className="w-5 h-5 rounded-full border-2 shrink-0 z-10 mt-1" style={{ borderColor: item.color, backgroundColor: "#0f0f14" }}>
                  <div className="w-2 h-2 rounded-full mx-auto mt-[3px]" style={{ backgroundColor: item.color }} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 flex-1 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-mono font-semibold block mb-1" style={{ color: item.color }}>{item.time}</span>
                  <span className="text-gray-200 font-medium">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105 border border-white/20 bg-white/5"
            >
              👉 Ver agenda completa <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ SEDE ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
            <span style={{ color: STEAM_COLORS.green }}>— </span>Sede del Programa
          </h2>
          <p className="text-center text-gray-300 text-lg mb-4 font-medium">CITE Textil Camélidos Cusco</p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm">
              <Clock size={16} style={{ color: STEAM_COLORS.cyan }} />
              <span className="text-white font-medium">9:00 a.m. – 4:30 p.m.</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm">
              <MapPin size={16} style={{ color: STEAM_COLORS.orange }} />
              <span className="text-white font-medium">Cusco, Perú</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.123!2d-71.9675!3d-13.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDMxJzEyLjAiUyA3McKwNTgnMDMuMCJX!5e0!3m2!1ses!2spe!4v1700000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CITE Textil Camélidos Cusco"
            />
          </div>

          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/CITE+Textil+Camelidos+Cusco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: STEAM_COLORS.green }}
            >
              <MapPin size={18} /> Cómo llegar
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ SPONSORS ═══════════════ */}
      <section id="sponsors" className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
            <span style={{ color: STEAM_COLORS.orange }}>— </span>Sponsors
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-center">Súmate como sponsor y deja huella en la próxima generación de mujeres en STEAM.</p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <SponsorCard
              tier="Platinum STEAM"
              price="S/ 1,000"
              color={STEAM_COLORS.orange}
              featured
              benefits={[
                "Inclusión de logos en nuestra web oficial del programa",
                "Espacio para charla corporativa o inspiracional el día del evento",
                "Inclusión de 2 beneficiarias recomendadas por la empresa",
                "Reconocimiento institucional como empresa impulsora en tecnología y sponsor principal",
                "Entrevista o spotlight de 1 minuto para redes sociales como patrocinador principal",
                "Informe final con métricas, alcance y testimonio",
                "Participación en ceremonia de clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Platinum STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Gold STEAM"
              price="S/ 500"
              color={STEAM_COLORS.purple}
              benefits={[
                "Inclusión de logos en nuestra web oficial del programa",
                "Inclusión de 1 beneficiaria recomendada por la empresa",
                "Reconocimiento institucional como empresa impulsora de talento tecnológico",
                "Informe final con métricas, alcance y testimonios",
                "Participación en ceremonia de clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Gold STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Silver STEAM"
              price="S/ 250"
              color={STEAM_COLORS.cyan}
              benefits={[
                "Inclusión de logos en nuestra web oficial del programa",
                "Reconocimiento institucional como empresa impulsora en tecnología y ciencias",
                "Informe final con métricas, alcance y testimonios",
                "Participación en ceremonia de clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Silver STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Experience Sponsor"
              price="En especie"
              color={STEAM_COLORS.green}
              benefits={[
                "Aportes posibles: kits educativos, tote bags, libretas creativas, soportes para laptop/celular, USB personalizados, audífonos",
                "Presencia de marca en experiencia del participante",
                "Inclusión de logos en nuestra web oficial del programa",
                "Participación en ceremonia de clausura",
              ]}
              waMsg="Hola, me interesa aportar en especie como Experience Sponsor del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ EDICIONES ANTERIORES ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span style={{ color: STEAM_COLORS.pink }}>— </span>Edición 2025
          </h2>
          <p className="text-gray-400 mb-12">Nuestro impacto en la primera edición</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <AnimatedCounter target={15} prefix="+" />
              <p className="text-gray-400 mt-2 text-sm">Adolescentes participantes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <AnimatedCounter target={10} prefix="+" />
              <p className="text-gray-400 mt-2 text-sm">Mentoras expertas</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <AnimatedCounter target={5} />
              <p className="text-gray-400 mt-2 text-sm">Estaciones STEAM</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-4xl md:text-5xl font-extrabold text-white">🏆</div>
              <p className="text-gray-400 mt-2 text-sm">Sponsors: Caja Cusco, Mitchell y más</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img src={citeLab} alt="Edición 2025" className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACTO / FOOTER ═══════════════ */}
      <footer className="py-12 px-5 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <img src={logoMD} alt="Mujeres Digitales" className="h-10 object-contain" />
            <span className="text-white font-semibold">Mujeres Digitales</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink("Hola, tengo una consulta sobre el Reto STEAM 2026.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <MessageCircle size={14} /> +51 986 848 128
            </a>
            <a href="https://www.instagram.com/somosmujeresdigitales" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <Instagram size={14} /> @somosmujeresdigitales
            </a>
            <a href="mailto:contacto@somosmujeresdigitales.com" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail size={14} /> Correo
            </a>
            <a href="https://www.somosmujeresdigitales.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <ExternalLink size={14} /> Web
            </a>
          </div>
          <p>© 2026 Mujeres Digitales. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
