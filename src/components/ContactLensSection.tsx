import React from 'react';
import { CONTACT_LENS_BRANDS, STORE_INFO } from '../data/opticalData';
import { Sparkles, Calendar, MessageCircle, CheckCircle2, ShieldCheck, Eye, Droplets } from 'lucide-react';

interface ContactLensSectionProps {
  onBookFitting: () => void;
}

export const ContactLensSection: React.FC<ContactLensSectionProps> = ({ onBookFitting }) => {
  const handleWhatsAppInquiry = (brandName?: string) => {
    const text = encodeURIComponent(
      brandName
        ? `Hi Narayan Optical, I would like to inquire about *${brandName}* contact lenses and book a corneal fitting session.`
        : `Hi Narayan Optical, I would like to book a Contact Lens trial and fitting session with Mr. Dilip Narayan.`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <section id="contact-lenses" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Droplets className="w-4 h-4 text-teal-400" />
            <span>CERTIFIED CONTACT LENS CLINIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Premium Contact Lens Studio
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
            Authorized clinic for the world&apos;s leading contact lens manufacturers. Fitted with corneal keratometry and tear-film evaluation by senior specialist Mr. Dilip Narayan.
          </p>
        </div>

        {/* 4 Brand Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-14">
          {CONTACT_LENS_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* White Logo Presentation Box */}
              <div className="bg-white p-6 sm:p-7 flex items-center justify-center min-h-[140px] border-b border-slate-700/60 relative">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Brand Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                    {brand.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium italic mt-0.5 mb-3">
                    {brand.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Bullet Offerings */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
                    {brand.offerings.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inquiry CTA */}
                <button
                  onClick={() => handleWhatsAppInquiry(brand.name)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-700/80 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl border border-slate-600 hover:border-teal-500 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-teal-300 group-hover:text-white" />
                  <span>Inquire {brand.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Contact Lens Advantage Banner */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-800/95 to-teal-950/70 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>CERTIFIED CLINICAL FITTING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Get Contact Lenses Fitted at Narayan Optical?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Wearing contact lenses requires precise digital keratometry (corneal curvature), base-curve matching, and tear-film stability analysis. With over 26 years of specialized hospital and clinical practice, Mr. Dilip Narayan ensures safe, healthy, and zero-irritation lens wear.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Complimentary Trial Pair Session
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Hygiene &amp; Lens Insertion Guidance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                High Astigmatism / Toric Fitting
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onBookFitting}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-2xl shadow-md active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Contact Lens Trial</span>
            </button>
            <button
              onClick={() => handleWhatsAppInquiry()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-2xl shadow-md active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
