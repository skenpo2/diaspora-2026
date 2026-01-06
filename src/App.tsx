import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  ChevronDown,
  MoveRight,
} from 'lucide-react';

// --- THEME CONFIGURATION ---
// In a real app, these would be in tailwind.config.js
// We are using arbitrary values in the code to simulate this:
// Primary: #C05621 (Terracotta)
// Secondary: #1A365D (Majorelle Blue)
// Background: #FDFBF7 (Warm Paper)
// Text: #2D3748 (Soft Charcoal)

// --- TYPES ---
interface Speaker {
  name: string;
  title: string;
  quote: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// --- COMPONENTS ---

// 1. GLOBAL TEXTURE OVERLAY
// This adds a subtle noise texture to the entire site to prevent the "flat digital" look
const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
    style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
    }}
  />
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Vision', href: '#about' },
    { label: 'Voices', href: '#speakers' },
    { label: 'Journey', href: '#packages' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 relative group cursor-pointer">
            <h1
              className={`text-2xl font-['Cormorant_Garamond'] font-semibold tracking-wide transition-colors ${
                isScrolled ? 'text-[#C05621]' : 'text-[#FDFBF7]'
              }`}
            >
              DIASPORA SALON
            </h1>
            <span
              className={`text-[10px] uppercase tracking-[0.2em] block ${
                isScrolled ? 'text-slate-600' : 'text-white/80'
              }`}
            >
              Marrakech MMXXVI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-['Proza_Libre'] text-sm tracking-widest uppercase hover:opacity-70 transition-all ${
                  isScrolled ? 'text-slate-800' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              className={`px-8 py-3 rounded-none text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                isScrolled
                  ? 'border-[#C05621] text-[#C05621] hover:bg-[#C05621] hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-[#C05621]'
              }`}
            >
              Reserve
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#1A365D] text-[#FDFBF7] flex flex-col justify-center items-center gap-8 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8"
          >
            <X size={32} />
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-['Cormorant_Garamond'] text-4xl italic"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#2b1810]" />
      <div className="absolute inset-0 opacity-60">
        <img
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2670&auto=format&fit=crop"
          alt="Moroccan Architecture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1810] via-transparent to-[#1A365D]/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        <div className="mb-8 animate-fade-in-up">
          <span className="inline-block py-1 px-3 border border-[#FDFBF7]/30 rounded-full text-[#FDFBF7]/80 text-[10px] uppercase tracking-[0.25em] backdrop-blur-sm">
            Est. 2026 • The Gathering
          </span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-6xl md:text-8xl lg:text-9xl text-[#FDFBF7] leading-[0.9] mb-8 font-light italic">
          Return to <br />
          <span className="not-italic font-normal">The Source</span>
        </h1>

        <p className="font-['Proza_Libre'] text-lg md:text-xl text-[#FDFBF7]/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Four days of intellectual alchemy, art, and ancestral connection in
          the heart of Marrakech.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[#FDFBF7] mb-16 font-['Proza_Libre'] text-sm tracking-widest">
          <div className="flex items-center gap-3">
            <Calendar className="text-[#C05621]" size={18} strokeWidth={1.5} />
            <span>FEB 8–11, 2026</span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <MapPin className="text-[#C05621]" size={18} strokeWidth={1.5} />
            <span>MARRAKECH, MOROCCO</span>
          </div>
        </div>

        <button className="group relative px-10 py-5 bg-[#C05621] text-[#FDFBF7] overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(192,86,33,0.5)]">
          <span className="relative z-10 font-['Proza_Libre'] text-sm tracking-[0.2em] uppercase flex items-center gap-4">
            Begin The Journey{' '}
            <MoveRight className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-[#A04519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
        </button>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-32 bg-[#FDFBF7] text-[#2D3748] overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EADDCD]/20 -skew-x-12 transform translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-t-[10rem] relative z-10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2574&auto=format&fit=crop"
                alt="Portrait of woman"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1A365D] rounded-full mix-blend-multiply opacity-80 z-0"></div>
            <div className="absolute top-20 -right-10 w-20 h-20 border border-[#C05621] rounded-full z-20"></div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#C05621]"></span>
              <span className="text-[#C05621] uppercase tracking-[0.2em] text-xs font-bold">
                The Essence
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl text-[#1A365D] mb-8 leading-tight">
              A Salon for the <br />
              <span className="italic text-[#C05621]">Global Soul</span>
            </h2>
            <p className="font-['Proza_Libre'] text-lg leading-relaxed mb-6 text-slate-600">
              This is not a conference. It is a return. Diaspora Salon brings
              together the brightest minds of the Black diaspora—writers,
              artists, diplomats, and founders—into the ancient, sun-washed
              courtyards of Marrakech.
            </p>
            <p className="font-['Proza_Libre'] text-lg leading-relaxed mb-10 text-slate-600">
              We replace convention centers with Riads, and slideshows with
              storytelling. Expect days filled with rigorous intellectual
              exchange and nights steeped in the magic of the Maghreb.
            </p>

            <a
              href="#itinerary"
              className="inline-flex items-center gap-2 text-[#1A365D] font-bold border-b border-[#1A365D] pb-1 hover:text-[#C05621] hover:border-[#C05621] transition-colors"
            >
              Discover the Experience <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Speakers: React.FC = () => {
  const speakers: Speaker[] = [
    {
      name: 'Dr. Aminata Johnson',
      title: 'Author & Historian',
      quote: 'Memory is the architecture of our future.',
      image:
        'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Marcus Williams',
      title: 'Visual Artist',
      quote: 'We paint the world we wish to inhabit.',
      image:
        'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=800&auto=format&fit=crop&q=60',
    },
    {
      name: 'Zara Thompson',
      title: 'Poet Laureate',
      quote: 'Language is the only border we truly cross.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <section
      id="speakers"
      className="py-32 bg-[#1A365D] text-[#FDFBF7] relative"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#C05621] uppercase tracking-[0.2em] text-xs font-bold block mb-4">
            The Voices
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl text-[#FDFBF7]">
            Curated Minds
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <div key={index} className="group relative cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-[#C05621]/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />
              </div>
              <div className="border-l-2 border-[#C05621] pl-6 transition-all duration-300 group-hover:pl-8">
                <h3 className="font-['Cormorant_Garamond'] text-3xl mb-1">
                  {speaker.name}
                </h3>
                <p className="font-['Proza_Libre'] text-[#C05621] text-xs uppercase tracking-widest mb-3">
                  {speaker.title}
                </p>
                <p className="font-['Cormorant_Garamond'] text-lg italic opacity-60">
                  "{speaker.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-4 border border-[#FDFBF7]/30 hover:bg-[#FDFBF7] hover:text-[#1A365D] transition-all uppercase tracking-widest text-xs">
            View All Speakers
          </button>
        </div>
      </div>
    </section>
  );
};

const Packages: React.FC = () => {
  return (
    <section id="packages" className="py-32 bg-[#EADDCD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-['Cormorant_Garamond'] text-5xl text-[#2D3748] mb-8 leading-tight">
              Define Your <br />{' '}
              <span className="text-[#C05621] italic">Participation</span>
            </h2>
            <p className="text-slate-700 mb-8 font-['Proza_Libre']">
              Whether you are a student seeking mentorship, a cultural
              enthusiast, or an invited diplomat, there is a path for you to
              join the circle.
            </p>
            <div className="p-8 bg-[#C05621] text-[#FDFBF7]">
              <h3 className="font-['Cormorant_Garamond'] text-2xl italic mb-2">
                Student Fellowships
              </h3>
              <p className="text-sm opacity-90 mb-6">
                Full credit-bearing tracks available with participating
                universities.
              </p>
              <button className="underline decoration-1 underline-offset-4 hover:opacity-80">
                Apply for Fellowship
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {/* Standard Pass */}
            <div className="bg-[#FDFBF7] p-10 shadow-xl transition-transform hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EADDCD] rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <h3 className="font-['Proza_Libre'] uppercase tracking-widest text-sm text-slate-500 mb-4">
                The Salon Pass
              </h3>
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#2D3748] mb-6">
                $2,495
              </div>
              <ul className="space-y-4 mb-10 font-['Proza_Libre'] text-slate-600 text-sm">
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#C05621]" /> Access to all
                  panels & salons
                </li>
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#C05621]" /> Welcome Dinner
                  at Agafay Desert
                </li>
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#C05621]" /> Daily curated
                  cultural excursions
                </li>
              </ul>
              <button className="w-full py-4 border border-[#2D3748] text-[#2D3748] uppercase tracking-widest text-xs hover:bg-[#2D3748] hover:text-[#FDFBF7] transition-colors">
                Secure Seat
              </button>
            </div>

            {/* Premium Pass */}
            <div className="bg-[#1A365D] text-[#FDFBF7] p-10 shadow-2xl relative overflow-hidden transform md:-mt-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C05621] to-[#D69E2E]"></div>
              <h3 className="font-['Proza_Libre'] uppercase tracking-widest text-sm text-[#C05621] mb-4">
                L'Hiver Prestige
              </h3>
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#FDFBF7] mb-6">
                $3,995
              </div>
              <ul className="space-y-4 mb-10 font-['Proza_Libre'] text-white/80 text-sm">
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#D69E2E]" /> All Salon Pass
                  inclusions
                </li>
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#D69E2E]" /> Private Riad
                  Accommodation (4 nights)
                </li>
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#D69E2E]" /> VIP Airport
                  Concierge & Transfer
                </li>
                <li className="flex items-center gap-3">
                  <Star size={14} className="text-[#D69E2E]" /> Intimate Speaker
                  Dinner
                </li>
              </ul>
              <button className="w-full py-4 bg-[#C05621] text-[#FDFBF7] uppercase tracking-widest text-xs hover:bg-[#D69E2E] transition-colors shadow-lg">
                Reserve Prestige
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VisualBreak: React.FC = () => {
  return (
    <section
      className="h-[60vh] relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1590059390246-81414e21d8b7?q=80&w=2515&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-[#FDFBF7] max-w-2xl px-6 backdrop-blur-sm py-12 border border-white/20">
          <p className="font-['Cormorant_Garamond'] text-3xl md:text-5xl italic leading-relaxed">
            "To return to Marrakech is to return to a conversation that started
            centuries ago."
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'Is accommodation included?',
      answer:
        "Accommodation is included exclusively in the L'Hiver Prestige package. For Standard Salon Pass holders, our partner VOYA provides curated hotel rates at 5-star properties nearby.",
    },
    {
      question: 'How do I apply for the Student Track?',
      answer:
        "We reserve 50 seats for university students. Please submit your academic credentials via the 'Student Fellowship' portal. Approvals are rolling.",
    },
    {
      question: 'What is the dress code?',
      answer:
        "Marrakech in February is mild. We suggest 'Desert Chic'—linens, layers, and earth tones. Evening events are formal traditional or creative black tie.",
    },
  ];

  return (
    <section id="faq" className="py-32 bg-[#FDFBF7] max-w-4xl mx-auto px-6">
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-[#2D3748] mb-12 text-center">
        Inquiries
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#E2E8F0]">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-6 flex justify-between items-center text-left hover:text-[#C05621] transition-colors"
            >
              <span className="font-['Proza_Libre'] text-lg text-[#2D3748]">
                {faq.question}
              </span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? 'max-h-40 opacity-100 mb-6'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <p className="font-['Cormorant_Garamond'] text-xl text-slate-600 pl-4 border-l-2 border-[#C05621]">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1f38] text-[#FDFBF7] py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-['Cormorant_Garamond'] text-3xl mb-6">
            DIASPORA SALON
          </h2>
          <p className="font-['Proza_Libre'] text-sm text-slate-400 max-w-md leading-relaxed mb-8">
            A curated gathering where culture, intellect, and heritage converge.
            Produced in partnership with VOYA Travel.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#C05621] flex items-center justify-center rounded-full hover:bg-white hover:text-[#C05621] transition-colors cursor-pointer">
              <span className="font-serif italic">Ig</span>
            </div>
            <div className="w-10 h-10 bg-[#C05621] flex items-center justify-center rounded-full hover:bg-white hover:text-[#C05621] transition-colors cursor-pointer">
              <span className="font-serif italic">Li</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-[#C05621]">
            Curated
          </h4>
          <ul className="space-y-4 font-['Cormorant_Garamond'] text-lg text-slate-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                The Vision
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                The Speakers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Marrakech Guide
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-[#C05621]">
            Contact
          </h4>
          <ul className="space-y-4 font-['Cormorant_Garamond'] text-lg text-slate-300">
            <li>concierge@diasporasalon.com</li>
            <li>+212 5 24 00 00 00</li>
            <li className="pt-4 text-xs font-sans text-slate-500">
              © 2026 Diaspora Salon. <br />
              All rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  // Add font injection for the demo
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Proza+Libre:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen selection:bg-[#C05621] selection:text-white">
      <NoiseOverlay />
      <Navigation />
      <Hero />
      <About />
      <VisualBreak />
      <Speakers />
      <Packages />
      <FAQ />
      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent md:hidden z-40">
        <button className="w-full bg-[#C05621] text-white py-4 uppercase tracking-widest font-bold shadow-2xl">
          Book Experience
        </button>
      </div>
    </div>
  );
};

export default App;
