import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  GraduationCap, 
  ArrowRight, 
  Download, 
  X, 
  CheckCircle2, 
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME } from '../utils/admissionForm';

interface FloatingAdmissionsBadgeProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const FloatingAdmissionsBadge: React.FC<FloatingAdmissionsBadgeProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // If already on the admissions tab or dismissed, hide
  if (isDismissed || activeTab === 'admissions') {
    return null;
  }

  const handleOpenGuide = () => {
    setActiveTab('admissions');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-5 right-5 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300"
      id="floating-admissions-widget"
    >
      {!isOpen ? (
        /* Minimized Eye-Catching Pill */
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-neutral-950 hover:bg-[#ff2121] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border-2 border-red-500/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-red-500/30 active:scale-95 cursor-pointer"
            id="floating-admissions-trigger-btn"
          >
            {/* Glowing Live Beacon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
            </span>

            <div className="flex items-center gap-1.5 text-left">
              <GraduationCap className="w-4 h-4 text-amber-300 group-hover:text-white" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                Admissions Now Open
              </span>
            </div>

            <span className="bg-red-600 group-hover:bg-black/30 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Apply
            </span>
          </button>

          {/* Quick Dismiss 'X' Button on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-950 flex items-center justify-center text-[10px] shadow border border-neutral-700 cursor-pointer"
            title="Dismiss badge"
            aria-label="Dismiss badge"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        /* Expanded Floating Card with Quick Actions */
        <div 
          className="bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#ff2121] text-neutral-900 w-80 sm:w-88 animate-in zoom-in-95 duration-200"
          id="floating-admissions-card"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#ff2121] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black uppercase text-[#ff2121] tracking-wider">
                    Now Enrolling
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-neutral-950 leading-tight">
                  2026/2027 Admissions Open
                </h4>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
              title="Close card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-3 space-y-2 text-xs text-neutral-600">
            <p className="font-medium text-neutral-800 leading-snug">
              Applications are currently active for <strong>Grades R through 7</strong> at Phikiswayo Primary School.
            </p>

            <div className="bg-red-50/70 rounded-xl p-2.5 space-y-1.5 border border-red-100 text-[11px] text-neutral-700">
              <div className="flex items-center gap-2 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#ff2121] shrink-0" />
                <span>Submit at: 348 Khangela St, Ntuzuma A</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#ff2121] shrink-0" />
                <a href="tel:0815091460" className="hover:underline text-neutral-900">
                  Enquiries: 081 509 1460
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleOpenGuide}
              className="w-full flex items-center justify-center gap-2 bg-[#ff2121] hover:bg-[#e01a1a] text-white py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
              id="floating-view-guide-btn"
            >
              <span>View Full Admissions Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer no-underline"
              id="floating-download-form-btn"
            >
              <Download className="w-3.5 h-3.5 text-[#ff4d4d]" />
              <span>Download PDF Form</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
