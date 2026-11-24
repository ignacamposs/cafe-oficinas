'use client';

import React, { useState, useEffect, useRef } from 'react';

// Reemplazar por el número real de WhatsApp del café (ej: 5491173654504)
const WHATSAPP_NUMBER = '5491173654504';

interface Office {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  capacity: string;
  price: string;
  priceNote: string;
  description: string;
  amenities: string[];
  image: string;
}

const OFFICES: Office[] = [
  {
    id: 'oficina-01',
    number: '01',
    name: 'oficina privada',
    subtitle: 'ideal para reuniones focalizadas o jornadas de trabajo en equipo reducido',
    capacity: 'hasta 4 personas',
    price: '$100.000 / día',
    priceNote: '100% acreditable en consumición',
    description:
      'Un espacio íntimo y silencioso integrado a la estética del estudio. Pensado para jornadas de foco, llamadas o reuniones privadas con servicio de cafetería de especialidad a la mesa.',
    amenities: [
      'Capacidad hasta 4 personas',
      'Wi-Fi de alta velocidad',
      'Climatización frío / calor',
      'Servicio de café y gastronomía a la mesa',
      '$100.000 de crédito libre para consumir en el día',
    ],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'oficina-02',
    number: '02',
    name: 'sala de directorio',
    subtitle: 'mesa equipada para presentaciones, workshops y equipos medianos',
    capacity: 'hasta 8 personas',
    price: '$200.000 / día',
    priceNote: '100% acreditable en consumición',
    description:
      'Nuestra oficina más completa para jornadas intensivas de trabajo o presentaciones con clientes. Cuenta con mesa de diseño con conectividad integrada y privacidad total.',
    amenities: [
      'Capacidad hasta 8 personas',
      'Mesa amplia con enchufes integrados',
      'Smart TV para presentaciones',
      'Aire acondicionado y baño privado',
      '$200.000 de crédito libre para consumir en el día',
    ],
    image:
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'entrepiso',
    number: '03',
    name: 'el entrepiso',
    subtitle: 'espacio abierto de gran formato para offsite, capacitaciones o lanzamientos',
    capacity: 'hasta 15 personas',
    price: '$250.000 / día',
    priceNote: '100% acreditable en consumición',
    description:
      'El sector más amplio del espacio, con vista al salón y luz natural. Diseñado para jornadas de equipo completo, talleres creativos o encuentros corporativos descontracturados.',
    amenities: [
      'Capacidad hasta 15 personas',
      'Configuración flexible de mesas',
      'Wi-Fi dedicado y puntos de carga',
      'Atención personalizada de barra y cocina',
      '$250.000 de crédito libre para consumir en el día',
    ],
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
];

const MARQUEE_ITEMS = [
  '100% del valor del alquiler se acredita en consumición',
  'café de especialidad & gastronomía artesanal',
  'tres espacios privados para equipos de 4 a 15 personas',
  'lunes a sábados • reservas por jornada completa',
];

/**
 * Componente minimalista para revelar secciones suavemente al scrollear
 */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function CafeOfficesPage() {
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const buildWhatsAppLink = (office: Office) => {
    const dateVal = selectedDates[office.id];
    const dateText = dateVal ? ` para el día ${dateVal}` : '';
    const message = `Hola! Me interesa reservar "${office.name}" (${office.capacity} - ${office.price} en consumición)${dateText}. ¿Tienen disponibilidad?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#6A7053] selection:text-white overflow-x-hidden">
      {/* Barra superior naranja en movimiento continuo estilo estudio.te */}
      <div className="bg-[#D96B27] text-white text-[11px] tracking-widest py-2 overflow-hidden lowercase">
        <div className="animate-marquee flex items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
            <span key={idx} className="mx-8 whitespace-nowrap flex items-center gap-8">
              <span>{text}</span>
              <span className="opacity-60">•</span>
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between text-xs tracking-wide lowercase">
          <nav className="hidden md:flex items-center gap-7 text-neutral-600">
            <a
              href="#espacios"
              className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              espacios
            </a>
            <a
              href="#modalidad"
              className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              cómo funciona
            </a>
            <a
              href="#horarios"
              className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
            >
              horarios
            </a>
          </nav>

          <a
            href="#"
            className="text-base md:text-xl font-semibold tracking-tight text-black hover:opacity-75 transition-opacity"
          >
            cafe.te <span className="font-light text-neutral-400">| oficinas</span>
          </a>

          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-7 text-neutral-600">
              <a
                href="#oficina-01"
                className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
              >
                oficina 01
              </a>
              <a
                href="#oficina-02"
                className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
              >
                oficina 02
              </a>
              <a
                href="#entrepiso"
                className="relative py-1 hover:text-black transition after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
              >
                entrepiso
              </a>
            </nav>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola! Quiero consultar por el alquiler de oficinas en cafe.te'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-800 rounded-full px-3.5 py-1.5 text-[11px] md:text-xs text-black hover:bg-[#6A7053] hover:border-[#6A7053] hover:text-white transition-all duration-300"
            >
              consultar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Editorial: Entrada escalonada + Grilla de 3 fotos verticales */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div
          className={`text-center mb-10 transition-all duration-1000 ease-out ${
            heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.22em] sm:tracking-[0.35em] uppercase text-[#1A1A1A]">
            O F I C I N A S . T E
          </h1>
          <p className="mt-3 text-xs md:text-sm text-neutral-500 lowercase tracking-wide">
            tres espacios privados dentro del café • el total de tu reserva vuelve en consumición
          </p>
        </div>

        {/* Grilla fotográfica 3 columnas con aparición escalonada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OFFICES.map((office, idx) => (
            <a
              key={office.id}
              href={`#${office.id}`}
              style={{ transitionDelay: `${150 + idx * 140}ms` }}
              className={`group relative aspect-[3/4] overflow-hidden bg-neutral-100 block transition-all duration-1000 ease-out ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src={office.image}
                alt={office.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:-translate-y-1 transition-transform duration-500">
                <span className="text-[11px] tracking-widest uppercase opacity-80">
                  {office.capacity}
                </span>
                <h2 className="text-xl font-medium lowercase tracking-wide mt-0.5">
                  {office.name}
                </h2>
                <div className="mt-3 flex items-center justify-between border-t border-white/25 pt-3 text-xs">
                  <span>{office.price}</span>
                  <span className="flex items-center gap-1 underline underline-offset-4">
                    ver detalle{' '}
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Bloque dividido (Split-Screen): Arena (#EAE5DC) + Verde Oliva (#6A7053) */}
      <section id="modalidad" className="grid grid-cols-1 lg:grid-cols-12">
        {/* Izquierda: Fondo crema cálido */}
        <div className="lg:col-span-7 bg-[#EAE5DC] px-8 py-16 md:px-16 md:py-20 flex flex-col justify-center">
          <Reveal className="max-w-xl space-y-5">
            <h2 className="text-xl font-medium lowercase tracking-tight text-[#1A1A1A]">
              trabajar en cafe.te
            </h2>
            <p className="text-sm md:text-[15px] leading-relaxed text-neutral-700 font-light">
              Integramos tres espacios de trabajo privados a nuestro café de especialidad y
              showroom de diseño. La propuesta es simple: reservás la oficina por el día y{' '}
              <strong className="font-medium text-black">
                el 100% del valor del alquiler queda a favor de tu equipo en consumición
              </strong>{' '}
              de cafetería, pastelería artesanal y almuerzos durante toda la jornada.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 font-light">
              Sin membresías fijas ni contratos mensuales: elegís el espacio según el tamaño de tu
              reunión, reservás la fecha y nosotros nos ocupamos de todo lo demás.
            </p>
          </Reveal>
        </div>

        {/* Derecha: Fondo verde oliva */}
        <div
          id="horarios"
          className="lg:col-span-5 bg-[#6A7053] text-white px-8 py-16 md:px-14 md:py-20 flex flex-col justify-center items-start"
        >
          <Reveal delay={150} className="space-y-6 max-w-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/75 mb-1">
                disponibilidad
              </p>
              <p className="text-lg font-normal lowercase">lunes a viernes</p>
              <p className="text-sm text-white/90 font-light">9:00 a 20:00 hs.</p>
            </div>

            <div>
              <p className="text-lg font-normal lowercase">sábados</p>
              <p className="text-sm text-white/90 font-light">10:30 a 20:00 hs.</p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hola! Quisiera recibir el menú y consultar disponibilidad de oficinas.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white rounded-full px-7 py-2.5 text-xs lowercase tracking-wider hover:bg-white hover:text-[#6A7053] active:scale-95 transition-all duration-300"
              >
                consultar disponibilidad
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detalle individual de cada una de las 3 oficinas */}
      <section id="espacios" className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        <Reveal className="text-center max-w-lg mx-auto">
          <h2 className="text-lg font-medium lowercase tracking-wide">nuestros espacios</h2>
          <p className="text-xs text-neutral-500 mt-1 lowercase">
            elegí la oficina según la cantidad de personas y reservá directo por whatsapp
          </p>
        </Reveal>

        {OFFICES.map((office, index) => {
          const isReversed = index % 2 === 1;
          return (
            <Reveal key={office.id}>
              <article
                id={office.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-24"
              >
                {/* Foto con zoom sutil al hover */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="group aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={office.image}
                      alt={office.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                    />
                  </div>
                </div>

                {/* Ficha técnica y reserva */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#6A7053] font-medium">
                      <span>espacio {office.number}</span>
                      <span>•</span>
                      <span>{office.capacity}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-normal lowercase text-[#1A1A1A]">
                      {office.name}
                    </h3>
                    <p className="text-xs text-neutral-500 lowercase">{office.subtitle}</p>
                  </div>

                  {/* Precio + Badge consumición */}
                  <div className="bg-[#EAE5DC]/70 px-5 py-4 flex flex-wrap items-baseline justify-between gap-2 transition-colors hover:bg-[#EAE5DC]">
                    <div>
                      <span className="text-xl font-medium text-[#1A1A1A]">{office.price}</span>
                    </div>
                    <span className="text-xs font-medium text-[#6A7053] lowercase">
                      ✓ {office.priceNote}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-600 font-light">
                    {office.description}
                  </p>

                  {/* Equipamiento */}
                  <ul className="space-y-2 border-t border-neutral-200 pt-4">
                    {office.amenities.map((item) => (
                      <li
                        key={item}
                        className="text-xs md:text-sm text-neutral-700 font-light flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6A7053]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selector de fecha opcional + Botón píldora WhatsApp */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="date"
                      value={selectedDates[office.id] || ''}
                      onChange={(e) =>
                        setSelectedDates((prev) => ({ ...prev, [office.id]: e.target.value }))
                      }
                      className="border border-neutral-300 rounded-full px-4 py-2.5 text-xs text-neutral-700 focus:outline-none focus:border-[#6A7053] transition-colors"
                    />

                    <a
                      href={buildWhatsAppLink(office)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center bg-[#6A7053] hover:bg-[#585d44] active:scale-95 text-white rounded-full px-7 py-2.5 text-xs lowercase tracking-wider transition-all duration-300"
                    >
                      reservar {office.name}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      {/* Footer oscuro idéntico a estudio.te (#2C2C2C) */}
      <footer className="bg-[#2C2C2C] text-neutral-300 text-xs font-light">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <p className="text-white font-medium lowercase">contacto</p>
            <p className="text-neutral-400">info@estudiote.com.ar</p>
            <p className="text-neutral-400">whatsapp: +54 11 7365-4504</p>
            <div className="pt-2 flex gap-4 text-white">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                instagram
              </a>
            </div>
          </div>

          <div className="space-y-2 lowercase">
            <p className="text-white font-medium mb-3">espacios</p>
            <p>
              <a href="#oficina-01" className="hover:text-white transition-colors">
                oficina 01 (4 personas)
              </a>
            </p>
            <p>
              <a href="#oficina-02" className="hover:text-white transition-colors">
                oficina 02 (8 personas)
              </a>
            </p>
            <p>
              <a href="#entrepiso" className="hover:text-white transition-colors">
                entrepiso (15 personas)
              </a>
            </p>
          </div>

          <div className="space-y-2 lowercase">
            <p className="text-white font-medium mb-3">cafe.te</p>
            <p className="text-neutral-400">lunes a viernes de 9 a 20 hs</p>
            <p className="text-neutral-400">sábados de 10:30 a 20 hs</p>
          </div>

          <div className="space-y-2 lowercase">
            <p className="text-white font-medium mb-3">reservas</p>
            <p className="text-neutral-400">alquiler por jornada completa</p>
            <p className="text-neutral-400">100% acreditable en consumición</p>
          </div>
        </div>

        <div className="border-t border-neutral-700/70">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-neutral-400">
            <span className="text-white font-medium text-sm">estudio.te</span>
            <span>
              cafe.te • desarrollado por{' '}
              <a
                href="https://portfolio-igna-campos.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-white underline underline-offset-4 transition-colors"
              >
                Ignacio Campos.
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
