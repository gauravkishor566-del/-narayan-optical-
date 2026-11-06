import React, { useState } from 'react';
import { STORE_INFO } from '../data/opticalData';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, CheckCircle, AlertCircle, MessageCircle, Calendar } from 'lucide-react';

interface VisionScreeningProps {
  onBookExam: () => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

const DIRECTIONS: Direction[] = ['right', 'down', 'left', 'up'];

export const VisionScreening: React.FC<VisionScreeningProps> = ({ onBookExam }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Step 1: E-Chart state
  const [eLevel, setELevel] = useState<number>(1);
  const [currentEDirection, setCurrentEDirection] = useState<Direction>('right');
  const [eCorrectCount, setECorrectCount] = useState<number>(0);

  // Step 2: Duochrome state
  const [duochromeChoice, setDuochromeChoice] = useState<'red' | 'equal' | 'green' | null>(null);

  // Step 3: Astigmatism state
  const [astigmatismChoice, setAstigmatismChoice] = useState<'uniform' | 'darker' | null>(null);

  // Rotations map
  const rotationMap: Record<Direction, string> = {
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
    up: '-rotate-90'
  };

  // Font sizes for difficulty levels
  const sizeMap: Record<number, string> = {
    1: 'text-8xl sm:text-9xl',
    2: 'text-6xl sm:text-7xl',
    3: 'text-4xl sm:text-5xl',
    4: 'text-2xl sm:text-3xl'
  };

  const handleEGuess = (dir: Direction) => {
    let nextCorrect = eCorrectCount;
    if (dir === currentEDirection) {
      nextCorrect += 1;
      setECorrectCount(nextCorrect);
    }

    if (eLevel < 4) {
      setELevel(prev => prev + 1);
      // Pick random next direction
      const remaining = DIRECTIONS.filter(d => d !== currentEDirection);
      const nextDir = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrentEDirection(nextDir);
    } else {
      // Move to step 2
      setActiveStep(2);
    }
  };

  const handleDuochromeSelect = (choice: 'red' | 'equal' | 'green') => {
    setDuochromeChoice(choice);
    setActiveStep(3);
  };

  const handleAstigmatismSelect = (choice: 'uniform' | 'darker') => {
    setAstigmatismChoice(choice);
    setActiveStep(4);
  };

  const handleReset = () => {
    setActiveStep(1);
    setELevel(1);
    setCurrentEDirection('right');
    setECorrectCount(0);
    setDuochromeChoice(null);
    setAstigmatismChoice(null);
  };

  const handleShareResultsWhatsApp = () => {
    const acuityResult = eCorrectCount >= 3 ? 'Good (Estimated 20/20 - 20/25)' : 'Needs Attention (Estimated 20/30 - 20/40)';
    const focusResult =
      duochromeChoice === 'red'
        ? 'Red side clearer (Mild Myopia tendency)'
        : duochromeChoice === 'green'
        ? 'Green side clearer (Mild Hyperopia tendency)'
        : 'Equal sharpness (Balanced focus)';
    const astigResult =
      astigmatismChoice === 'darker'
        ? 'Uneven lines noted (Possible Astigmatism)'
        : 'Uniform lines (Low Astigmatism risk)';

    const text = encodeURIComponent(
      `*Narayan Optical - Online Vision Screening Results*\n\n` +
      `👁 *Visual Sharpness Score:* ${eCorrectCount}/4 (${acuityResult})\n` +
      `🔴🟢 *Red-Green Balance:* ${focusResult}\n` +
      `🎯 *Astigmatism Dial:* ${astigResult}\n\n` +
      `I would like to schedule a complete computerized examination at your clinic on Jivan Jyoti Hospital Road, Avas Vikas Colony, Agra to confirm my exact power.`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <section id="vision-check" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            COMPLIMENTARY VISION SCREENING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Interactive 2–Minute Vision Self–Check
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Screen your visual sharpness, color focus balance, and astigmatism right from your screen before your in-clinic exam.
          </p>
        </div>

        {/* 4-Step Nav Bar Tabs */}
        <div className="bg-slate-50 rounded-2xl p-2 border border-slate-200/90 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveStep(1)}
              className={`p-2.5 rounded-xl text-center transition-all ${
                activeStep === 1
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Visual Sharpness (E-Chart)
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`p-2.5 rounded-xl text-center transition-all ${
                activeStep === 2
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Red–Green Balance
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`p-2.5 rounded-xl text-center transition-all ${
                activeStep === 3
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Astigmatism Dial
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className={`p-2.5 rounded-xl text-center transition-all ${
                activeStep === 4
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Results
            </button>
          </div>
        </div>

        {/* Screening Content Container */}
        <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm min-h-[460px] flex flex-col justify-between">
          
          {/* STEP 1: E-CHART TEST */}
          {activeStep === 1 && (
            <div className="space-y-6 text-center">
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Sit approximately 2 feet (arm&apos;s length) from your monitor. Look at the letter &quot;E&quot; below and indicate which direction its 3 arms are pointing:
              </p>

              {/* White E Box */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 max-w-md mx-auto shadow-xs flex items-center justify-center min-h-[220px]">
                <span
                  className={`font-black text-slate-900 select-none inline-block transition-transform duration-300 font-mono leading-none ${
                    rotationMap[currentEDirection]
                  } ${sizeMap[eLevel]}`}
                >
                  E
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Difficulty Level {eLevel} of 4
                </p>

                {/* Direction Buttons */}
                <div className="flex items-center justify-center gap-2.5 sm:gap-4 max-w-sm mx-auto">
                  <button
                    onClick={() => handleEGuess('up')}
                    className="flex-1 py-3 px-2 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-800 rounded-2xl border border-slate-200 shadow-xs font-semibold text-xs flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <ArrowUp className="w-5 h-5 text-teal-600" />
                    <span>Up</span>
                  </button>

                  <button
                    onClick={() => handleEGuess('down')}
                    className="flex-1 py-3 px-2 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-800 rounded-2xl border border-slate-200 shadow-xs font-semibold text-xs flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <ArrowDown className="w-5 h-5 text-teal-600" />
                    <span>Down</span>
                  </button>

                  <button
                    onClick={() => handleEGuess('left')}
                    className="flex-1 py-3 px-2 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-800 rounded-2xl border border-slate-200 shadow-xs font-semibold text-xs flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <ArrowLeft className="w-5 h-5 text-teal-600" />
                    <span>Left</span>
                  </button>

                  <button
                    onClick={() => handleEGuess('right')}
                    className="flex-1 py-3 px-2 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-800 rounded-2xl border border-slate-200 shadow-xs font-semibold text-xs flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <ArrowRight className="w-5 h-5 text-teal-600" />
                    <span>Right</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DUOCHROME (RED-GREEN) TEST */}
          {activeStep === 2 && (
            <div className="space-y-6 text-center">
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Look at the symbols on both colored panels. On which background do the dark characters appear sharper, bolder, or more distinct?
              </p>

              {/* Split Red/Green Box */}
              <div className="max-w-md mx-auto grid grid-cols-2 rounded-3xl overflow-hidden shadow-md border border-slate-200">
                {/* Red Panel */}
                <div className="bg-[#dc2626] p-8 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl font-black font-mono tracking-widest">O E</span>
                  <span className="text-2xl font-bold font-mono mt-2">7 4</span>
                </div>

                {/* Green Panel */}
                <div className="bg-[#15803d] p-8 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl font-black font-mono tracking-widest">O E</span>
                  <span className="text-2xl font-bold font-mono mt-2">7 4</span>
                </div>
              </div>

              {/* Selection Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto pt-2">
                <button
                  onClick={() => handleDuochromeSelect('red')}
                  className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-rose-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-all"
                >
                  🔴 Red is Sharper
                </button>
                <button
                  onClick={() => handleDuochromeSelect('equal')}
                  className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-teal-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-all"
                >
                  ⚖️ Both Look Equal
                </button>
                <button
                  onClick={() => handleDuochromeSelect('green')}
                  className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-all"
                >
                  🟢 Green is Sharper
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ASTIGMATISM DIAL */}
          {activeStep === 3 && (
            <div className="space-y-6 text-center">
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Cover one eye at a time. Look at the center of the radiating sunburst dial below. Do all lines appear equally black and uniform, or are certain angles darker or blurred?
              </p>

              {/* Sunburst Radial Dial SVG */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-xs mx-auto shadow-xs flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  {/* Radiating 12 hour lines like a clock */}
                  {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((angle) => (
                    <line
                      key={angle}
                      x1="100"
                      y1="15"
                      x2="100"
                      y2="185"
                      stroke="#0f172a"
                      strokeWidth="3"
                      transform={`rotate(${angle} 100 100)`}
                    />
                  ))}
                  <circle cx="100" cy="100" r="16" fill="white" stroke="#0f172a" strokeWidth="3" />
                </svg>
              </div>

              {/* Answer options */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  onClick={() => handleAstigmatismSelect('uniform')}
                  className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-teal-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-all"
                >
                  ✓ All Lines Look Uniform
                </button>
                <button
                  onClick={() => handleAstigmatismSelect('darker')}
                  className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs transition-all"
                >
                  ⚡ Some Lines Look Darker / Blurred
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CLINICAL SUMMARY & RECOMMENDATION */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Your Vision Screening Summary
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Preliminary online self-check completed. Ready for certified in-person auto-refraction.
                </p>
              </div>

              {/* Score breakdown cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Visual Acuity
                  </span>
                  <p className="text-base font-bold text-slate-900">
                    {eCorrectCount >= 3 ? 'Normal (20/20)' : 'Mild Blur'}
                  </p>
                  <p className="text-[11px] text-teal-600 mt-1 font-mono">
                    Score: {eCorrectCount}/4 Correct
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Focal Balance
                  </span>
                  <p className="text-base font-bold text-slate-900 capitalize">
                    {duochromeChoice === 'red' ? 'Myopic Bias' : duochromeChoice === 'green' ? 'Hyperopic Bias' : 'Balanced'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Duochrome check
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Astigmatism
                  </span>
                  <p className="text-base font-bold text-slate-900">
                    {astigmatismChoice === 'darker' ? 'Cyl Focus Likely' : 'Symmetric'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Radial dial check
                  </p>
                </div>
              </div>

              {/* Optometrist Recommendation Note */}
              <div className="bg-teal-50/80 rounded-2xl p-4 sm:p-5 border border-teal-200/90 max-w-2xl mx-auto flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-900 space-y-1">
                  <p className="font-bold text-sm text-teal-950">
                    Optometrist Recommendation
                  </p>
                  <p>
                    Based on your responses, we recommend an in-store computerized auto-refractometer checkup to calibrate your spherical and cylindrical numbers with precision trial frames.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={handleShareResultsWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share Results on WhatsApp &amp; Book</span>
                </button>

                <button
                  onClick={onBookExam}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free In-Store Exam</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Retest"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Step Indicator */}
          <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
            <span>Free Clinical Tool by Narayan Optical, Agra</span>
            <span>Step {activeStep} of 4</span>
          </div>

        </div>

      </div>
    </section>
  );
};
