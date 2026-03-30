'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import config from '../lib/config';

const services = config.services;
const mvpAreas = config.serviceAreas.mvp;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Stellar Roofing & Restorations Logo"
              width={200}
              height={200}
              className="max-h-[60px] w-auto"
              priority
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-white font-bold text-lg">Stellar Roofing</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-white/70 transition-colors text-base font-medium">Home</Link>

            {/* Services dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white hover:text-white/70 transition-colors text-base font-medium">
                Services <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {services.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2.5 text-sm text-text-dark hover:bg-primary hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Service Areas dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white hover:text-white/70 transition-colors text-base font-medium">
                Service Areas <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {mvpAreas.map(a => (
                  <Link key={a.slug} href={`/service-areas/${a.slug}`} className="block px-4 py-2.5 text-sm text-text-dark hover:bg-primary hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg">
                    {a.city}, {a.state}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-white hover:text-white/70 transition-colors text-base font-medium">About</Link>
            <Link href="/contact" className="text-white hover:text-white/70 transition-colors text-base font-medium">Contact</Link>
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-2 text-white hover:text-white/70 transition-colors text-base font-medium">
              <Phone size={17} />
              {config.business.phone}
            </a>
            <Link href="/free-inspection" className="bg-white hover:bg-white/90 text-primary font-semibold px-6 py-2.5 rounded-lg transition-colors text-base whitespace-nowrap">
              Get Free Estimate
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-light">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block text-white py-2 text-sm font-medium">Home</Link>

            <div>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full text-white py-2 text-sm font-medium">
                Services <ChevronDown size={14} className={servicesOpen ? 'rotate-180' : ''} />
              </button>
              {servicesOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {services.map(s => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="block text-white/80 py-1.5 text-sm hover:text-white">
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button onClick={() => setAreasOpen(!areasOpen)} className="flex items-center justify-between w-full text-white py-2 text-sm font-medium">
                Service Areas <ChevronDown size={14} className={areasOpen ? 'rotate-180' : ''} />
              </button>
              {areasOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {mvpAreas.map(a => (
                    <Link key={a.slug} href={`/service-areas/${a.slug}`} onClick={() => setMobileOpen(false)} className="block text-white/80 py-1.5 text-sm hover:text-white">
                      {a.city}, {a.state}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-white py-2 text-sm font-medium">About</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-white py-2 text-sm font-medium">Contact</Link>

            <div className="pt-4 pb-2 space-y-3 border-t border-primary-light">
              <a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-2 text-white text-sm font-medium">
                <Phone size={16} />
                {config.business.phone}
              </a>
              <Link href="/free-inspection" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-white hover:bg-white/90 text-primary font-semibold px-4 py-3 rounded-lg transition-colors text-sm">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
