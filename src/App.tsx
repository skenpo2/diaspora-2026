import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Star,
  ChevronDown,
  MoveRight,
  Instagram,
  Linkedin,
  Users,
  MessageCircle,
} from 'lucide-react';

// --- TYPES ---
interface Speaker {
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  packageType?: string;
  message?: string;
}

// --- COMPONENTS ---

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
    style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
    }}
  />
);

const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  packageType?: string;
}> = ({ isOpen, onClose, packageType = 'standard' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    packageType: packageType,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        packageType: 'standard',
        message: '',
      });
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#FDFBF7] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-[#C05621] transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <span className="text-[#C05621] uppercase tracking-[0.2em] text-xs font-bold block mb-4">
                  Reserve Your Place
                </span>
                <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#1A365D] mb-4">
                  Begin Your Journey
                </h2>
                <p className="font-['Proza_Libre'] text-slate-600">
                  Complete the form below. Our team or VOYA concierge will reach
                  out within 24 hours to finalize your reservation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-['Proza_Libre'] text-sm uppercase tracking-widest text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#C05621] focus:outline-none transition-colors bg-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-['Proza_Libre'] text-sm uppercase tracking-widest text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#C05621] focus:outline-none transition-colors bg-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-['Proza_Libre'] text-sm uppercase tracking-widest text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#C05621] focus:outline-none transition-colors bg-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block font-['Proza_Libre'] text-sm uppercase tracking-widest text-slate-700 mb-2">
                    Track Selection *
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#C05621] focus:outline-none transition-colors bg-white"
                  >
                    <option value="standard">The Salon Pass - $2,495</option>
                    <option value="prestige">L'Hiver Prestige - $3,995</option>
                    <option value="fellowship">
                      Student Fellowship (Credit/Sponsorship)
                    </option>
                    <option value="invited">Invited Guest Concierge</option>
                  </select>
                </div>

                <div>
                  <label className="block font-['Proza_Libre'] text-sm uppercase tracking-widest text-slate-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#C05621] focus:outline-none transition-colors bg-white resize-none"
                    placeholder="University affiliation, dietary requirements, or accessibility needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C05621] text-[#FDFBF7] uppercase tracking-widest text-sm font-bold hover:bg-[#A04519] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Submit Request'}
                </button>

                <p className="text-xs text-slate-500 text-center font-['Proza_Libre']">
                  Official travel & hospitality provided by VOYA.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#C05621] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#1A365D] mb-3">
                Request Received
              </h3>
              <p className="font-['Proza_Libre'] text-slate-600">
                Our concierge will contact you shortly to finalize your journey
                to Marrakech.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Mission', href: '#about', isExternal: false },
    { label: 'Speakers', href: '#speakers', isExternal: false },
    {
      label: 'Itinerary',
      href: 'https://www.thediasporasalon.com/itinerary',
      isExternal: true,
    },
    { label: 'Packages', href: '#packages', isExternal: false },
    { label: 'FAQ', href: '#faq', isExternal: false },
  ];

  return (
    <>
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
                THE DIASPORA SALON
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
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : '_self'}
                  rel={item.isExternal ? 'noopener noreferrer' : ''}
                  className={`font-['Proza_Libre'] text-xs tracking-widest uppercase hover:opacity-70 transition-all ${
                    isScrolled ? 'text-slate-800' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setShowBooking(true)}
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
                key={item.label}
                href={item.href}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : ''}
                onClick={() => setIsOpen(false)}
                className="font-['Cormorant_Garamond'] text-4xl italic hover:text-[#C05621] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setShowBooking(true);
              }}
              className="mt-8 px-12 py-4 border border-white text-white hover:bg-white hover:text-[#1A365D] transition-all uppercase tracking-widest text-sm"
            >
              Reserve
            </button>
          </div>
        )}
      </nav>
      {showBooking && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

const Hero: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              Limited Capacity • Curated Community
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8 font-extrabold">
            The Diaspora Salon
            <br />
            <span className="italic font-light text-[#e3d9c6] text-4xl md:text-6xl">
              Marrakech 2026
            </span>
          </h1>

          <p className="font-['Proza_Libre'] text-lg md:text-2xl text-white  max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            A four-day cultural and intellectual gathering of Black diaspora
            writers, thinkers, entrepreneurs, and cultural leaders—set in the
            magic of Marrakech.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[#FDFBF7] mb-16 font-['Proza_Libre'] text-sm tracking-widest">
            <div className="flex items-center gap-3">
              <Calendar
                className="text-[#C05621]"
                size={18}
                strokeWidth={1.5}
              />
              <span>FEB 7–12, 2026</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#C05621]" size={18} strokeWidth={1.5} />
              <span>MARRAKECH, MOROCCO</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => setShowBooking(true)}
              className="group relative px-10 py-5 bg-[#C05621] text-[#FDFBF7] overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(192,86,33,0.5)]"
            >
              <span className="relative z-10 font-['Proza_Libre'] text-sm tracking-[0.2em] uppercase flex items-center gap-4">
                Reserve{' '}
                <MoveRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#A04519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
            <a
              href="https://www.thediasporasalon.com/itinerary"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 border border-[#FDFBF7]/30 hover:bg-[#FDFBF7] hover:text-[#1A365D] transition-all text-[#FDFBF7] font-['Proza_Libre'] text-sm tracking-[0.2em] uppercase text-center"
            >
              Itinerary
            </a>
          </div>

          <p className="mt-8 text-xs text-white/40 font-['Proza_Libre'] tracking-widest">
            OFFICIAL TRAVEL + HOSPITALITY PARTNER:{' '}
            <span className="text-[#C05621]">VOYA</span>
          </p>
        </div>
      </section>
      {showBooking && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-32 bg-[#FDFBF7] text-[#2D3748] overflow-hidden relative"
    >
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
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1A365D] rounded-full mix-blend-multiply opacity-80 z-0"></div>
            <div className="absolute top-20 -right-10 w-20 h-20 border border-[#C05621] rounded-full z-20"></div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#C05621]"></span>
              <span className="text-[#C05621] uppercase tracking-[0.2em] text-xs font-bold">
                The Mission
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl text-[#1A365D] mb-8 leading-tight">
              What is <br />
              <span className="italic text-[#C05621]">The Diaspora Salon?</span>
            </h2>
            <p className="font-['Proza_Libre'] text-lg leading-relaxed mb-6 text-slate-600">
              The Diaspora Salon is an intimate convening that brings together
              writers, artists, academics, founders, diplomats, entrepreneurs,
              tech champions, and cultural leaders across the Black diaspora for
              conversation, performance, and connection anchored in ideas,
              craft, and community.
            </p>
            <p className="font-['Proza_Libre'] text-lg leading-relaxed mb-10 text-slate-600">
              Expect salons, panels, private dinners, curated cultural moments,
              and unforgettable nights that blend intellectual depth with beauty
              and belonging.
            </p>

            <div className="border-l-4 border-[#C05621] pl-6 py-2 mb-8 bg-[#EADDCD]/20">
              <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#1A365D]">
                "Marrakech is a timeless crossroads where cultures have met,
                mingled, and flourished."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience: React.FC = () => {
  const images = [
    {
      // The Riad Pool (Verified Working)

      url: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200',

      alt: 'The Sanctuary',
    },

    {
      // The Hero Image Source (100% Safe - Red City Architecture)

      url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800',

      alt: 'Red City Architecture',
    },

    {
      // Warm Lanterns (Verified Working)

      url: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?auto=format&fit=crop&q=80&w=800',

      alt: 'Evening Salon',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2D3748] mb-6">
            The Marrakech Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl font-['Proza_Libre'] leading-relaxed">
            The Diaspora Salon is not a conference —it is a living laboratory of
            ideas and connections, shared in beautiful gardens and over
            glamorous dinners.
          </p>
        </div>

        {/* Responsive Grid - FIXED OVERLAP by removing fixed height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Image */}
          <div className="relative overflow-hidden group rounded-sm h-[400px] lg:col-span-2">
            <div className="absolute inset-0 bg-[#1A365D]/10 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[#FDFBF7] text-[10px] font-['Proza_Libre'] tracking-[0.2em] uppercase bg-black/30 backdrop-blur-md px-3 py-1">
                {images[0].alt}
              </span>
            </div>
          </div>

          {/* Stacked Images */}
          <div className="flex flex-col gap-6 h-[400px]">
            {images.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group rounded-sm h-1/2"
              >
                <div className="absolute inset-0 bg-[#1A365D]/10 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[#FDFBF7] text-[10px] font-['Proza_Libre'] tracking-[0.2em] uppercase bg-black/30 backdrop-blur-md px-3 py-1">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Speakers: React.FC = () => {
  const speakers: Speaker[] = [
    {
      name: 'Dr. Edda L. Fields-Black',
      title: 'Historian • Pulitzer Prize Winner (2025)',
      bio: 'A historian who brings hidden histories into full view, reshaping the understanding of Black resistance, community and freedom in the United States. Author of "Combee: Harriet Tubman, the Combahee River Raid, and Black Freedom During the Civil War."',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/df40981f-eb26-4594-84c3-6a212d6e9e69/Edda+Fields.png?format=1000w',
    },
    {
      name: 'Heather McGhee',
      title: 'Author & Policy Advocate',
      bio: 'Explores how racism and economic inequality are interconnected. A New York Times bestselling author of "The Sum of Us", she previously served as President of Demos and now chairs the board of Color of Change.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/9ff4f94c-a6cb-4ee9-9d8f-9ccb2141651e/Heather-Mcghee-01-1024x1536.jpg?format=1000w',
    },
    {
      name: 'Mohamed Mbougar Sarr',
      title: 'Novelist • Prix Goncourt Winner',
      bio: 'A Senegalese novelist whose writing blends philosophical reflection with lyrical storytelling. Winner of the Prix Goncourt for "La plus secrète mémoire des hommes", earning international acclaim for ambition and emotional insight.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/178b5680-3756-4620-bf75-54bd6b97c328/Mohamed+Mbougar+Sarr.jpg?format=1500w',
    },
    {
      name: 'Bryan Lattimore',
      title: 'Cultural Strategist & Serial Entrepreneur',
      bio: 'Builds products and advises organizations at the intersection of culture and innovation. Co-Founder of Utility and General Partner at Wynne Studios. He focuses on how design and social influence can help us remember the future.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/65447ec8-1af3-4d6c-8542-87072b6792e2/brian+l.jpeg?format=1000w',
    },
    {
      name: 'Bernardine Evaristo',
      title: 'Novelist • Booker Prize Winner',
      bio: 'An award-winning novelist whose work celebrates the breadth and complexity of Black British life. She is the first Black woman to win the Booker Prize for "Girl, Woman, Other", and serves as President of the Royal Society of Literature.',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/cb0fbdcf-53f0-4b0e-a10c-82648ce24e4f/bernardine-evaristo-2023.jpg?format=2500w',
    },
    {
      name: 'Christy Pichichero',
      title: 'Historian • Associate Professor',
      bio: 'Examines race, culture, slavery and colonialism in 18th and 19th century Europe, bringing new understanding to contemporary debates on identity and power. Author of "The Military Enlightenment".',
      image:
        'https://images.squarespace-cdn.com/content/v1/67576a2e95a26e32ebd526b2/5016c778-b37a-4659-a5ce-9686f940dff6/Christy+Pichichero+.jpg?format=1000w',
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
            Meet our Speakers
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {speakers.map((speaker, index) => (
            <div key={index} className="group relative">
              <div className="aspect-[3/4] overflow-hidden mb-6 relative shadow-xl">
                <div className="absolute inset-0 bg-[#C05621]/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
              <div className="border-l-2 border-[#C05621] pl-6 transition-all duration-300 group-hover:pl-8">
                <h3 className="font-['Cormorant_Garamond'] text-2xl mb-2">
                  {speaker.name}
                </h3>
                <p className="font-['Proza_Libre'] text-[#C05621] text-xs uppercase tracking-widest mb-3 font-bold">
                  {speaker.title}
                </p>
                <p className="font-['Proza_Libre'] text-sm leading-relaxed opacity-80 line-clamp-4 group-hover:line-clamp-none transition-all">
                  {speaker.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://www.thediasporasalon.com/speakers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-[#FDFBF7]/30 hover:bg-[#FDFBF7] hover:text-[#1A365D] transition-all uppercase tracking-widest text-xs"
          >
            View All Speakers
          </a>
        </div>
      </div>
    </section>
  );
};

const Packages: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const handleBooking = (packageType: string) => {
    setSelectedPackage(packageType);
    setShowBooking(true);
  };

  return (
    <>
      <section id="packages" className="py-32 bg-[#EADDCD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C05621] uppercase tracking-[0.2em] text-xs font-bold block mb-4">
              The Journey
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl text-[#2D3748] mb-6">
              Three Ways to Participate
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto font-['Proza_Libre']">
              Whether you are a student seeking mentorship, a cultural
              enthusiast, or an invited diplomat, there is a path for you to
              join the circle.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* 1. STUDENT TRACK */}
            <div className="bg-[#FDFBF7] p-8 border-t-4 border-blue-900 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-blue-900" />
                <span className="font-['Proza_Libre'] uppercase tracking-widest text-xs font-bold text-blue-900">
                  Student Track
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#2D3748] mb-4">
                Fellowship & Credit
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                We believe students should have access to global cultural
                experiences that deepen academic work. Earn course credit or get
                sponsorship support.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-600">
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-blue-900 rounded-full mt-2" />{' '}
                  Credit-bearing opportunity
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-blue-900 rounded-full mt-2" />{' '}
                  University program support
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-blue-900 rounded-full mt-2" />{' '}
                  Faculty liaison assistance
                </li>
              </ul>
              <button
                onClick={() => handleBooking('fellowship')}
                className="w-full py-3 bg-blue-900/10 text-blue-900 uppercase tracking-widest text-xs font-bold hover:bg-blue-900 hover:text-white transition-colors"
              >
                Student Inquiry
              </button>
            </div>

            {/* 2. ATTENDEE TRACK (Middle - Highlighted) */}
            <div className="bg-[#FDFBF7] p-0 shadow-2xl relative transform md:-translate-y-4">
              <div className="bg-[#C05621] text-white text-center py-2 text-xs uppercase tracking-widest font-bold">
                Limited Capacity
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={18} className="text-[#C05621]" />
                  <span className="font-['Proza_Libre'] uppercase tracking-widest text-xs font-bold text-[#C05621]">
                    Attendee Track
                  </span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl text-[#2D3748] mb-6">
                  General Admission
                </h3>

                {/* Sub-Card 1 */}
                <div className="mb-6 p-4 border border-[#EADDCD] bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-bold text-slate-800">Salon Standard</h4>
                    <span className="font-['Cormorant_Garamond'] text-xl">
                      $2,495
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Full programming access + Accommodation
                  </p>
                  <a
                    href="https://buy.stripe.com/bJe7sEf67cgfcde6zHejK0g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-2 bg-[#2D3748] text-white text-xs uppercase tracking-widest hover:opacity-90 transition-colors"
                  >
                    Reserve
                  </a>
                </div>

                {/* Sub-Card 2 */}
                <div className="p-4 border border-[#C05621] bg-[#C05621]/5 relative overflow-hidden">
                  <div className="flex justify-between items-baseline mb-2 relative z-10">
                    <h4 className="font-bold text-[#C05621]">Salon Premium</h4>
                    <span className="font-['Cormorant_Garamond'] text-xl">
                      $3,995
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 relative z-10">
                    Everything in Salon Standard + Premium Accommodation + VIP
                    Dinner + Penthouse After Party
                  </p>
                  <a
                    href="https://buy.stripe.com/bJe7sEf67cgfcde6zHejK0g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-2 bg-[#C05621] text-white text-xs uppercase tracking-widest hover:bg-[#A04519] relative z-10 transition-colors"
                  >
                    Reserve
                  </a>
                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                  Packages do not include flights
                </p>
              </div>
            </div>

            {/* 3. INVITED GUEST */}
            <div className="bg-[#1A365D] p-8 border-t-4 border-[#C05621] shadow-md text-white">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={18} className="text-[#C05621]" />
                <span className="font-['Proza_Libre'] uppercase tracking-widest text-xs font-bold text-[#C05621]">
                  Invited Guest
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-3xl text-white mb-4">
                Concierge Access
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Certain guests—speakers, diplomats, and special
                invitees—participate by invitation. Direct concierge
                coordination available.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-[#C05621] rounded-full mt-2" />{' '}
                  Personal invitation required
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-[#C05621] rounded-full mt-2" />{' '}
                  White-glove concierge
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 bg-[#C05621] rounded-full mt-2" />{' '}
                  Custom itinerary support
                </li>
              </ul>
              <a
                href="https://wa.me/message/WONLUWXIIA6ZJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 text-center bg-transparent border border-[#C05621] text-[#C05621] uppercase tracking-widest text-xs font-bold hover:bg-[#C05621] hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      {showBooking && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          packageType={selectedPackage}
        />
      )}
    </>
  );
};

const Itinerary: React.FC = () => {
  const days = [
    {
      day: 'Day 0',
      title: 'Arrival + Welcome Gathering',
      desc: 'Arrivals, airport welcome, hotel check-in, and an intimate Voya welcome dinner to meet fellow guests and set the tone',
    },
    {
      day: 'Day 1',
      title: 'Salons Grand Opening',
      desc: 'Curated Souk + Market Tour, Opening conversations, evening reception, and dinner under the stars.',
    },
    {
      day: 'Day 2',
      title: 'Intimate Immersion',
      desc: 'Panels, author conversations, writing and culture salons, and curated Marrakech experiences.',
    },
    {
      day: 'Day 3',
      title: 'Connections + Conversations',
      desc: 'Feature sessions with thought leaders, performances, shared meals, and reflective dialogue.',
    },
    {
      day: 'Day 4',
      title: 'Salon Finale',
      desc: 'Closing reflections, final sessions, and farewell dinner.',
    },
    {
      day: 'Day 5',
      title: 'VOYA Desert Experience + Closing Celebration',
      desc: 'A curated desert escape featuring ATVs, camel rides, wellness time, and a multi-course VOYA closing celebration beneath the night sky.',
    },
  ];

  return (
    <section className="py-24 bg-[#1A365D] text-[#FDFBF7] relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C05621]/30 hidden md:block"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-['Cormorant_Garamond'] text-4xl text-[#FDFBF7]">
            Sample Itinerary
          </h2>
          <p className="text-[#C05621] font-['Proza_Libre'] tracking-widest text-sm mt-2">
            FEB 7–12, 2026
          </p>
        </div>

        <div className="space-y-12">
          {days.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-8 items-center md:items-start group"
            >
              <div className="md:w-1/2 md:text-right">
                <span className="font-['Proza_Libre'] text-[#C05621] text-xs uppercase tracking-widest font-bold">
                  {item.day}
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-2xl mt-1">
                  {item.title}
                </h3>
              </div>
              <div className="hidden md:flex flex-col items-center">
                <div className="w-3 h-3 bg-[#C05621] rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="md:w-1/2">
                <p className="text-slate-300 font-['Proza_Libre'] text-sm leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.thediasporasalon.com/itinerary"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b border-[#C05621] text-[#C05621] font-['Proza_Libre'] uppercase tracking-widest text-xs pb-1 hover:text-white hover:border-white transition-colors"
          >
            View Full Itinerary Details
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'Is this open to everyone?',
      answer:
        'The Diaspora Salon is curated and intimate. We welcome attendees across the diaspora who are committed to intellectual exchange, cultural work, and community. Certain tracks require application or invitation.',
    },
    {
      question: 'Can students receive credit?',
      answer:
        'Yes! If your university is participating, you may earn course credit. If not, VOYA can help coordinate with your institution. We provide program briefs and faculty liaison support.',
    },
    {
      question: 'Do you help with visas?',
      answer:
        "Yes. VOYA provides visa support letters and guidance. Most visitors can obtain a visa on arrival in Morocco, but we'll help confirm requirements based on your passport.",
    },
    {
      question: 'Are flights included?',
      answer:
        'Flights are not included in package pricing, but VOYA can assist with booking at preferred rates and coordinating group travel.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        'Deposits are non-refundable. Full payments can be refunded up to 60 days before the event with a 10% processing fee. Within 60 days, credits may be issued for future events.',
    },
    {
      question: 'Can I pay in installments?',
      answer:
        'Yes! We offer payment plans via Stripe. Pay a deposit now and complete payment over 3-4 months before the event.',
    },
  ];

  return (
    <section id="faq" className="py-32 bg-[#FDFBF7] max-w-3xl mx-auto px-6">
      <h2 className="font-['Cormorant_Garamond'] text-4xl text-[#2D3748] mb-12 text-center">
        Frequently Asked Questions
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
            THE DIASPORA SALON
          </h2>
          <p className="font-['Proza_Libre'] text-sm text-slate-400 max-w-md leading-relaxed mb-8">
            A curated gathering where culture, intellect, and heritage converge.
          </p>

          {/* VOYA PARTNERSHIP SHOWCASE */}
          <div className="mb-10 p-6 border border-white/10 bg-white/5 rounded-sm max-w-sm">
            <span className="text-[#C05621] uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">
              Powered By
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-white mb-2">
              VOYA
            </h3>
            <p className="text-xs text-slate-400 font-['Proza_Libre'] leading-relaxed">
              Official travel, logistics, and hospitality partner. Ensuring a
              seamless journey from arrival to departure.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/thediasporasalon"
              className="w-10 h-10 bg-[#C05621] flex items-center justify-center rounded-full hover:bg-white hover:text-[#C05621] transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/voya-app"
              className="w-10 h-10 bg-[#C05621] flex items-center justify-center rounded-full hover:bg-white hover:text-[#C05621] transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-[#C05621]">
            Curated
          </h4>
          <ul className="space-y-4 font-['Cormorant_Garamond'] text-lg text-slate-300">
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                The Mission
              </a>
            </li>
            <li>
              <a
                href="#speakers"
                className="hover:text-white transition-colors"
              >
                Speakers
              </a>
            </li>
            <li>
              <a
                href="https://www.thediasporasalon.com/itinerary"
                className="hover:text-white transition-colors"
              >
                The Itinerary
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-[#C05621]">
            Contact
          </h4>
          <ul className="space-y-4 font-['Cormorant_Garamond'] text-lg text-slate-300">
            <li>partnerships@voyaapp.co</li>
            <li>+1-(579)-790-0165</li>
            <li className="pt-4 text-xs font-sans text-slate-500">
              © 2026 The Diaspora Salon. <br />
              All rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Proza+Libre:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen selection:bg-[#C05621] selection:text-white font-sans">
      <NoiseOverlay />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Speakers />
      <Packages />
      <Itinerary />
      <FAQ />
      <Footer />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent md:hidden z-40">
        <button className="w-full bg-[#C05621] text-white py-4 uppercase tracking-widest font-bold shadow-2xl">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default App;
