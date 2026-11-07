import React, { useState } from 'react';
import { STORE_INFO, OPTOMETRIST_PROFILE } from '../data/opticalData';
import { MapPin, Clock, Phone, Send, ExternalLink, Navigation, Compass, CheckCircle, Layers, ZoomIn, Calendar, MessageCircle, Search } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

const STORE_COORDINATES = {
  lat: 27.2012,
  lng: 77.9596
};

interface StoreLocationProps {
  onBookExam?: () => void;
}

export const StoreLocation: React.FC<StoreLocationProps> = ({ onBookExam }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapMode, setMapMode] = useState<'verified' | 'live'>('verified');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  // Read provisioned Google Maps API key from Vite environment
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const query = message.trim() || 'General inquiry regarding eye testing / frame availability';
    const text = encodeURIComponent(
      `*Narayan Optical - Direct Message*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone || 'Not provided'}\n` +
      `💬 *Query:* ${query}\n\n` +
      `Sent via website contact desk.`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const getEmbedUrl = () => {
    const query = encodeURIComponent("Narayan Optical & Optometry Clinic, Jivan Jyoti Hospital Road, Avas Vikas Colony, Agra");
    if (mapType === 'satellite') {
      return `https://maps.google.com/maps?q=${query}&t=k&z=17&ie=UTF8&iwloc=B&output=embed`;
    }
    return `https://maps.google.com/maps?q=${query}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Narayan+Optical+%26+Optometry+Clinic+Agra`;

  return (
    <section id="location" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-teal-700 text-xs sm:text-sm font-bold tracking-wider uppercase">
            VISIT OUR STORE &amp; CLINIC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Conveniently Located on Jivan Jyoti Hospital Road, Avas Vikas Colony, Agra
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Easy parking right in front of the clinic. Open all 7 days (10:00 AM – 8:45 PM) with senior optometrist on-site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Store Details & Contact */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Store & Clinic Address Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Store &amp; Clinic Address
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    401/4B, Avas Vikas Colony<br />
                    Jivan Jyoti Hospital Road, Agra
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    <strong className="text-slate-700 font-semibold">Landmarks:</strong> Jivan Jyoti Hospital Road, near Bajaj Finance Branch &amp; NV Road, Sector 3/4B
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call 7037005522</span>
                </a>
              </div>
            </div>

            {/* Store Timings Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-teal-700 uppercase block">
                    STORE &amp; CLINIC TIMINGS
                  </span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    10:00 AM – 8:45 PM
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Monday – Sunday (All 7 Days)
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-2">
                    Open All 7 Days (10 AM to 8:45 PM) · Walk-Ins Welcome
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Contact Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-teal-700 uppercase block">
                    OWNER CONTACT &amp; SENIOR OPTOMETRIST
                  </span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5 font-mono">
                    +91 7037005522
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {OPTOMETRIST_PROFILE.name} · Direct Call &amp; WhatsApp Desk
                  </p>
                  <p className="text-xs text-teal-700 font-medium mt-1.5">
                    Instant response for power queries &amp; clinic appointments
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Send a Direct Message to the Store
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Have a question about specific frame availability, lens replacement, or eye power checkup?
              </p>

              {submitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-teal-600 mx-auto" />
                  <p className="text-xs font-bold text-teal-900">Message Prepared for WhatsApp!</p>
                  <p className="text-[11px] text-teal-700">Thank you. You can also call us directly at 7037005522.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-teal-800 font-semibold underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitWhatsApp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Gaurav"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 7037005522"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message / Query (Optional)</label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Do you have Scott geometric frames in stock?"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Store via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column (7 cols): Verified Google Maps Listing & Interactive Navigation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Styled Google Maps Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md">
              
              {/* Top Navigation & Mode Switcher Bar */}
              <div className="px-4 sm:px-5 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
                      <span>Narayan Optical &amp; Optometry Clinic</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Jivan Jyoti Hospital Road, Avas Vikas Colony, Agra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMapMode('verified')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      mapMode === 'verified'
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Google Maps View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('live')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      mapMode === 'live'
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Live Embed</span>
                  </button>
                  <a
                    href={STORE_INFO.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>Open App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Main Map Presentation */}
              {mapMode === 'verified' ? (
                /* Authentic Verified Google Maps Card (As seen on user's Google Maps screenshot) */
                <div className="relative bg-slate-100 flex flex-col items-center justify-center border-b border-slate-200 p-3 sm:p-5">
                  <div className="relative w-full max-w-[480px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                    <img
                      src="/assets/store/google_maps_focused.jpg"
                      alt="Narayan Optical & Optometry Clinic on Google Maps"
                      className="w-full h-auto object-contain block select-none"
                    />

                    {/* Interactive Overlay Hotspots directly on the map */}
                    {/* Top Search Bar Click Area */}
                    <a
                      href={STORE_INFO.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-2 left-3 right-3 h-12 rounded-full cursor-pointer z-20 hover:ring-2 hover:ring-teal-500/50 transition-all"
                      title="Open Narayan Optical & Optometry Clinic on Google Maps"
                    >
                      <span className="sr-only">Open on Google Maps</span>
                    </a>

                    {/* Clinic Red Pin Pulse Indicator */}
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                      title="Get Directions to Narayan Optical"
                    >
                      <div className="relative">
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500"></span>
                        </span>
                      </div>
                    </a>

                    {/* Floating Bottom Quick Action Strip */}
                    <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200">
                      <a
                        href={googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions</span>
                      </a>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=27.2012,77.9596`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5 text-sky-600" />
                        <span>Start</span>
                      </a>

                      <a
                        href="https://wa.me/917037005522?text=Hi%20Narayan%20Optical,%20I%20am%20looking%20for%20your%20store%20location%20on%20Jivan%20Jyoti%20Hospital%20Road,%20Agra."
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ask</span>
                      </a>

                      {onBookExam && (
                        <button
                          type="button"
                          onClick={onBookExam}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          <span>Book</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Verified Notice Strip */}
                  <div className="w-full max-w-[480px] mx-auto mt-2.5 px-3 py-1.5 bg-white/90 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>Google Maps Listing · Narayan Optical &amp; Optometry Clinic</span>
                    </span>
                    <a
                      href={STORE_INFO.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-700 hover:underline flex items-center gap-1"
                    >
                      <span>Open App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Live Interactive Map Embed */
                <div className="relative w-full h-80 sm:h-96 bg-slate-100 overflow-hidden">
                  {apiKey ? (
                    <APIProvider apiKey={apiKey}>
                      <Map
                        mapId="DEMO_MAP_ID"
                        internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                        defaultCenter={STORE_COORDINATES}
                        defaultZoom={17}
                        mapTypeId={mapType === 'satellite' ? 'hybrid' : 'roadmap'}
                        gestureHandling="cooperative"
                        disableDefaultUI={false}
                        className="w-full h-full"
                      >
                        <AdvancedMarker
                          position={STORE_COORDINATES}
                          onClick={() => setIsInfoWindowOpen(true)}
                          title="Narayan Optical & Optometry Clinic"
                        >
                          <Pin
                            background="#dc2626"
                            borderColor="#7f1d1d"
                            glyphColor="#ffffff"
                            scale={1.2}
                          />
                        </AdvancedMarker>

                        {isInfoWindowOpen && (
                          <InfoWindow
                            position={STORE_COORDINATES}
                            onCloseClick={() => setIsInfoWindowOpen(false)}
                          >
                            <div className="p-2 text-slate-900 max-w-xs font-sans">
                              <h5 className="font-bold text-sm text-teal-800">Narayan Optical &amp; Optometry Clinic</h5>
                              <p className="text-xs text-slate-600 mt-0.5">
                                401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra
                              </p>
                              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                                Open Today: 10:00 AM – 8:45 PM
                              </p>
                              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                                <a
                                  href={googleMapsDirectionsUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-teal-700 font-bold hover:underline"
                                >
                                  Directions →
                                </a>
                                <a
                                  href="tel:7037005522"
                                  className="text-xs text-slate-600 font-medium"
                                >
                                  Call 7037005522
                                </a>
                              </div>
                            </div>
                          </InfoWindow>
                        )}
                      </Map>
                    </APIProvider>
                  ) : (
                    <iframe
                      title="Narayan Optical Google Maps Location"
                      src={getEmbedUrl()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  )}

                  {/* Live Map Marker Pill */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 flex flex-col items-center">
                    <div className="px-3 py-1.5 bg-slate-950/95 backdrop-blur-md text-white border border-teal-400/80 rounded-xl shadow-xl flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                      <div className="text-left">
                        <p className="text-xs font-black tracking-wide text-teal-300">Narayan Optical &amp; Optometry Clinic</p>
                        <p className="text-[10px] text-slate-300 font-medium">Jivan Jyoti Hospital Road, Agra</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
                        <MapPin className="w-4 h-4 fill-white text-red-700" />
                      </div>
                      <div className="w-2.5 h-2.5 bg-red-600 rotate-45 mx-auto -mt-1 shadow-md border-r-2 border-b-2 border-white"></div>
                    </div>
                    <div className="w-3.5 h-1 bg-slate-950/40 rounded-full blur-[1px] mt-0.5"></div>
                  </div>

                  <a
                    href={STORE_INFO.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-slate-200 text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors z-20"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View in Full Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Navigation Action Buttons Below Map */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions (GPS)</span>
                </a>

                <a
                  href={`tel:7037005522`}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold shadow-2xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call Store for Landmark Help</span>
                </a>
              </div>

              {/* How to Reach & Surrounding Landmarks from Google Maps */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>Surrounding Landmarks &amp; Access Routes</span>
                </h3>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>Verified Google Maps Landmarks Near Store</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Located on Jivan Jyoti Hospital Road (NV Rd) right near <strong>Bajaj Finance Branch</strong>, <strong>Sagar Saree Kendra</strong>, <strong>B.H. Electronic</strong>, and <strong>SR Traders</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>From Avas Vikas Colony / Sikandra Corridor</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Head along Jivan Jyoti Hospital Road into Sector 3 / Sector 4B. Narayan Optical is located directly on Jivan Jyoti Hospital Road with prominent signage and ground-floor glass entrance.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-xs text-emerald-800">
                    <strong>Hassle-Free Visit:</strong> Reserved two-wheeler and four-wheeler parking available directly in front of the clinic. Wheelchair accessible ground floor entrance.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
