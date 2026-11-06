import React from 'react';
import { REVIEWS, STORE_INFO } from '../data/opticalData';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';

export const PatientReviews: React.FC = () => {
  return (
    <section id="reviews" className="relative z-10 py-14 sm:py-20 bg-white border-b border-slate-200/80 block w-full clear-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            VERIFIED AGRA PATIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Trusted by 10,000+ Clear Vision Seekers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            Read how local Agra residents experienced our computerized testing and eyewear craftsmanship.
          </p>

          {/* Rating Summary Pill */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold shadow-2xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-900">4.9 / 5.0</span>
            <span className="text-slate-500 font-normal">({STORE_INFO.reviewsCount} Google Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-5">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-end justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {rev.location}
                  </p>
                  <p className="text-[11px] text-teal-700 font-medium mt-1">
                    {rev.purchased}
                  </p>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
