import React, { useState } from 'react';
import { STORE_INFO } from '../data/opticalData';
import { Calendar, Phone, MapPin, Eye, Clock, ShieldCheck, Glasses, ExternalLink, Droplets } from 'lucide-react';

interface HeroProps {
  onBookExam: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookExam }) => {
  const [activeTab, setActiveTab] = useState<'storefront' | 'optometry' | 'showroom' | 'contact'>('storefront');

  const heroSlides = {
    storefront: {
      image: '/assets/store/store_exterior.jpg',
      tag: 'AVAS VIKAS COLONY, AGRA',
      subtag: 'Actual Photo · Agra Store',
      title: 'Modern Retail Storefront & Clinic',
      desc: 'Located on Jivan Jyoti Hospital Road, Sector 3, Avas Vikas Colony',
      clipClass: 'object-cover'
    },
    optometry: {
      image: '/assets/store/optometry_chair_full.jpg',
      tag: '100% COMPUTERIZED',
      subtag: 'Diagnostic Optometry Suite',
      title: 'Clinical Refraction & Exam Suite',
      desc: 'Topcon/Nidek-grade auto-refractometer & motorized ergonomic clinic chair',
      clipClass: 'object-cover'
    },
    showroom: {
      image: '/assets/store/eyewear_showroom.jpg',
      tag: 'BOUTIQUE DISPLAY',
      subtag: '1,200+ Designer Frames',
      title: 'Spacious Eyewear Showroom',
      desc: 'Ray-Ban, Scott, Vogue, Intense Focus with transparent store quality',
      clipClass: 'object-cover'
    },
    contact: {
      image: '/assets/aistudio/contact_lens_brands_combined_184edd2f.jpg',
      tag: 'CONTACT LENS CLINIC',
      subtag: 'Bausch & Lomb · Acuvue · Alcon · CooperVision',
      title: 'Certified Contact Lens Studio',
      desc: 'Corneal fitting, daily disposables, and toric solutions by Mr. Dilip Narayan (C.C.L.P.)',
      clipClass: 'object-contain bg-white p-3'
    }
  };

  const currentSlide = heroSlides[activeTab];

  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-slate-900 leading-[1.12] tracking-tight">
              Precision Eye Care <br className="hidden sm:inline" />
              &amp; Curated Designer <br className="hidden sm:inline" />
              <span className="text-teal-700">Eyewear in Agra</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Welcome to <strong className="text-slate-900 font-semibold">Narayan Optical &amp; Optometry Clinic</strong>. Led by Senior Optometrist <strong className="text-teal-800">Mr. Dilip Narayan</strong> (26+ years experience, B.Optom, C.C.L.P.), we offer computerized auto-refraction testing, leading international eyewear brands, and specialized contact lens corneal fittings.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookExam}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base rounded-2xl shadow-sm hover:shadow-teal-600/25 active:scale-[0.98] transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Eye Exam</span>
              </button>

              <a
                href="#optometrist"
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base rounded-2xl border border-slate-200 shadow-2xs active:scale-[0.98] transition-all"
              >
                <span>Know Your Optometrist</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex items-center gap-2 px-4 py-3.5 text-slate-700 hover:text-teal-700 font-medium text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call {STORE_INFO.phoneRaw}</span>
              </a>
            </div>

            {/* Timings and Landmark */}
            <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Clinic Timings:</strong> 10:00 AM – 8:45 PM (Monday – Sunday, All 7 Days)</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra · </span>
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Visual Column (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200/90 space-y-3.5">
              
              {/* Category Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto text-xs font-semibold scrollbar-none">
                <button
                  onClick={() => setActiveTab('storefront')}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeTab === 'storefront' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Storefront
                </button>
                <button
                  onClick={() => setActiveTab('optometry')}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeTab === 'optometry' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Optometry Clinic
                </button>
                <button
                  onClick={() => setActiveTab('showroom')}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeTab === 'showroom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Showroom
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeTab === 'contact' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Contact Lenses
                </button>
              </div>

              {/* Main Feature Display Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-inner group">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className={`w-full h-full ${currentSlide.clipClass} group-hover:scale-105 transition-transform duration-500`}
                />
                
                {/* Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-between p-4 sm:p-5 text-white">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-teal-600/90 text-white text-[11px] font-bold tracking-wider backdrop-blur-xs">
                      {currentSlide.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/60 text-slate-200 text-[11px] font-medium backdrop-blur-xs">
                      {currentSlide.subtag}
                    </span>
                  </div>

                  {/* Bottom Captions */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                      {currentSlide.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Quick Switch Thumbnails */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {(['storefront', 'optometry', 'showroom', 'contact'] as const).map((key) => {
                  const s = heroSlides[key];
                  const isSelected = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                        isSelected ? 'border-teal-600 ring-2 ring-teal-600/30' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={s.image} alt={s.title} className={`w-full h-full ${s.clipClass}`} />
                      <div className="absolute inset-0 bg-black/25 flex items-end p-1">
                        <span className="text-[9px] font-bold text-white leading-none truncate drop-shadow-xs capitalize">
                          {key === 'contact' ? 'Contact Lenses' : key}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* 4 Trust Metrics Cards Strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Metric 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                100% Computerized
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                High precision auto-refractometer testing for exact lens power
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
              <Glasses className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                1,200+ Eyewear Designs
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ray-Ban, Vogue, Scott, Intense Focus, Sandpiper &amp; Titanium
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                C.C.L.P. Contact Lenses
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Authorized Bausch &amp; Lomb, Acuvue, Alcon &amp; CooperVision
              </p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                26+ Years Senior Optometry
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Trusted by 10,000+ happy patients across Agra
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
