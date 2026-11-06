import React from 'react';
import { STORE_INFO } from '../data/opticalData';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface StickyBottomBarProps {
  onBookExam: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onBookExam }) => {
  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-[#091224]/95 backdrop-blur-md border border-slate-700/80 rounded-full p-1.5 shadow-2xl flex items-center gap-1.5 max-w-md w-full justify-between">
        
        {/* Call Button */}
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-slate-200 hover:text-white hover:bg-slate-800/80 text-xs sm:text-sm font-semibold transition-all"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 text-xs sm:text-sm font-semibold transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        {/* Book Test Button */}
        <button
          onClick={onBookExam}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-full text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Test</span>
        </button>

      </div>
    </div>
  );
};
