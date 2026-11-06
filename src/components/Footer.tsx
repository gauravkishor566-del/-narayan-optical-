import React from 'react';
import { STORE_INFO } from '../data/opticalData';
import { MapPin, Phone, Clock, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070e1c] text-slate-300 pt-16 pb-28 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/IMG-20261102-WA0001_74d5b670_74d5b670.jpg"
                alt="Narayan Optical"
                className="h-11 w-auto object-contain bg-white rounded-xl p-1 shadow-sm"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing precision computerized vision testing, certified ophthalmic lenses, designer eyewear, and specialist contact lens fittings led by Senior Optometrist Mr. Dilip Narayan across Avas Vikas Colony, Sikandra, Shahganj, and greater Agra.
            </p>

            <p className="text-xs text-slate-500 pt-1">
              Licensed Ophthalmic Dispenser · Computerized Auto-Refraction Center · C.C.L.P. Contact Lens Clinic
            </p>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase block mb-2">
              QUICK NAVIGATION
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#catalog" className="hover:text-teal-400 transition-colors">
                  Designer Eyewear Catalog
                </a>
              </li>
              <li>
                <a href="#optometrist" className="hover:text-teal-400 transition-colors">
                  Know Your Optometrist
                </a>
              </li>
              <li>
                <a href="#contact-lenses" className="hover:text-teal-400 transition-colors">
                  Contact Lens Studio (Bausch, Acuvue, Alcon)
                </a>
              </li>
              <li>
                <a href="#clinic" className="hover:text-teal-400 transition-colors">
                  Computerized Eye Exam Services
                </a>
              </li>
              <li>
                <a href="#vision-check" className="hover:text-teal-400 transition-colors">
                  Online Vision Screening
                </a>
              </li>
              <li>
                <a href="#store-tour" className="hover:text-teal-400 transition-colors">
                  Storefront &amp; Clinic Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Store & Clinic Visit (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase block mb-2">
              STORE &amp; CLINIC VISIT
            </span>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phoneRaw}`} className="hover:text-white font-mono">
                  +91 7037005522
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>10:00 AM – 8:45 PM (Monday – Sunday, All 7 Days)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Owner Direct</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Narayan Optical &amp; Optometry Clinic, Avas Vikas Colony, Agra. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
