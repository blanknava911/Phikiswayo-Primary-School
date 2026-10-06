import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  BellRing, 
  GraduationCap, 
  Download, 
  ArrowRight, 
  Phone, 
  X, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME } from '../utils/admissionForm';

interface AdmissionsNotificationBannerProps {
  setActiveTab: (tab: TabType) => void;
}

export const AdmissionsNotificationBanner: React.FC<AdmissionsNotificationBannerProps> = ({
  setActiveTab,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs py-1 px-4 text-center">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-neutral-300 hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer font-medium"
          id="reopen-admissions-banner-btn"
        >
          <BellRing className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Notice: <strong>Admissions Are Currently Open (Grades R – 7)</strong> — Click to view details</span>
        </button>
      </div>
    );
  }

  const handleOpenAdmissions = () => {
    setActiveTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="School Admissions Announcement"
      className="relative z-50 overflow-hidden bg-gradient-to-r from-neutral-950 via-[#bf1111] to-[#990000] text-white shadow-lg border-b border-red-500/30"
      id="admissions-notification-banner"
    >
      {/* Animated Subtle Shimmer Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Alert Beacon & Main Message */}
          <div className="flex items-center gap-3 text-center md:text-left flex-1">
            {/* Pulsing Beacon Icon */}
            <div className="hidden sm:flex shrink-0 w-9 h-9 rounded-xl bg-white/15 border border-white/20 items-center justify-center text-amber-300 shadow-inner">
              <BellRing className="w-4 h-4 animate-bounce" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[11px] font-black uppercase tracking-wider shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
                  ADMISSIONS NOW OPEN
                </span>
                <span className="text-xs font-bold text-red-100 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Grades R to 7 • 2026 / 2027 Academic Year
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/95 font-medium leading-snug">
                We are currently accepting learner admission applications! Submit completed forms in person at our administration office.
              </p>
            </div>
          </div>

          {/* Right: Action Buttons & Dismiss */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            
            {/* Guide Button */}
            <button
              onClick={handleOpenAdmissions}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-100 text-[#ff2121] px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold shadow-md transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              id="banner-admission-guide-btn"
            >
              <span>Admission Guide & Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Download Button */}
            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 border border-white/30 text-white px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer no-underline"
              id="banner-download-form-btn"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Download Form</span>
            </a>

            {/* Quick Call Link */}
            <a
              href="tel:0815091460"
              className="hidden lg:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold transition"
              title="Call school administration office"
              id="banner-call-office-btn"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>081 509 1460</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition ml-1 cursor-pointer"
              title="Dismiss announcement"
              aria-label="Dismiss announcement"
              id="banner-dismiss-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
