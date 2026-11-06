import React, { useState } from 'react';
import { FAQS, STORE_INFO } from '../data/opticalData';
import { ChevronDown, Phone, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default like screenshot

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to know about eye testing, frame fittings, and lens delivery in Agra.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-teal-700 transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Optometrist Help Callout Card */}
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-teal-950 mb-1">
              Have an uncommon question or custom prescription?
            </h3>
            <p className="text-xs sm:text-sm text-teal-800">
              Our optometrist is ready to assist.
            </p>
          </div>

          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            className="flex items-center gap-2 py-3 px-5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call 7037005522</span>
          </a>
        </div>

      </div>
    </section>
  );
};
