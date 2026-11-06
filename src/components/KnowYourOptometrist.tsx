import React from 'react';
import { OPTOMETRIST_PROFILE, STORE_INFO } from '../data/opticalData';
import { Award, Calendar, MessageCircle, ShieldCheck, CheckCircle2, Hospital, Clock, Sparkles } from 'lucide-react';

interface KnowYourOptometristProps {
  onBookExam: () => void;
}

export const KnowYourOptometrist: React.FC<KnowYourOptometristProps> = ({ onBookExam }) => {
  const profile = OPTOMETRIST_PROFILE;

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hello Mr. Dilip Narayan, I would like to schedule a personal optometry / contact lens consultation with you at Narayan Optical clinic, Avas Vikas Colony, Agra.`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <section id="optometrist" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <Award className="w-4 h-4 text-teal-600" />
            <span>26+ YEARS CLINICAL EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Know Your Optometrist
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
            Meet the senior vision specialist behind the precision eye care and personalized optical fittings at Narayan Optical.
          </p>
        </div>

        {/* Main Profile Grid Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left Photo & Credentials Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group max-w-sm w-full">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                
                {/* Image frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 border-2 border-white shadow-lg">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Bottom overlay badge */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 text-white text-left">
                    <span className="text-[11px] font-bold text-teal-300 tracking-wider uppercase block">
                      Senior Optometrist
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      26+ Years Clinical Practice
                    </p>
                  </div>
                </div>
              </div>

              {/* Career Highlights Pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  <Hospital className="w-3.5 h-3.5 text-teal-600" />
                  Prasad Eye Hospital
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  <Hospital className="w-3.5 h-3.5 text-teal-600" />
                  Gandhi Eye Hospital
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  10 Years at Himalaya
                </span>
              </div>
            </div>

            {/* Right Biography & Details Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="inline-block px-3 py-1 rounded-md bg-teal-600 text-white text-xs font-bold tracking-wider uppercase mb-2">
                  CHIEF CLINICAL OPTOMETRIST
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name}
                </h3>
                <p className="text-base sm:text-lg font-bold text-teal-700 mt-1">
                  {profile.qualifications}
                </p>
              </div>

              {/* Verified Biography Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {profile.bioParagraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Philosophy Quote Callout Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50/50 border border-teal-200/90 shadow-2xs">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wider block mb-1">
                      His Philosophy
                    </span>
                    <blockquote className="text-base sm:text-lg font-extrabold text-teal-950 font-display italic">
                      &ldquo;{profile.philosophy}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onBookExam}
                  className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base rounded-2xl shadow-sm hover:shadow-teal-600/25 active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Consultation with Mr. Narayan</span>
                </button>

                <button
                  onClick={handleWhatsAppConsult}
                  className="flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base rounded-2xl shadow-xs active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Mr. Narayan</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
