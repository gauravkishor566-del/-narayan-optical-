import React, { useState } from 'react';
import { STORE_INFO } from '../data/opticalData';
import { Phone, Calendar, Menu, X, MapPin, MessageCircle, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onBookExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookExam }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Showroom Catalog', href: '#catalog' },
    { name: 'Know Your Optometrist', href: '#optometrist' },
    { name: 'Contact Lens Studio', href: '#contact-lenses' },
    { name: 'Computerized Eye Testing', href: '#clinic' },
    { name: 'Vision Self-Check', href: '#vision-check' },
    { name: 'Store Tour', href: '#store-tour' },
    { name: 'Reviews & Visit', href: '#reviews' },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0b162c] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 font-medium">
          <div className="flex items-center gap-2 text-slate-300 truncate text-[11px] sm:text-xs">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">
              401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra · 10:00 AM – 8:45 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-teal-300 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>7037005522</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-emerald-400 hidden sm:inline flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open 7 Days (10:00 AM to 8:45 PM) · Walk-Ins Welcome
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Zone using the official user-provided logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <img
              src="/assets/aistudio/IMG-20261102-WA0001_74d5b670_74d5b670.jpg"
              alt="Narayan Optical"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-teal-700 transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all border border-slate-200 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>Call 7037005522</span>
            </a>

            <button
              onClick={onBookExam}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-sm hover:shadow-teal-600/20 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span className="whitespace-nowrap">Book Free Eye Exam</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg xl:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <img
                  src="/assets/aistudio/IMG-20261102-WA0001_74d5b670_74d5b670.jpg"
                  alt="Narayan Optical"
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:text-teal-700 hover:bg-teal-50/70 font-medium text-sm transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>

              {/* Action Buttons in Drawer */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookExam();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Eye Exam</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call: {STORE_INFO.phoneRaw}</span>
              </a>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                Open All 7 Days: 10:00 AM – 8:45 PM
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
