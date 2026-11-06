import React, { useState, useRef, useEffect } from 'react';
import { FRAMES, EyewearFrame, STORE_INFO } from '../data/opticalData';
import { GlassesRenderer } from './GlassesRenderer';
import { X, Camera, RefreshCw, Sparkles, Sliders, MessageCircle, Check, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFrame?: EyewearFrame;
  onSelectForStudio: (frame: EyewearFrame) => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  initialFrame,
  onSelectForStudio,
}) => {
  const [currentFrame, setCurrentFrame] = useState<EyewearFrame>(
    initialFrame || FRAMES[0]
  );
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

  // Adjustment sliders
  const [scale, setScale] = useState<number>(100);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [coatingPreview, setCoatingPreview] = useState<'none' | 'blue-cut' | 'photochromic'>('none');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Model face avatars
  const faceAvatars = [
    {
      name: 'Studio Portrait (Oval Face)',
      bg: 'from-slate-100 to-slate-200',
      faceType: 'oval'
    },
    {
      name: 'Studio Portrait (Square Face)',
      bg: 'from-amber-50 to-orange-100',
      faceType: 'square'
    },
    {
      name: 'Studio Portrait (Round Face)',
      bg: 'from-sky-50 to-blue-100',
      faceType: 'round'
    }
  ];

  useEffect(() => {
    if (initialFrame) {
      setCurrentFrame(initialFrame);
    }
  }, [initialFrame]);

  // Start webcam
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setUseCamera(true);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable', err);
      setCameraError('Camera access unavailable. Using high-resolution face avatar simulation instead.');
      setUseCamera(false);
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setUseCamera(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isOpen) return null;

  const handleInquireThisFrame = () => {
    const text = encodeURIComponent(
      `Hi Narayan Optical, I tried *${currentFrame.name}* on your Virtual Try-On studio. Can you hold this piece for my visit at your Agra clinic?`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-4 flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Virtual Try–On Studio
              </h3>
              <p className="text-[11px] text-slate-500">
                Fit designer frames to your face in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!useCamera ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Enable Camera</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Use Model Avatar</span>
              </button>
            )}

            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Try-On Viewport Stage */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-900 flex items-center justify-center overflow-hidden">
          
          {useCamera ? (
            /* Live Webcam Feed (mirrored) */
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />
          ) : (
            /* Photorealistic Face Canvas Simulation */
            <div className={`w-full h-full bg-gradient-to-b ${faceAvatars[selectedAvatar].bg} flex items-center justify-center relative select-none`}>
              {/* Simulated Face Geometry */}
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 flex flex-col items-center">
                
                {/* Hair line */}
                <div className="w-48 sm:w-56 h-28 bg-slate-800 rounded-t-full -mb-10 shadow-md"></div>
                
                {/* Head Oval */}
                <div className="w-44 sm:w-52 h-64 bg-[#fcd5b8] rounded-[50px] shadow-lg border border-amber-200/40 relative flex flex-col items-center pt-16">
                  
                  {/* Eyebrows */}
                  <div className="w-32 flex justify-between px-2 mb-2">
                    <div className="w-10 h-1.5 bg-amber-950/70 rounded-full rotate-3"></div>
                    <div className="w-10 h-1.5 bg-amber-950/70 rounded-full -rotate-3"></div>
                  </div>

                  {/* Eyes */}
                  <div className="w-32 flex justify-between px-3 mb-6">
                    <div className="w-6 h-3 bg-white rounded-full border border-slate-300 relative flex items-center justify-center">
                      <div className="w-3 h-3 bg-amber-900 rounded-full">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-6 h-3 bg-white rounded-full border border-slate-300 relative flex items-center justify-center">
                      <div className="w-3 h-3 bg-amber-900 rounded-full">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Nose */}
                  <div className="w-3 h-8 border-r-2 border-b-2 border-amber-400/50 rounded-br-md mb-6"></div>

                  {/* Lips */}
                  <div className="w-12 h-3 bg-rose-400/70 rounded-full"></div>

                </div>

                {/* Neck / Shoulders */}
                <div className="w-24 h-12 bg-[#ebb99b] -mt-2 rounded-b-xl"></div>
                <div className="w-64 sm:w-72 h-14 bg-slate-700 rounded-t-3xl shadow-md"></div>

              </div>
            </div>
          )}

          {/* Glasses Frame Overlay placed exactly over the eyes with transforms */}
          <div
            className="absolute z-20 pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale / 100})`,
              width: '320px',
              maxWidth: '85%'
            }}
          >
            <GlassesRenderer
              frame={currentFrame}
              coatingId={coatingPreview}
              height={120}
              className="drop-shadow-2xl"
            />
          </div>

          {/* Camera Error Banner if any */}
          {cameraError && (
            <div className="absolute top-3 inset-x-4 bg-amber-500/90 text-white text-xs px-3 py-1.5 rounded-xl text-center backdrop-blur-xs">
              {cameraError}
            </div>
          )}

          {/* Frame Name Tag Overlay */}
          <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2">
            <span>{currentFrame.name}</span>
            <span className="text-teal-400 font-mono">₹{currentFrame.storePrice.toLocaleString('en-IN')}</span>
          </div>

          {/* Face model avatar switcher if camera is off */}
          {!useCamera && (
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
              {faceAvatars.map((av, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAvatar(idx)}
                  className={`w-7 h-7 rounded-full border-2 text-[10px] font-bold flex items-center justify-center transition-all ${
                    selectedAvatar === idx
                      ? 'border-white bg-teal-600 text-white shadow-md scale-110'
                      : 'border-white/50 bg-black/40 text-white/80'
                  }`}
                  title={av.name}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Interactive Controls & Tuning Sliders */}
        <div className="p-4 sm:p-5 bg-white space-y-4">
          
          {/* Sliders strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 font-semibold mb-1">
                <span>Frame Size</span>
                <span>{scale}%</span>
              </div>
              <input
                type="range"
                min="75"
                max="135"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-600 font-semibold mb-1">
                <span>Bridge Height</span>
                <span>{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-600 font-semibold mb-1">
                <span>Lens Coating</span>
                <span className="capitalize">{coatingPreview}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCoatingPreview('none')}
                  className={`flex-1 py-1 px-1 rounded-md text-[10px] font-bold ${
                    coatingPreview === 'none' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  Clear
                </button>
                <button
                  onClick={() => setCoatingPreview('blue-cut')}
                  className={`flex-1 py-1 px-1 rounded-md text-[10px] font-bold ${
                    coatingPreview === 'blue-cut' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  Blue Cut
                </button>
                <button
                  onClick={() => setCoatingPreview('photochromic')}
                  className={`flex-1 py-1 px-1 rounded-md text-[10px] font-bold ${
                    coatingPreview === 'photochromic' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  Tinted
                </button>
              </div>
            </div>
          </div>

          {/* Frame Carousel Switcher */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">Choose Frame to Try</span>
              <span className="text-[11px] text-slate-400">Showing {FRAMES.length} Silhouettes</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FRAMES.map((f) => {
                const isCurrent = f.id === currentFrame.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setCurrentFrame(f)}
                    className={`p-2 rounded-xl text-left border shrink-0 w-36 transition-all ${
                      isCurrent
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="h-10 flex items-center justify-center">
                      <GlassesRenderer frame={f} height={36} />
                    </div>
                    <p className="text-[11px] font-bold text-slate-900 truncate mt-1">
                      {f.name}
                    </p>
                    <p className="text-[10px] font-mono text-teal-700 font-bold">
                      ₹{f.storePrice.toLocaleString('en-IN')}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => {
                onSelectForStudio(currentFrame);
                stopCamera();
                onClose();
                const el = document.getElementById('lens-studio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Add Lenses to this Frame in Studio</span>
            </button>

            <button
              onClick={handleInquireThisFrame}
              className="w-full sm:w-auto py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
