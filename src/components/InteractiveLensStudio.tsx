import React, { useState } from 'react';
import { FRAMES, VISION_CORRECTIONS, OPTICAL_COATINGS, EyewearFrame, STORE_INFO } from '../data/opticalData';
import { GlassesRenderer } from './GlassesRenderer';
import { Sparkles, MessageCircle, Calendar, Check, Layers, ShieldCheck } from 'lucide-react';

interface InteractiveLensStudioProps {
  selectedFrame: EyewearFrame;
  onSelectFrame: (frame: EyewearFrame) => void;
  onBookFitting: (packageDetails: {
    frame: EyewearFrame;
    correction: typeof VISION_CORRECTIONS[0];
    coating: typeof OPTICAL_COATINGS[0];
    totalPrice: number;
  }) => void;
}

export const InteractiveLensStudio: React.FC<InteractiveLensStudioProps> = ({
  selectedFrame,
  onSelectFrame,
  onBookFitting
}) => {
  const [selectedCorrectionId, setSelectedCorrectionId] = useState<string>('single-vision');
  const [selectedCoatingId, setSelectedCoatingId] = useState<string>('blue-cut');

  const selectedCorrection = VISION_CORRECTIONS.find(v => v.id === selectedCorrectionId) || VISION_CORRECTIONS[1];
  const selectedCoating = OPTICAL_COATINGS.find(c => c.id === selectedCoatingId) || OPTICAL_COATINGS[1];

  // Price calculations
  const rawTotal = selectedFrame.storePrice + selectedCorrection.price + selectedCoating.price;
  const discountAmount = Math.round(rawTotal * 0.15);
  const finalTotal = rawTotal - discountAmount;

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `*Narayan Optical - Custom Lens Package Estimate*\n\n` +
      `👓 *Frame:* ${selectedFrame.name} (₹${selectedFrame.storePrice.toLocaleString('en-IN')})\n` +
      `🔍 *Vision Correction:* ${selectedCorrection.name} (+₹${selectedCorrection.price.toLocaleString('en-IN')})\n` +
      `🛡 *Coating & Filter:* ${selectedCoating.name} (+₹${selectedCoating.price.toLocaleString('en-IN')})\n` +
      `------------------------------------\n` +
      `Subtotal: ₹${rawTotal.toLocaleString('en-IN')}\n` +
      `Combo Discount (15%): -₹${discountAmount.toLocaleString('en-IN')}\n` +
      `*Total Estimated Amount: ₹${finalTotal.toLocaleString('en-IN')}*\n\n` +
      `Includes in-store computerized testing & hard case fitting at our Agra clinic.\n` +
      `I would like to confirm lens availability and book my trial!`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <section id="lens-studio" className="py-16 sm:py-24 bg-[#091122] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>INTERACTIVE LENS STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 font-display">
            Customize Your Lenses &amp; Get an Instant Estimate
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pair your favorite frame with certified ophthalmic lenses edged in our in-house precision lab. Transparent pricing with genuine brand warranties.
          </p>
        </div>

        {/* Live Vector Frame Preview Ribbon */}
        <div className="bg-[#0f1b35] rounded-3xl p-5 border border-slate-700/60 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-[#0a1324] rounded-2xl border border-slate-800">
            <GlassesRenderer
              frame={selectedFrame}
              coatingId={selectedCoatingId}
              height={140}
              className="max-w-[340px] drop-shadow-lg"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
              Live Coating Preview Active
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {selectedFrame.name}
            </h3>
            <p className="text-xs text-slate-300">
              Configured with <strong className="text-teal-300">{selectedCorrection.name}</strong> and{' '}
              <strong className="text-teal-300">{selectedCoating.name}</strong>.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Lens: {selectedFrame.lensSize}mm</span>
              <span>Bridge: {selectedFrame.bridgeSize}mm</span>
              <span>Temple: {selectedFrame.templeSize}mm</span>
            </div>
          </div>
        </div>

        {/* Studio Interactive Steps Grid */}
        <div className="space-y-10">
          
          {/* STEP 1: CHOSEN FRAME */}
          <div className="bg-[#0f1b35] rounded-3xl p-6 sm:p-7 border border-slate-700/60 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-400 uppercase">
                  STEP 1 · CHOSEN FRAME
                </span>
              </div>
              <span className="text-xs text-slate-400">Click any frame to switch</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {FRAMES.map((frame) => {
                const isSelected = frame.id === selectedFrame.id;
                return (
                  <button
                    key={frame.id}
                    onClick={() => onSelectFrame(frame)}
                    className={`p-3 rounded-2xl text-left transition-all flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30'
                        : 'bg-[#0a1324] border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="h-16 flex items-center justify-center mb-2">
                      <GlassesRenderer frame={frame} height={50} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white line-clamp-1 leading-tight mb-1">
                        {frame.name}
                      </p>
                      <p className="text-xs font-extrabold text-teal-400 font-mono">
                        ₹{frame.storePrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT VISION CORRECTION */}
          <div className="bg-[#0f1b35] rounded-3xl p-6 sm:p-7 border border-slate-700/60 shadow-lg">
            <div className="mb-5">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-400 uppercase">
                STEP 2 · SELECT VISION CORRECTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {VISION_CORRECTIONS.map((vc) => {
                const isSelected = selectedCorrectionId === vc.id;
                return (
                  <div
                    key={vc.id}
                    onClick={() => setSelectedCorrectionId(vc.id)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20'
                        : 'bg-[#0a1324] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {vc.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {vc.description}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-teal-400 whitespace-nowrap font-mono">
                        +₹{vc.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: CHOOSE OPTICAL COATING & PROTECTION */}
          <div className="bg-[#0f1b35] rounded-3xl p-6 sm:p-7 border border-slate-700/60 shadow-lg">
            <div className="mb-5">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-400 uppercase">
                STEP 3 · CHOOSE OPTICAL COATING &amp; PROTECTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {OPTICAL_COATINGS.map((coat) => {
                const isSelected = selectedCoatingId === coat.id;
                return (
                  <div
                    key={coat.id}
                    onClick={() => setSelectedCoatingId(coat.id)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20'
                        : 'bg-[#0a1324] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {coat.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {coat.description}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-teal-400 whitespace-nowrap font-mono">
                        +₹{coat.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FINAL PACKAGE ESTIMATE CARD */}
          <div className="bg-[#0f1b35] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Package Estimate
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                Save 15%
              </span>
            </div>

            {/* Line Items */}
            <div className="py-5 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Frame ({selectedFrame.name})</span>
                <span className="font-mono text-white">₹{selectedFrame.storePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{selectedCorrection.name}</span>
                <span className="font-mono text-white">₹{selectedCorrection.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{selectedCoating.name}</span>
                <span className="font-mono text-white">₹{selectedCoating.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-semibold pt-2 border-t border-slate-800/80">
                <span>Combo Package Discount (15%)</span>
                <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Total Box */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Total Estimated Amount
              </span>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-mono tracking-tight">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-slate-500 line-through font-mono">
                  ₹{rawTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Includes in-store computerized eye testing &amp; fitting case + microfibre cloth.
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Package to Store on WhatsApp</span>
                </button>

                <button
                  onClick={() =>
                    onBookFitting({
                      frame: selectedFrame,
                      correction: selectedCorrection,
                      coating: selectedCoating,
                      totalPrice: finalTotal
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Eye Exam for Fitting</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
