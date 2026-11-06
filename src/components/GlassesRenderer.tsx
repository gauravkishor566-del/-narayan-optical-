import React from 'react';
import { EyewearFrame } from '../data/opticalData';

interface GlassesRendererProps {
  frame: EyewearFrame;
  coatingId?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const GlassesRenderer: React.FC<GlassesRendererProps> = ({
  frame,
  coatingId = 'none',
  className = '',
  width = '100%',
  height = '100%'
}) => {
  // Determine lens tint/reflection based on frame type & coating
  const isSunglasses = frame.category === 'sunglasses' || frame.frameType === 'navigator' || frame.frameType === 'cat-eye';

  let lensFill = 'rgba(255, 255, 255, 0.15)';
  let lensStroke = 'rgba(203, 213, 225, 0.4)';
  let gradientId = `lens-grad-${frame.id}`;

  if (isSunglasses) {
    if (frame.frameType === 'cat-eye') {
      lensFill = `url(#${gradientId}-dark)`;
    } else {
      lensFill = `url(#${gradientId}-amber)`;
    }
  } else if (coatingId === 'blue-cut') {
    lensFill = 'rgba(14, 165, 233, 0.15)';
    lensStroke = 'rgba(56, 189, 248, 0.6)';
  } else if (coatingId === 'photochromic') {
    lensFill = 'rgba(71, 85, 105, 0.45)';
    lensStroke = 'rgba(100, 116, 139, 0.7)';
  } else if (coatingId === 'anti-glare') {
    lensFill = 'rgba(20, 184, 166, 0.1)';
    lensStroke = 'rgba(45, 212, 191, 0.5)';
  }

  // Render distinct shapes according to frameType
  const renderEyewearSvg = () => {
    switch (frame.frameType) {
      case 'cat-eye':
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`${gradientId}-dark`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gold-inlay" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Left Temple Bar */}
            <path d="M42 54 L12 40 L6 42 L34 68 Z" fill="#0f172a" />
            <path d="M40 52 L26 44" stroke="url(#gold-inlay)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Temple Bar */}
            <path d="M378 54 L408 40 L414 42 L386 68 Z" fill="#0f172a" />
            <path d="M380 52 L394 44" stroke="url(#gold-inlay)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Bridge */}
            <path d="M185 70 C195 62, 225 62, 235 70" stroke="#090d16" strokeWidth="12" strokeLinecap="round" />
            <path d="M190 68 C200 62, 220 62, 230 68" stroke="url(#gold-inlay)" strokeWidth="2" strokeLinecap="round" />

            {/* Left Cat-Eye Rim */}
            <path
              d="M38 52 C55 35, 160 42, 185 70 C195 82, 185 130, 140 142 C85 152, 45 130, 38 98 C32 75, 25 58, 38 52 Z"
              fill="#090d16"
              stroke="#0f172a"
              strokeWidth="3"
            />
            {/* Left Lens */}
            <path
              d="M48 60 C65 48, 150 54, 172 74 C180 84, 172 120, 134 130 C90 140, 58 120, 50 94 C44 76, 40 64, 48 60 Z"
              fill={lensFill}
              stroke={lensStroke}
              strokeWidth="1.5"
            />
            {/* Left Lens Sheen */}
            <path d="M60 68 C80 60, 130 64, 155 78" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />

            {/* Right Cat-Eye Rim */}
            <path
              d="M382 52 C365 35, 260 42, 235 70 C225 82, 235 130, 280 142 C335 152, 375 130, 382 98 C388 75, 395 58, 382 52 Z"
              fill="#090d16"
              stroke="#0f172a"
              strokeWidth="3"
            />
            {/* Right Lens */}
            <path
              d="M372 60 C355 48, 270 54, 248 74 C240 84, 248 120, 286 130 C330 140, 362 120, 370 94 C376 76, 380 64, 372 60 Z"
              fill={lensFill}
              stroke={lensStroke}
              strokeWidth="1.5"
            />
            {/* Right Lens Sheen */}
            <path d="M360 68 C340 60, 290 64, 265 78" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />

            {/* Gold Corner Embellishments */}
            <circle cx="44" cy="54" r="2.5" fill="#fbbf24" />
            <circle cx="376" cy="54" r="2.5" fill="#fbbf24" />
          </svg>
        );

      case 'hexagonal':
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rose-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>

            {/* Temples */}
            <path d="M46 64 L16 54 L12 56 L42 74" stroke="url(#rose-gold)" strokeWidth="3" strokeLinecap="round" />
            <path d="M374 64 L404 54 L408 56 L378 74" stroke="url(#rose-gold)" strokeWidth="3" strokeLinecap="round" />

            {/* Bridge */}
            <path d="M184 72 C196 66, 224 66, 236 72" stroke="url(#rose-gold)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="196" cy="85" r="3.5" fill="#e2e8f0" stroke="#94a3b8" />
            <circle cx="224" cy="85" r="3.5" fill="#e2e8f0" stroke="#94a3b8" />

            {/* Left Hexagonal Rim */}
            <polygon
              points="75,44 165,44 186,85 168,135 78,135 52,85"
              fill={lensFill}
              stroke="url(#rose-gold)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M82 52 L155 52" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />

            {/* Right Hexagonal Rim */}
            <polygon
              points="255,44 345,44 368,85 342,135 252,135 234,85"
              fill={lensFill}
              stroke="url(#rose-gold)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M262 52 L335 52" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'navigator':
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`${gradientId}-amber`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b45309" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#d97706" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Clear Crystal Acetate Frame with Amber Tint */}
            {/* Temples */}
            <path d="M46 60 L14 48 L10 50 L40 70 Z" fill="#d97706" opacity="0.8" />
            <path d="M374 60 L406 48 L410 50 L380 70 Z" fill="#d97706" opacity="0.8" />

            {/* Top Bar / Bridge */}
            <path d="M182 66 C194 62, 226 62, 238 66" stroke="#b45309" strokeWidth="10" strokeLinecap="round" />

            {/* Left Navigator Rim */}
            <rect
              x="52"
              y="48"
              width="130"
              height="96"
              rx="24"
              fill="#fbbf24"
              fillOpacity="0.25"
              stroke="#b45309"
              strokeWidth="9"
            />
            <rect x="60" y="56" width="114" height="80" rx="18" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <path d="M72 64 L138 64" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />

            {/* Right Navigator Rim */}
            <rect
              x="238"
              y="48"
              width="130"
              height="96"
              rx="24"
              fill="#fbbf24"
              fillOpacity="0.25"
              stroke="#b45309"
              strokeWidth="9"
            />
            <rect x="246" y="56" width="114" height="80" rx="18" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <path d="M258 64 L324 64" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'clip-on':
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left & Right Temples */}
            <path d="M44 66 L12 56 L8 58 L38 78 Z" fill="#1e293b" />
            <path d="M376 66 L408 56 L412 58 L382 78 Z" fill="#1e293b" />

            {/* Bridge */}
            <path d="M182 74 C195 70, 225 70, 238 74" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            {/* Magnetic Clip bar */}
            <path d="M178 64 L242 64" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <circle cx="188" cy="64" r="3" fill="#cbd5e1" />
            <circle cx="232" cy="64" r="3" fill="#cbd5e1" />

            {/* Left Rim */}
            <rect x="48" y="54" width="134" height="84" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="8" />
            <rect x="56" y="62" width="118" height="68" rx="8" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <path d="M68 70 L140 70" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Rim */}
            <rect x="238" y="54" width="134" height="84" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="8" />
            <rect x="246" y="62" width="118" height="68" rx="8" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <path d="M258 70 L330 70" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'square':
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Deep Olive Acetate */}
            <path d="M42 64 L12 52 L8 54 L36 76 Z" fill="#14532d" />
            <path d="M378 64 L408 52 L412 54 L384 76 Z" fill="#14532d" />

            {/* Bridge */}
            <path d="M182 72 C194 68, 226 68, 238 72" stroke="#14532d" strokeWidth="11" strokeLinecap="round" />

            {/* Left Square Rim */}
            <rect x="48" y="50" width="134" height="90" rx="12" fill="#166534" stroke="#14532d" strokeWidth="9" />
            <rect x="56" y="58" width="118" height="74" rx="6" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <circle cx="56" cy="58" r="2.5" fill="#facc15" />
            <circle cx="62" cy="58" r="2.5" fill="#facc15" />
            <path d="M68 66 L130 66" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Square Rim */}
            <rect x="238" y="50" width="134" height="90" rx="12" fill="#166534" stroke="#14532d" strokeWidth="9" />
            <rect x="246" y="58" width="118" height="74" rx="6" fill={lensFill} stroke={lensStroke} strokeWidth="1.5" />
            <circle cx="364" cy="58" r="2.5" fill="#facc15" />
            <circle cx="358" cy="58" r="2.5" fill="#facc15" />
            <path d="M258 66 L320 66" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'aviator':
      default:
        return (
          <svg viewBox="0 0 420 180" className={className} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aviator-wire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Temples */}
            <path d="M48 64 L16 54 L12 56 L44 72" stroke="url(#aviator-wire)" strokeWidth="3" strokeLinecap="round" />
            <path d="M372 64 L404 54 L408 56 L376 72" stroke="url(#aviator-wire)" strokeWidth="3" strokeLinecap="round" />

            {/* Top Brow Bar */}
            <path d="M90 48 L330 48" stroke="url(#aviator-wire)" strokeWidth="3.5" strokeLinecap="round" />
            {/* Lower Bridge */}
            <path d="M184 70 C196 66, 224 66, 236 70" stroke="url(#aviator-wire)" strokeWidth="3.5" strokeLinecap="round" />

            {/* Left Teardrop Aviator Rim */}
            <path
              d="M60 52 C95 48, 165 48, 184 68 C195 82, 182 125, 150 144 C110 160, 68 140, 56 108 C48 86, 48 62, 60 52 Z"
              fill={lensFill}
              stroke="url(#aviator-wire)"
              strokeWidth="4"
            />
            <path d="M74 62 C95 56, 140 56, 165 72" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Teardrop Aviator Rim */}
            <path
              d="M360 52 C325 48, 255 48, 236 68 C225 82, 238 125, 270 144 C310 160, 352 140, 364 108 C372 86, 372 62, 360 52 Z"
              fill={lensFill}
              stroke="url(#aviator-wire)"
              strokeWidth="4"
            />
            <path d="M346 62 C325 56, 280 56, 255 72" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return <div className="flex items-center justify-center select-none">{renderEyewearSvg()}</div>;
};
