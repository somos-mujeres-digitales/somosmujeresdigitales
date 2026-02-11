import { useState } from "react";
import { Palette, Droplets, Monitor, BarChart3, Globe, Clock, MapPin, Users, Heart, Star, Award, Gift, ChevronDown, ExternalLink, MessageCircle, Mail, Instagram, Facebook } from "lucide-react";
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

/* ───────── tiny components ───────── */

const SectionTitle = ({ children, accent = STEAM_COLORS.lavender }: { children: React.ReactNode; accent?: string }) => (
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
    <span style={{ color: accent }}>— </span>{children}
  </h2>
);

const StationCard = ({ icon: Icon, color, title, idx }: { icon: any; color: string; title: string; idx: number }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "22", color }}>
      <Icon size={28} />
    </div>
    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>Estación {idx}</span>
    <span className="text-white font-medium text-center">{title}</span>
  </div>
);

const SponsorCard = ({ tier, price, color, benefits, waMsg }: { tier: string; price: string; color: string; benefits: string[]; waMsg: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 hover:border-white/20 transition-colors">
    <div className="flex items-center gap-2">
      <Award size={22} style={{ color }} />
      <h3 className="text-xl font-bold text-white">{tier}</h3>
    </div>
    <p className="text-2xl font-bold" style={{ color }}>{price}</p>
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

/* ───────── main page ───────── */

export default function RetoSteamCuscoPage() {
  const [donationAmount, setDonationAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-gray-100 font-sans">
      {/* ─── STICKY MOBILE BAR ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-white/10 bg-[#0f0f14]/95 backdrop-blur-md">
        <button onClick={() => scroll("sponsors")} className="flex-1 py-3 text-sm font-semibold" style={{ color: STEAM_COLORS.orange }}>
          🤝 Sponsor
        </button>
        <button onClick={() => scroll("donar")} className="flex-1 py-3 text-sm font-semibold" style={{ color: STEAM_COLORS.pink }}>
          💜 Donar
        </button>
      </div>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f14]/60 via-[#0f0f14]/40 to-[#0f0f14]" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center py-24">
          <div className="flex justify-center gap-4 mb-8">
            <img src={logoMD} alt="Mujeres Digitales" className="h-14 md:h-20 object-contain" />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-white">Mujeres Digitales – </span>
            <span className="bg-gradient-to-r from-[#F97316] via-[#A855F7] to-[#06B6D4] bg-clip-text text-transparent">
              Reto STEAM 2026
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl">(Cusco)</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Experiencia inmersiva de 1 día para potenciar ciencia, tecnología, innovación, creatividad y liderazgo en adolescentes y jóvenes mujeres.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2 text-sm mb-10 border border-white/10">
            <img src={logoCite} alt="CITE" className="h-6 object-contain" />
            <span className="text-gray-300">In partnership with: <strong className="text-white">CITE Textil Camélidos Cusco</strong> (Sede principal)</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => scroll("sponsors")} className="px-8 py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${STEAM_COLORS.orange}, ${STEAM_COLORS.purple})` }}>
              🤝 Quiero ser Sponsor
            </button>
            <button onClick={() => scroll("donar")} className="px-8 py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105 bg-[#EC4899]">
              💜 Donar
            </button>
            <button onClick={() => scroll("agenda")} className="px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 bg-white/10 border border-white/20 text-white backdrop-blur">
              📋 Ver Agenda
            </button>
          </div>
        </div>

        <ChevronDown size={32} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce hidden md:block" />
      </section>

      {/* ═══════════════ 2. SOBRE MUJERES DIGITALES ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle accent={STEAM_COLORS.purple}>Sobre Mujeres Digitales</SectionTitle>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Organización acreditada por el <strong className="text-white">Ministerio de la Mujer y Poblaciones Vulnerables (MIMP)</strong> y con respaldo de la <strong className="text-white">Secretaría Nacional de Organizaciones Juveniles (SENAJU)</strong>. 
            Actuamos en la región Cusco y sur del Perú impulsando tecnología, STEAM y emprendimiento tecnológico en mujeres y adolescentes.
          </p>
          <p className="text-gray-400 mb-8">
            Formamos talento femenino en tecnología y STEAM. A través de programas formativos, mentorías y experiencias inmersivas, buscamos reducir brechas de género y construir una nueva generación de mujeres en tecnologías.
          </p>
          <a href="https://www.somosmujeresdigitales.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: STEAM_COLORS.lavender }}>
            Conoce más <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* ═══════════════ 3. ¿QUÉ ES EL RETO STEAM? ═══════════════ */}
      <section className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle accent={STEAM_COLORS.cyan}>¿Qué es el Reto STEAM 2026?</SectionTitle>
            <p className="text-gray-300 leading-relaxed mb-4">
              Programa inmersivo de <strong className="text-white">un día</strong> diseñado para potenciar habilidades en ciencia, tecnología, innovación, creatividad y liderazgo en adolescentes y jóvenes mujeres de la región Cusco.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              A través de una pasantía experiencial en los laboratorios del CITE Textil Camélidos, las participantes explorarán <strong className="text-white">5 áreas STEAM</strong> acompañadas de mentoras y expertas.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/10 to-[#06B6D4]/10 border border-white/10 rounded-xl px-5 py-3 text-lg font-bold text-white">
              🔬 5 Estaciones STEAM
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img src={citeLab} alt="Laboratorios CITE" className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. DETALLES DEL PROGRAMA ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle accent={STEAM_COLORS.green}>Detalles del Programa</SectionTitle>

          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <MapPin size={18} style={{ color: STEAM_COLORS.orange }} />
              <span className="text-white font-medium">CITE Textil Camélidos Cusco</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <Clock size={18} style={{ color: STEAM_COLORS.cyan }} />
              <span className="text-white font-medium">9:00 a.m. – 4:30 p.m.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StationCard icon={Palette} color={STEAM_COLORS.orange} title="Diseño de moda" idx={1} />
            <StationCard icon={Droplets} color={STEAM_COLORS.purple} title="Tinturación textil" idx={2} />
            <StationCard icon={Monitor} color={STEAM_COLORS.cyan} title="Manufactura digital / software" idx={3} />
            <StationCard icon={BarChart3} color={STEAM_COLORS.green} title="Modelo de negocio" idx={4} />
            <StationCard icon={Globe} color={STEAM_COLORS.pink} title="Oportunidades STEAM internacionales" idx={5} />
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. AGENDA ═══════════════ */}
      <section id="agenda" className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <SectionTitle accent={STEAM_COLORS.orange}>Agenda</SectionTitle>

          <div className="space-y-0">
            {[
              { time: "9:00 – 9:30", label: "Registro", color: STEAM_COLORS.lavender },
              { time: "9:30 – 9:40", label: "Bienvenida", color: STEAM_COLORS.lavender },
              { time: "9:45 – 10:45", label: "Estación 1: Diseño de moda 🎨", color: STEAM_COLORS.orange },
              { time: "10:45 – 11:45", label: "Estación 2: Tinturación 🌈", color: STEAM_COLORS.purple },
              { time: "11:45 – 12:45", label: "Estación 3: Manufactura Digital / Software 💻", color: STEAM_COLORS.cyan },
              { time: "12:45 – 2:00", label: "Break – Show teatro 🎭", color: STEAM_COLORS.lavender },
              { time: "2:00 – 3:00", label: "Estación 4: Modelo de negocio 📊", color: STEAM_COLORS.green },
              { time: "3:00 – 4:00", label: "Estación 5: Oportunidades STEAM Internacional 🌍", color: STEAM_COLORS.pink },
              { time: "4:00 – 4:30", label: "Ceremonia de clausura 🎓", color: STEAM_COLORS.lavender },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start py-4 border-b border-white/5 last:border-0">
                <div className="w-28 md:w-36 shrink-0 text-sm font-mono font-semibold" style={{ color: item.color }}>
                  {item.time}
                </div>
                <span className="text-gray-200">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. PARTNER OFICIAL ═══════════════ */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle accent={STEAM_COLORS.cyan}>Partner oficial y sede principal</SectionTitle>
          <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <img src={logoCite} alt="CITE Textil Camélidos Cusco" className="h-20 mx-auto mb-4 object-contain" />
            <p className="text-gray-300 max-w-lg mx-auto">
              Gracias al <strong className="text-white">CITE Textil Camélidos Cusco</strong> por abrir sus laboratorios y hacer posible esta experiencia inmersiva.
            </p>
          </div>
          <p className="text-gray-400 mb-4">¿Tu institución también quiere sumarse como aliado?</p>
          <a
            href={waLink("Hola, me interesa sumarme como aliado del Reto STEAM 2026 en Cusco. ¿Me pueden dar más información?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle size={18} /> Conversemos por WhatsApp
          </a>
        </div>
      </section>

      {/* ═══════════════ 7. SPONSORS ═══════════════ */}
      <section id="sponsors" className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle accent={STEAM_COLORS.orange}>Sponsors</SectionTitle>
          <p className="text-gray-400 mb-10 max-w-2xl">Súmate como sponsor y deja huella en la próxima generación de mujeres en STEAM. Elige la categoría que mejor se ajuste a tu organización.</p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <SponsorCard
              tier="Platinum STEAM"
              price="S/ 1,000"
              color={STEAM_COLORS.orange}
              benefits={[
                "Logos en web oficial del programa",
                "Espacio para charla corporativa/inspiracional",
                "2 beneficiarias recomendadas por la empresa",
                "Reconocimiento como sponsor principal",
                "Spotlight video 1 min para redes",
                "Informe final con métricas + testimonios",
                "Participación en ceremonia de clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Platinum STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Gold STEAM"
              price="S/ 500"
              color={STEAM_COLORS.purple}
              benefits={[
                "Logos en web oficial del programa",
                "1 beneficiaria recomendada",
                "Reconocimiento institucional",
                "Informe final",
                "Participación en clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Gold STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Silver STEAM"
              price="S/ 250"
              color={STEAM_COLORS.cyan}
              benefits={[
                "Logo en web",
                "Reconocimiento institucional",
                "Informe final",
                "Participación en clausura",
              ]}
              waMsg="Hola, me interesa ser Sponsor Silver STEAM del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
            <SponsorCard
              tier="Experience Sponsor"
              price="En especie"
              color={STEAM_COLORS.green}
              benefits={[
                "Aporta: kits educativos, merch, snacks, bebidas, agua, local o logística",
                "Presencia de marca en la experiencia",
                "Logo en web",
                "Reconocimiento en clausura",
              ]}
              waMsg="Hola, me interesa aportar en especie como Experience Sponsor del Reto STEAM 2026 en Cusco. ¿Me pueden dar más detalles?"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. DONACIONES ═══════════════ */}
      <section id="donar" className="py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <SectionTitle accent={STEAM_COLORS.pink}>Dona y apoya a una futura líder STEAM</SectionTitle>
          <p className="text-gray-400 mb-8">
            Tu aporte libre ayuda a becar participantes, materiales y experiencias educativas.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[20, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}
                className={`px-6 py-3 rounded-xl font-bold text-lg border transition-all ${
                  donationAmount === amt
                    ? "bg-[#EC4899] border-[#EC4899] text-white scale-105"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                }`}
              >
                S/ {amt}
              </button>
            ))}
            <input
              type="number"
              placeholder="Otro monto"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setDonationAmount(null); }}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 w-36 text-center font-bold text-lg focus:outline-none focus:border-[#EC4899]"
            />
          </div>

          <a
            href={waLink(`Hola, quiero donar S/ ${donationAmount || customAmount || "___"} para el Reto STEAM 2026 en Cusco. ¿Cómo puedo hacer la transferencia?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105 bg-[#EC4899]"
          >
            <Heart size={20} /> Donar ahora
          </a>
          <p className="text-gray-500 text-sm mt-4">Coordina tu donación por WhatsApp. Aceptamos Yape, Plin, transferencia o PayPal.</p>
        </div>
      </section>

      {/* ═══════════════ 9. FAQ ═══════════════ */}
      <section className="py-20 px-5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <SectionTitle accent={STEAM_COLORS.lavender}>Preguntas frecuentes</SectionTitle>
          <div className="space-y-4">
            {[
              { q: "¿A quién está dirigido?", a: "A adolescentes y jóvenes mujeres de la región Cusco interesadas en ciencia, tecnología, innovación, creatividad y liderazgo." },
              { q: "¿Dónde es?", a: "En el CITE Textil Camélidos Cusco, nuestro partner oficial y sede principal." },
              { q: "¿Cómo ser sponsor?", a: "Elige tu categoría (Platinum, Gold, Silver o Experience) en la sección de sponsors y contáctanos por WhatsApp." },
              { q: "¿Cómo donar?", a: "Puedes donar cualquier monto en la sección de donaciones. Aceptamos Yape, Plin, transferencia bancaria o PayPal." },
            ].map((item, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-xl">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-medium list-none">
                  {item.q}
                  <ChevronDown size={18} className="text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-4 text-gray-400 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 10. FOOTER ═══════════════ */}
      <footer className="py-12 px-5 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <img src={logoMD} alt="Mujeres Digitales" className="h-10 object-contain" />
            <span className="text-white font-semibold">Mujeres Digitales</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink("Hola, tengo una consulta sobre el Reto STEAM 2026.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              <MessageCircle size={14} /> WhatsApp
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

      {/* spacer for sticky bar on mobile */}
      <div className="h-14 md:hidden" />
    </div>
  );
}
