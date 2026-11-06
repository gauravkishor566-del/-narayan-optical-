import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EyewearShowroom } from './components/EyewearShowroom';
import { KnowYourOptometrist } from './components/KnowYourOptometrist';
import { ContactLensSection } from './components/ContactLensSection';
import { ClinicalOptometry } from './components/ClinicalOptometry';
import { VisionScreening } from './components/VisionScreening';
import { StoreGallery } from './components/StoreGallery';
import { PatientReviews } from './components/PatientReviews';
import { StoreLocation } from './components/StoreLocation';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { BookingModal } from './components/BookingModal';
import { EyewearFrame } from './data/opticalData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  React.useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleOpenBooking = (service?: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookTrial = (frame?: EyewearFrame) => {
    if (frame) {
      handleOpenBooking(`In-Store Frame Trial & Fitting: ${frame.name} (${frame.brand})`);
    } else {
      handleOpenBooking('In-Store Eyewear Frame Trial & Styling Consultation');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Quota Exceeded Defense Banner (GMP Terms & Defense) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Header & Sticky Navigation */}
      <Header
        onBookExam={() => handleOpenBooking('General Computerized Eye Exam')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookExam={() => handleOpenBooking('General Computerized Eye Exam')}
        />

        {/* Curated Eyewear Showroom (All glasses with real photos, no prices) */}
        <EyewearShowroom
          onBookTrial={handleBookTrial}
        />

        {/* Know Your Optometrist Section (Mr. Dilip Narayan Profile & Philosophy) */}
        <KnowYourOptometrist
          onBookExam={() => handleOpenBooking('Personal Consultation with Mr. Dilip Narayan')}
        />

        {/* Contact Lens Studio Section (Bausch & Lomb, Acuvue, Alcon, CooperVision) */}
        <ContactLensSection
          onBookFitting={() => handleOpenBooking('Contact Lens Fitting & Corneal Assessment')}
        />

        {/* Clinical Optometry & Diagnostic Excellence */}
        <ClinicalOptometry
          onBookService={(serviceName) => handleOpenBooking(serviceName)}
        />

        {/* Complimentary 2-Minute Vision Self-Check */}
        <VisionScreening
          onBookExam={() => handleOpenBooking('Computerized Auto-Refraction & Vision Exam')}
        />

        {/* In-Store Experience & Real Facility Photos */}
        <StoreGallery />

        {/* Verified Agra Patient Reviews */}
        <PatientReviews />

        {/* Store Location, Timings (10 AM to 8:45 PM), Map & Directions */}
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky Quick Action Bar (Call, WhatsApp, Book Test) */}
      <StickyBottomBar
        onBookExam={() => handleOpenBooking('General Computerized Eye Exam')}
      />

      {/* Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
