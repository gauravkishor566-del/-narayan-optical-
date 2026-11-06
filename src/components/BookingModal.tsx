import React, { useState } from 'react';
import { STORE_INFO, DIAGNOSTIC_SERVICES } from '../data/opticalData';
import { X, Calendar, Clock, User, Phone, CheckCircle, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  packageDetails?: {
    frameName: string;
    totalPrice: number;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  packageDetails
}) => {
  const [service, setService] = useState<string>(
    preselectedService || DIAGNOSTIC_SERVICES[0].name
  );
  const [date, setDate] = useState<string>('Tomorrow');
  const [timeSlot, setTimeSlot] = useState<string>('11:30 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(
    packageDetails ? `Interested in ${packageDetails.frameName} (Est: ₹${packageDetails.totalPrice})` : ''
  );
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
    '08:30 PM'
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    // Send formatted WhatsApp booking message
    const text = encodeURIComponent(
      `*Narayan Optical - New Clinic Appointment Request*\n\n` +
      `👤 *Patient:* ${fullName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🩺 *Exam Service:* ${service}\n` +
      `🗓 *Preferred Date:* ${date}\n` +
      `⏰ *Time Slot:* ${timeSlot}\n` +
      (notes ? `📝 *Notes/Frame:* ${notes}\n` : '') +
      `📍 *Location:* Narayan Optical, 401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra\n\n` +
      `Please confirm my guaranteed zero-waiting slot!`
    );
    window.open(`https://wa.me/917037005522?text=${text}`, '_blank');
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Appointment Request Sent!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. Our optometrist at our clinic on Jivan Jyoti Hospital Road, Avas Vikas Colony will verify your slot shortly via WhatsApp or call.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 max-w-xs mx-auto">
              <p><strong>Service:</strong> {service}</p>
              <p><strong>Slot:</strong> {date} at {timeSlot}</p>
              <p><strong>Store:</strong> 401/4B, Avas Vikas Colony, Jivan Jyoti Hospital Road, Agra</p>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-teal-600 text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-teal-700"
              >
                Close &amp; Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-teal-700 text-xs font-bold uppercase tracking-wider">
                COMPLIMENTARY CLINICAL CARE
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 font-display">
                Book In-Store Eye Exam
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Guaranteed zero waiting time at our Avas Vikas Colony clinic, Agra.
              </p>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4 text-xs">
              
              {/* Select Service */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Select Eye Exam / Fitting Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                >
                  {DIAGNOSTIC_SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.duration})
                    </option>
                  ))}
                  <option value="Spectacle Frame Trial & Lens Consultation">
                    Spectacle Frame Trial &amp; Lens Consultation
                  </option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Preferred Day
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                  >
                    <option value="Today">Today (Walk-in Slot)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend (Saturday)">This Saturday</option>
                    <option value="This Weekend (Sunday)">This Sunday</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                  />
                </div>
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  WhatsApp Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7037005522"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Preferred Frame / Power Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Looking for blue-cut progressives"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Slot &amp; Notify Clinic on WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  No payment required online. Exam is complimentary with purchase.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
