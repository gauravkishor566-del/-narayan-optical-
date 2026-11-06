import React from 'react';
import { DIAGNOSTIC_SERVICES, STORE_INFO, DiagnosticService } from '../data/opticalData';
import { Eye, Monitor, Layers, Sparkles, CheckCircle2, Clock, Calendar, Phone, ArrowRight } from 'lucide-react';

interface ClinicalOptometryProps {
  onBookService: (serviceName: string) => void;
}

export const ClinicalOptometry: React.FC<ClinicalOptometryProps> = ({ onBookService }) => {
  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'refraction':
        return <Eye className="w-5 h-5 text-teal-600" />;
      case 'screen':
        return <Monitor className="w-5 h-5 text-sky-600" />;
      case 'progressive':
        return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'contact':
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="clinic" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
              CLINICAL OPTOMETRY &amp; DIAGNOSTIC EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
              State-of-the-Art Computerized Eye Testing in Agra
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Equipped with computerized auto-refractometers, keratometers, and digital slit lamps to pinpoint your exact optical correction with zero guesswork.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shrink-0">
            <div>
              <p className="text-xs font-semibold text-slate-800">Walk-ins welcome &amp;</p>
              <p className="text-xs text-teal-700 font-bold">appointments guaranteed</p>
            </div>
            <button
              onClick={() => onBookService('General Computerized Eye Exam')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors shrink-0"
            >
              Book Examination
            </button>
          </div>
        </div>

        {/* Featured Examination Unit Banner Card */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white grid grid-cols-1 lg:grid-cols-12">
          
          {/* Photo side (5 cols) */}
          <div className="lg:col-span-5 relative bg-slate-950 min-h-[260px] lg:min-h-full">
            <img
              src="/assets/store/optometry_chair_full.jpg"
              alt="Clinical Optometry Suite"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-md bg-teal-800/90 text-white text-xs font-bold backdrop-blur-xs">
                Optometry Room · In-Store
              </span>
            </div>
          </div>

          {/* Details side (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">
                Advanced Ophthalmic Examination Unit
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Our dedicated clinical room features motorized hydraulic positioning, auto-keratometer, and synchronized visual acuity digital charts for comfortable testing of adults and children.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Accurate measurement of spherical, cylindrical (cyl) &amp; axis powers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Pupil Distance (PD) digital calibration for precise lens centering</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Free optical consultation &amp; prescription review</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 text-teal-800 font-semibold text-xs sm:text-sm hover:bg-teal-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Speak with Our Optometrist: 7037005522</span>
              </a>

              <span className="text-xs text-slate-500">
                Avg. Exam Time: 15 Minutes
              </span>
            </div>
          </div>

        </div>

        {/* 4 Clinical Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {DIAGNOSTIC_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    {getServiceIcon(srv.iconType)}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{srv.duration}</span>
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                  {srv.name}
                </h4>

                <p className="text-xs font-semibold text-teal-700 mb-2.5">
                  {srv.equipment}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {srv.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-1.5 text-xs text-slate-600 mb-5">
                  {srv.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold shrink-0 mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Fee & Book Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fee</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {srv.fee}
                  </span>
                </div>

                <button
                  onClick={() => onBookService(srv.name)}
                  className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-bold text-xs sm:text-sm group"
                >
                  <span>Book Slot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
