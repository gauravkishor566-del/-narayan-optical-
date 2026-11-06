import React, { useState, useMemo } from 'react';
import { FRAMES, EyewearFrame, STORE_INFO } from '../data/opticalData';
import { Search, MessageCircle, Calendar, Check, ArrowRight } from 'lucide-react';

interface EyewearShowroomProps {
  onBookTrial: (frame?: EyewearFrame) => void;
}

export const EyewearShowroom: React.FC<EyewearShowroomProps> = ({ onBookTrial }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionFilter, setCollectionFilter] = useState<'all' | 'prescription' | 'clip-on' | 'sunglasses'>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  const brands = ['All Brands', 'Intense Focus', 'Scott', 'Ray-Ban'];

  const filteredFrames = useMemo(() => {
    return FRAMES.filter((frame) => {
      // Search
      const matchesSearch =
        searchQuery === '' ||
        frame.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        frame.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
        frame.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        frame.brand.toLowerCase().includes(searchQuery.toLowerCase());

      // Collection
      const matchesCollection =
        collectionFilter === 'all' || frame.category === collectionFilter;

      // Brand
      const matchesBrand =
        brandFilter === 'all' ||
        brandFilter === 'All Brands' ||
        frame.brand.toLowerCase() === brandFilter.toLowerCase();

      return matchesSearch && matchesCollection && matchesBrand;
    });
  }, [searchQuery, collectionFilter, brandFilter]);

  const handleInquireWhatsApp = (frame: EyewearFrame) => {
    const text = encodeURIComponent(
      `Hi Narayan Optical, I am inquiring about *${frame.name}* (${frame.material}, ${frame.colorName}). Is this frame available for trial at your Agra clinic?`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            CURATED EYEWEAR SHOWROOM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3 font-display">
            Designer Eyeglasses &amp; Luxury Frames
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Explore authentic frames crafted from Italian acetate, feather-light titanium, and flexible TR90. Try any frame in person at our Avas Vikas Colony clinic, Agra.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 mb-10 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Scott, Cat-Eye, Titanium, Acetate, Clip-On..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-slate-800 placeholder:text-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
              <button
                onClick={() => setCollectionFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  collectionFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                All Frames
              </button>
              <button
                onClick={() => setCollectionFilter('prescription')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  collectionFilter === 'prescription'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Prescription Glasses
              </button>
              <button
                onClick={() => setCollectionFilter('clip-on')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  collectionFilter === 'clip-on'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Clip-On Systems
              </button>
              <button
                onClick={() => setCollectionFilter('sunglasses')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  collectionFilter === 'sunglasses'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Designer Collections
              </button>
            </div>
          </div>

          {/* Brand Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs">
            <span className="font-semibold text-slate-500 whitespace-nowrap">Brand:</span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  brandFilter === b || (b === 'All Brands' && brandFilter === 'all')
                    ? 'bg-teal-50 text-teal-800 border border-teal-200 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

        </div>

        {/* Frames Catalog Grid */}
        {filteredFrames.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <p className="text-slate-600 mb-4">No frames found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCollectionFilter('all');
                setBrandFilter('all');
              }}
              className="px-5 py-2.5 bg-teal-600 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredFrames.map((frame) => (
              <div
                key={frame.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Real High-Resolution Glass Photo Showcase */}
                <div className="relative p-6 bg-gradient-to-b from-slate-50/80 to-white flex items-center justify-center min-h-[240px] border-b border-slate-100 overflow-hidden">
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-800 text-[11px] font-bold">
                      {frame.brand}
                    </span>
                    {frame.isBestseller && (
                      <span className="px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Real Glass Image */}
                  <div className="w-full flex items-center justify-center h-44">
                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="max-h-40 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Details Body (PRICE REMOVED AS REQUESTED) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Material & Spec Line */}
                    <div className="text-xs text-slate-500 flex items-center gap-2 mb-1.5 flex-wrap">
                      <span>{frame.shape}</span>
                      <span aria-hidden="true">·</span>
                      <span>{frame.material}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{frame.colorName}</span>
                    </div>

                    {/* Frame Name */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {frame.name}
                    </h3>

                    {/* Dimensions strip */}
                    <div className="mt-2.5 py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-100 inline-flex items-center gap-3 text-xs text-slate-600 font-mono">
                      <span>Lens: <strong className="text-slate-800">{frame.lensSize}mm</strong></span>
                      <span>Bridge: <strong className="text-slate-800">{frame.bridgeSize}mm</strong></span>
                      <span>Temple: <strong className="text-slate-800">{frame.templeSize}mm</strong></span>
                    </div>

                    {/* Features Checklist */}
                    <div className="mt-3.5 space-y-1">
                      {frame.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons (NO PRICE DISPLAY) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    <button
                      onClick={() => onBookTrial(frame)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Trial in Store</span>
                    </button>

                    <button
                      onClick={() => handleInquireWhatsApp(frame)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire WhatsApp</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
