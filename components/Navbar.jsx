'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import config from '../lib/config';

const services = config.services;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';
  const isNashville = pathname?.startsWith('/nashville');
  const isBoise = pathname?.startsWith('/boise');
  const isLocationHub = (isNashville && pathname === '/nashville') || (isBoise && pathname === '/boise');
  const isTransparent = (isHomepage || isLocationHub) && !scrolled;

  const locationSlug = isNashville ? 'nashville' : isBoise ? 'boise' : null;
  const location = locationSlug ? config.locations[locationSlug] : null;
  const locationPrefix = locationSlug ? `/${locationSlug}` : '';
  const serviceAreas = location?.serviceAreas || [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        isTransparent ? 'bg-transparent py-3' : 'bg-primary shadow-lg py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[70px]">
          {/* Logo */}
          <Link href="/" className="relative z-[110] flex items-center transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Stellar Roofing Logo"
              width={180}
              height={60}
              className="w-auto h-[60px]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {isHomepage ? (
              // Homepage: show both location links
              <>
                <Link href="/nashville" className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors text-base font-semibold">
                  <MapPin size={15} /> Nashville, TN
                </Link>
                <Link href="/boise" className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors text-base font-semibold">
                  <MapPin size={15} /> Boise, ID
                </Link>
                <Link href="/about" className="text-white hover:text-white/80 transition-colors text-base font-semibold">About</Link>
                <Link href="/contact" className="text-white hover:text-white/80 transition-colors text-base font-semibold">Contact</Link>
              </>
            ) : locationSlug ? (
              // Location section: show location-specific nav
              <>
                <Link href={locationPrefix} className="text-white hover:text-white/80 transition-colors text-base font-semibold">Home</Link>

                <div className="relative group">
                  <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-base font-semibold py-4">
                    Services <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl py-3 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-[120]">
                    {services.map(s => (
                      <Link key={s.slug} href={`${locationPrefix}/services/${s.slug}`} className="block px-6 py-2.5 text-primary hover:bg-bg-alt transition-colors text-sm font-bold">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-base font-semibold py-4">
                    Service Areas <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl py-3 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-[120]">
                    {serviceAreas.map(a => (
                      <Link key={a.slug} href={`${locationPrefix}/service-areas/${a.slug}`} className="block px-6 py-2.5 text-primary hover:bg-bg-alt transition-colors text-sm font-bold">
                        {a.city}, {a.state}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/about" className="text-white hover:text-white/80 transition-colors text-base font-semibold">About</Link>
                <Link href="/contact" className="text-white hover:text-white/80 transition-colors text-base font-semibold">Contact</Link>
              </>
            ) : (
              // Other pages (about, contact, etc.): generic nav
              <>
                <Link href="/" className="text-white hover:text-white/80 transition-colors text-base font-semibold">Home</Link>
                <Link href="/nashville" className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-base font-semibold">Nashville</Link>
                <Link href="/boise" className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-base font-semibold">Boise</Link>
                <Link href="/about" className="text-white hover:text-white/80 transition-colors text-base font-semibold">About</Link>
                <Link href="/contact" className="text-white hover:text-white/80 transition-colors text-base font-semibold">Contact</Link>
              </>
            )}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {location ? (
              // Location section — show that location's phone
              <>
                <span className="flex items-center gap-1 text-white/60 text-xs font-semibold uppercase tracking-wider">
                  <MapPin size={12} /> {location.city}, {location.state}
                </span>
                <a href={`tel:${location.phoneRaw}`} className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-base font-bold">
                  <Phone size={18} fill="currentColor" />
                  {location.phone}
                </a>
              </>
            ) : (
              // Generic pages — show both location numbers, no Nashville default
              <div className="flex items-center gap-4">
                <a href={`tel:${config.locations.nashville.phoneRaw}`} className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-semibold">
                  <Phone size={14} fill="currentColor" />
                  Nashville
                </a>
                <span className="text-white/30">|</span>
                <a href={`tel:${config.locations.boise.phoneRaw}`} className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-semibold">
                  <Phone size={14} fill="currentColor" />
                  Boise
                </a>
              </div>
            )}
            <Link
              href="/free-inspection"
              className={`font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap ${
                scrolled ? 'bg-white text-primary hover:bg-white/90 shadow-md' : 'bg-white text-primary hover:bg-white/90 shadow-xl'
              }`}
            >
              Get Free Estimate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-[110] p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-primary z-[105] transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 overflow-y-auto pb-10">

          {isHomepage ? (
            <>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Choose Your Location</p>
              <Link href="/nashville" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><MapPin size={20} /> Nashville, TN</Link>
              <Link href="/boise" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-8 flex items-center gap-2"><MapPin size={20} /> Boise, ID</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-6">About Us</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-8">Contact</Link>
            </>
          ) : (
            <>
              <Link href={locationPrefix || '/'} onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-6">Home</Link>

              {locationSlug && (
                <>
                  <div className="mb-6">
                    <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
                      Services <ChevronDown size={16} className={servicesOpen ? 'rotate-180' : ''} />
                    </button>
                    <div className={`grid grid-cols-1 gap-4 transition-all duration-300 overflow-hidden ${servicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {services.map(s => (
                        <Link key={s.slug} href={`${locationPrefix}/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white pl-4 border-l-2 border-white/20 py-1">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <button onClick={() => setAreasOpen(!areasOpen)} className="flex items-center justify-between w-full text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
                      Service Areas <ChevronDown size={16} className={areasOpen ? 'rotate-180' : ''} />
                    </button>
                    <div className={`grid grid-cols-1 gap-4 transition-all duration-300 overflow-hidden ${areasOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {serviceAreas.map(a => (
                        <Link key={a.slug} href={`${locationPrefix}/service-areas/${a.slug}`} onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white pl-4 border-l-2 border-white/20 py-1">
                          {a.city}, {a.state}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Link href="/about" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-6">About Us</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white mb-8">Contact</Link>
            </>
          )}

          <div className="mt-auto flex flex-col gap-4">
            {location ? (
              // Location pages — show that location's phone
              <a href={`tel:${location.phoneRaw}`} className="flex items-center justify-center gap-3 bg-white/10 text-white font-bold py-4 rounded-xl text-xl">
                <Phone size={24} fill="currentColor" />
                {location.phone}
              </a>
            ) : (
              // Generic/homepage — show both phones side by side
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${config.locations.nashville.phoneRaw}`} className="flex flex-col items-center justify-center gap-1 bg-white/10 text-white font-bold py-4 rounded-xl">
                  <Phone size={18} fill="currentColor" />
                  <span className="text-sm">Nashville</span>
                </a>
                <a href={`tel:${config.locations.boise.phoneRaw}`} className="flex flex-col items-center justify-center gap-1 bg-white/10 text-white font-bold py-4 rounded-xl">
                  <Phone size={18} fill="currentColor" />
                  <span className="text-sm">Boise</span>
                </a>
              </div>
            )}
            <Link href="/free-inspection" onClick={() => setMobileOpen(false)} className="bg-white text-primary font-bold py-4 rounded-xl text-xl text-center shadow-lg">
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
