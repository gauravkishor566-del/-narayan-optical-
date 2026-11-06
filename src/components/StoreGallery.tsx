import React, { useState } from 'react';
import { GALLERY_ITEMS, StoreGalleryItem } from '../data/opticalData';
import { X, ZoomIn, MapPin, Eye } from 'lucide-react';

export const StoreGallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'storefront' | 'optometry' | 'showroom' | 'delivery'>('all');
  const [lightboxItem, setLightboxItem] = useState<StoreGalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="store-tour" className="relative z-10 py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200/80 block w-full clear-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            IN-STORE EXPERIENCE &amp; FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Tour Narayan Optical &amp; Clinic, Avas Vikas Colony, Agra
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real photographs of our modern showroom, optometry examination suite, and reception.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 mb-8 sm:mb-10 scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Photos
          </button>
          <button
            onClick={() => setFilter('storefront')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === 'storefront'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => setFilter('optometry')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === 'optometry'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Optometry Room
          </button>
          <button
            onClick={() => setFilter('showroom')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === 'showroom'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Showroom
          </button>
          <button
            onClick={() => setFilter('delivery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === 'delivery'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Delivery Desk
          </button>
        </div>

        {/* Photos Grid (4 authentic facilities) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Frame with rock-solid height */}
              <div className="relative w-full h-56 sm:h-64 bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ objectPosition: item.focusPosition || 'center center' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-bold backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-xs">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1.5 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span>View in High Resolution</span>
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                style={{ objectPosition: lightboxItem.focusPosition || 'center' }}
                className="w-full h-full max-h-[70vh] object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold shadow-md">
                  {lightboxItem.badge}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-slate-600">
                {lightboxItem.subtitle}
              </p>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Narayan Optical &amp; Clinic, 401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
