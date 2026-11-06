import React, { useState } from 'react';
import { STORE_INFO, OPTOMETRIST_PROFILE } from '../data/opticalData';
import { MapPin, Clock, Phone, Send, ExternalLink, Navigation, Compass, CheckCircle, Layers, ZoomIn } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

const STORE_COORDINATES = {
  lat: 27.1852,
  lng: 77.9620
};

export const StoreLocation: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'directions'>('roadmap');
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
    const query = encodeURIComponent("401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra");
    if (mapType === 'satellite') {
      return `https://maps.google.com/maps?q=${query}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;
    }
    return `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

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
                    <strong className="text-slate-700 font-semibold">Landmark:</strong> Directly on Jivan Jyoti Hospital Road, Sector 3, Avas Vikas Colony
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

          {/* Right Column (7 cols): Real Google Map & Directions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Styled Map Card with Genuine Google Maps */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              
              {/* Map Bar Controls */}
              <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-wide">
                      Narayan Optical on Google Maps
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMapType('roadmap')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      mapType === 'roadmap'
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapType('satellite')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      mapType === 'satellite'
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Satellite</span>
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

              {/* Genuine Google Map Display Container (explicit height as per CF2) */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-100 overflow-hidden">
                {apiKey ? (
                  <APIProvider apiKey={apiKey}>
                    <Map
                      mapId="DEMO_MAP_ID"
                      internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                      defaultCenter={STORE_COORDINATES}
                      defaultZoom={16}
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
                          background="#0d9488"
                          borderColor="#042f2e"
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
                            <h5 className="font-bold text-sm text-teal-800">Narayan Optical</h5>
                            <p className="text-xs text-slate-600 mt-0.5">
                              401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra
                            </p>
                            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                              Open Today: 10:00 AM – 8:45 PM
                            </p>
                            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                              <a
                                href={STORE_INFO.mapUrl}
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
                  // Google Maps High-Fidelity Embed (Always active and renders interactive Google Map without blocking)
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

                {/* Floating Clean Badge (Compact, non-intrusive in corner) */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/90 pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                    <span className="font-bold text-slate-900 text-xs">Narayan Optical · Jivan Jyoti Hospital Road</span>
                  </div>
                </div>

                <a
                  href={STORE_INFO.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-slate-200 text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View in Full Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Navigation Action Buttons */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=401%2F4B%2C+Avas+Vikas+Colony%2C+Jivan+Jyoti+Hospital+Road%2C+Agra`}
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

              {/* How to Reach from Around Agra */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>How to Reach from Around Agra</span>
                </h3>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>From Avas Vikas Colony / Sikandra Corridor</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Head along Jivan Jyoti Hospital Road into Sector 3. Narayan Optical is located directly on Jivan Jyoti Hospital Road, opposite Jivan Jyoti Hospital.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      <span>From Shahganj / Central Agra / Bodla Intersection</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Drive through the main Sector 3 access artery towards Jivan Jyoti Hospital Road (approx. 5–8 minutes drive). Free street parking is available right in front of the optical clinic.
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
