import { useState, useEffect, useRef } from "react";
import { Palette, Droplets, Monitor, BarChart3, Globe, Clock, MapPin, Calendar, ChevronDown, ExternalLink, MessageCircle, Mail, Star, Award, Menu, X, Users, BookOpen, Trophy, Instagram } from "lucide-react";
import heroBg from "@/assets/reto-steam-hero-bg.jpg";
import logoMD from "@/assets/logo-mujeres-digitales-white.png";
import logoCite from "@/assets/logo-cite-cusco-white.png";
import citeLab from "@/assets/reto-steam-cite-lab.png";
import collage2025 from "@/assets/reto-steam-collage-2025.jpg";
import programaImg from "@/assets/reto-steam-programa.jpg";
import logoMINPRO from "@/assets/logo_minpro.png";
import logoITP from "@/assets/logo_ITP.png";
import Mujeres1 from "@/assets/mujeres-1.png";
import Mujeres2 from "@/assets/mujeres-2.png";
import Mujeres3 from "@/assets/mujeres-3.png";
import CITE1 from "@/assets/cite-1.png";


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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Left - Logo only */}
        <div className="flex items-center">
          <img src={logoMD} alt="Mujeres Digitales" className="h-9 md:h-12 object-contain" />
        </div>

        {/* Center - desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scroll("agenda")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Agenda</button>
          <button onClick={() => scroll("edicion-2025")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Reto STEAM 2025</button>
          <button onClick={() => scroll("sponsors")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Quiero ser Sponsor</button>
        </div>

        {/* Right - empty spacer for balance */}
        <div className="hidden md:block w-12" />

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f0f14]/98 backdrop-blur-xl border-t border-white/10 px-6 pb-5 space-y-3 animate-fade-in">
          <button onClick={() => { scroll("agenda"); setOpen(false); }} className="block w-full text-left text-gray-300 py-3 text-sm font-medium">Agenda</button>
          <button onClick={() => { scroll("programa"); setOpen(false); }} className="block w-full text-left text-gray-300 py-3 text-sm font-medium">Reto STEAM 2025</button>
          <button onClick={() => { scroll("sponsors"); setOpen(false); }} className="block w-full text-left text-gray-300 py-3 text-sm font-medium">Quiero ser Sponsor</button>
        </div>
      )}
    </nav>
  );
}

/* ───────── sponsor card ───────── */
const SponsorCard = ({ tier, price, color, benefits, waMsg, featured }: { tier: string; price: string; color: string; benefits: string[]; waMsg: string; featured?: boolean }) => (
  <div className={`group relative rounded-2xl border p-px transition-all hover:scale-[1.02] ${featured ? "shadow-2xl" : ""}`} style={{ borderColor: featured ? color : "rgba(255,255,255,0.1)" }}>
    {featured && <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl" style={{ background: color }} />}
    <div className={`relative rounded-2xl p-6 md:p-8 flex flex-col gap-5 h-full ${featured ? "bg-white/10" : "bg-white/[0.04]"}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ background: color }}>
          ⭐ Más popular
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "22" }}>
          <Award size={24} style={{ color }} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{tier}</h3>
          <p className="text-2xl font-extrabold mt-1" style={{ color }}>{price}</p>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <ul className="space-y-3 text-sm text-gray-300 flex-1">
        {benefits.map((b, i) => (
          <li key={i} className="flex gap-3 items-start group/item">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: color + "22" }}>
              <Star size={10} style={{ color }} />
            </div>
            <span className="group-hover/item:text-white transition-colors">{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://wa.link/ynn0p3"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        <MessageCircle size={18} /> Quiero ser {tier.split(" ")[0]}
      </a>
    </div>
  </div>
);

/* ───────── station card ───────── */
const StationCard = ({ icon: Icon, color, title, desc, number }: { icon: any; color: string; title: string; desc: string; number: number }) => (
  <div className="group relative bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col items-start gap-4 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 cursor-default overflow-hidden">
    <span className="absolute -right-4 -top-6 text-[8rem] font-black leading-none opacity-[0.04] text-white select-none group-hover:opacity-[0.08] transition-opacity">{number}</span>
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 30% 30%, ${color}15, transparent 70%)` }} />
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: color + "18", border: `1px solid ${color}33` }}>
        <Icon size={30} style={{ color }} />
      </div>
    </div>
    <div className="relative">
      <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color }}>Estación {number}</span>
      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
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

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pt-20 pb-16">
          {/*<h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">*/}
          {/*  <span className="text-white">Reto </span>*/}
          {/*  <span className="bg-gradient-to-r from-[#F97316] via-[#A855F7] to-[#06B6D4] bg-clip-text text-transparent">STEAM</span>*/}
          {/*  <span className="text-white"> 2026</span>*/}
          {/*  <br />*/}
          {/*  <span className="text-white text-4xl md:text-6xl">Cusco</span>*/}
          {/*</h1>*/}
          <div className="flex justify-center mb-2">
            <div className="border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <img
                src="/reto_steam.png"
                alt="Reto STEAM - Laboratorio de innovación"
                className="w-full max-w-2xl block"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-2 leading-relaxed">
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
              href="https://forms.gle/SWX3d9g5768A1ncj7"
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
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">Coorganizadores</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-8">
            <img src={logoMD} alt="Mujeres Digitales" className="h-16 md:h-20 object-contain" />
            <img src={logoCite} alt="CITE Textil Camélidos Cusco" className="h-16 md:h-20 object-contain" />
            <img src={logoITP} alt="Instituto Tecnológico de la Producción" className="h-16 md:h-20 object-contain" />
            <img src={logoMINPRO} alt="Ministerio de la Producción" className="h-16 md:h-20 object-contain" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Patrocinan</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] py-8 px-4 flex items-center justify-center text-center hover:bg-white/5 transition-colors">
                <span className="font-medium text-sm text-gray-500 italic">Tu empresa aquí</span>
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
      <section id="programa" className="py-24 px-5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: STEAM_COLORS.cyan }}>Sobre el programa</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                ¿Qué es el Reto<br />
                <span className="bg-gradient-to-r from-[#F97316] via-[#A855F7] to-[#06B6D4] bg-clip-text text-transparent">STEAM 2026</span>?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                El Reto STEAM 2026 es una experiencia inmersiva diseñada para fortalecer habilidades en ciencia, tecnología, innovación, creatividad y liderazgo en adolescentes y jóvenes mujeres mediante estaciones exploratorias y mentoría especializada.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Ciencia", "Tecnología", "Ingeniería", "Arte", "Matemáticas"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={programaImg} alt="Reto STEAM - Laboratorio de innovación" className="w-full h-80 md:h-[400px] object-cover" />
              </div>
              {/* Decorative glow */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: STEAM_COLORS.purple }} />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl opacity-15" style={{ background: STEAM_COLORS.cyan }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ESTACIONES STEAM ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white text-center">
            <span style={{ color: STEAM_COLORS.orange }}>— </span>¿Qué encontrarás el 2026?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">5 estaciones STEAM donde explorarás ciencia, tecnología, arte, ingeniería y emprendimiento con mentoras expertas.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StationCard icon={Palette} color={STEAM_COLORS.orange} title="Diseño de Moda" desc="Explora tu creatividad diseñando prendas con técnicas textiles tradicionales y modernas. Aprende sobre diseño, patronaje y tendencias de moda sostenible." number={1} />
            <StationCard icon={Droplets} color={STEAM_COLORS.purple} title="Tinturación Textil" desc="Descubre la ciencia detrás de los colores naturales. Experimenta con tintes orgánicos sobre fibras de camélidos y aprende sobre química aplicada." number={2} />
            <StationCard icon={Monitor} color={STEAM_COLORS.cyan} title="Manufactura Digital y Software" desc="Sumérgete en la impresión 3D, corte láser y programación básica. Crea prototipos digitales y aprende sobre realidad virtual." number={3} />
            <StationCard icon={BarChart3} color={STEAM_COLORS.green} title="Modelo de Negocio" desc="Transforma tus ideas en proyectos viables. Aprende a crear un pitch, definir tu propuesta de valor y entender el mercado." number={4} />
            <StationCard icon={Globe} color={STEAM_COLORS.pink} title="Oportunidades STEAM Internacional" desc="Conoce becas, programas y redes globales para jóvenes mujeres en STEAM. Descubre cómo llevar tu talento al mundo." number={5} />
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

          {/*<div className="text-center mt-8">*/}
          {/*  <a*/}
          {/*    href="#"*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105 border border-white/20 bg-white/5"*/}
          {/*  >*/}
          {/*    👉 Ver agenda completa <ExternalLink size={16} />*/}
          {/*  </a>*/}
          {/*</div>*/}
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
       <section id="edicion-2025" className="py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span style={{ color: STEAM_COLORS.pink }}>— </span>Edición 2025
          </h2>
          <div className="text-gray-400 mb-12 max-w-3xl mx-auto space-y-4">
            <p className="text-base leading-relaxed">
              Nuestro impacto en la primera edición incluyó una experiencia inmersiva desarrollada en los laboratorios del CITE Textil Camélidos Cusco, donde las participantes recorrieron estaciones STEAM vinculadas al diseño, manufactura digital, innovación productiva y desarrollo de modelos de negocio, acompañadas por mentoras expertas que fortalecieron sus habilidades y despertaron nuevas vocaciones tecnológicas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <AnimatedCounter target={15} prefix="+" />
              <p className="text-gray-400 mt-2 text-sm">Adolescentes participantes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <AnimatedCounter target={10} prefix="+" />
              <p className="text-gray-400 mt-2 text-sm">Mentoras expertas</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <AnimatedCounter target={5} />
              <p className="text-gray-400 mt-2 text-sm">Estaciones STEAM</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award size={20} style={{ color: STEAM_COLORS.orange }} />
                <p className="text-white font-bold text-sm">Sponsors</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">Caja Cusco, Sol Alpaca y Chamba Warmi</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star size={20} style={{ color: STEAM_COLORS.pink }} />
                <p className="text-white font-bold text-sm">Invitada especial</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">Vice Gobernadora de la Región Cusco</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img src={collage2025} alt="Collage Reto STEAM Edición 2025" className="w-full h-auto object-cover" />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.8447!2d-71.9408201!3d-13.5318857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e7fcf3e7f98b9%3A0x60f84b25ddfc18d4!2sCITEtextil%20cam%C3%A9lidos%20Cusco!5e0!3m2!1ses!2spe!4v1707590400000"
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

      {/* ═══════════════ ORGANIZADORES ═══════════════ */}
      <section className="py-24 px-5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: STEAM_COLORS.purple }}>Conoce a quienes hacen esto posible</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Nuestros <span className="bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">Organizadores</span>
            </h2>
          </div>

          {/* ── Mujeres Digitales ── */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[3/4]">
                  <img src={Mujeres1} alt="Mujeres Digitales en acción" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-square">
                  <img src={Mujeres2} alt="Tecnología e innovación" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-square">
                  <img src={collage2025} alt="Comunidad Mujeres Digitales" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[3/4]">
                  <img src={Mujeres3} alt="Mujeres en STEAM" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: STEAM_COLORS.purple }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STEAM_COLORS.purple }} />
                Organizador principal
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                ¿Qué es<br />
                <span className="bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">Mujeres Digitales</span>?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Somos una organización acreditada por el MIMP y respaldada por SENAJU, dedicada a empoderar a mujeres y adolescentes en tecnología, ciencia y emprendimiento en Cusco y el sur del Perú.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                A través de mentoría 1:1, talleres inmersivos y programas como el Reto STEAM, conectamos a jóvenes mujeres con mentoras expertas en áreas STEM para construir un futuro más inclusivo y digital.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-white">1:1</div>
                  <p className="text-gray-400 text-xs mt-1">Mentoría personalizada</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-white">14-30</div>
                  <p className="text-gray-400 text-xs mt-1">Edad de mentees</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/somosmujeresdigitales/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.purple}, ${STEAM_COLORS.pink})` }}
              >
                Conoce más sobre nosotras <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* ── CITE Textil Camélidos Cusco ── */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: STEAM_COLORS.cyan }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STEAM_COLORS.cyan }} />
                Partner oficial y sede
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                ¿Qué es<br />
                <span className="bg-gradient-to-r from-[#06B6D4] to-[#22C55E] bg-clip-text text-transparent">CITE Textil Camélidos Cusco</span>?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                El CITE Textil Camélidos Cusco es un centro de innovación productiva y transferencia tecnológica del Ministerio de la Producción, especializado en la cadena de valor de fibras de camélidos sudamericanos.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Cuenta con laboratorios de diseño, tinturación, manufactura digital e investigación textil, donde artesanas y emprendedoras acceden a tecnología de punta para innovar en sus procesos productivos y conectarse con mercados nacionales e internacionales.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xl font-extrabold text-white">🔬</div>
                  <p className="text-gray-400 text-xs mt-1">Laboratorios especializados</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xl font-extrabold text-white">🧶</div>
                  <p className="text-gray-400 text-xs mt-1">Fibras de camélidos</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xl font-extrabold text-white">🏛️</div>
                  <p className="text-gray-400 text-xs mt-1">Min. de Producción</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/citecusco/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.cyan}, ${STEAM_COLORS.green})` }}
              >
                Conoce el CITE Cusco <ExternalLink size={18} />
              </a>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={CITE1} alt="CITE Textil Camélidos Cusco - Laboratorios" className="w-full h-80 md:h-[420px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl overflow-hidden border border-white/10 shadow-xl w-40 h-40 md:w-48 md:h-48">
                <img src={logoCite} alt="Logo CITE" className="w-full h-full object-contain bg-white/10 backdrop-blur p-4" />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: STEAM_COLORS.cyan }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACTO ═══════════════ */}
      <section className="py-24 px-5" style={{ backgroundColor: "#321d47" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Tienes preguntas?</h2>
          <p className="text-gray-300 mb-10 text-lg">Escríbenos y te responderemos lo antes posible.</p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={waLink("Hola, tengo una consulta sobre el Reto STEAM 2026.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-white/10 border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={28} className="text-green-400" />
              </div>
              <span className="text-white font-bold text-lg">WhatsApp</span>
              <span className="text-gray-300 text-sm">+51 986 848 128</span>
            </a>

            <a
              href="mailto:holamujeresdigitales@gmail.com"
              className="flex flex-col items-center gap-3 bg-white/10 border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={28} className="text-purple-400" />
              </div>
              <span className="text-white font-bold text-lg">Correo</span>
              <span className="text-gray-300 text-sm">holamujeresdigitales@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-10 px-5 border-t border-white/10 bg-[#0f0f14]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <img src={logoMD} alt="Mujeres Digitales" className="h-10 object-contain" />
            <span className="text-white font-semibold">Mujeres Digitales</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.instagram.com/somosmujeresdigitales" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <Instagram size={14} /> @somosmujeresdigitales
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
