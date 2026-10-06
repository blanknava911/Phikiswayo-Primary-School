import React from 'react';
import { TabType } from '../types';
import { 
  GraduationCap, 
  Send, 
  ArrowRight,
  Download
} from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME } from '../utils/admissionForm';
import { publicAssetPath } from '../utils/assets';

interface HeroSectionProps {
  setActiveTab: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  const heroImage = publicAssetPath('school-hero.jpg');

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white pt-16 pb-20 sm:pt-20 sm:pb-28" id="hero-section">
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left" id="hero-main-content">
            
            {/* Live Admissions Alert Ribbon */}
            <div 
              onClick={() => setActiveTab('admissions')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-600/95 hover:bg-red-600 border border-white/40 text-white text-xs sm:text-sm font-extrabold shadow-xl backdrop-blur-md cursor-pointer transition transform hover:-translate-y-0.5 active:scale-95"
              id="hero-admissions-alert-badge"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300" />
              </span>
              <span>2026/2027 Admissions Open: Now Accepting Grade R – 7 Applications</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12]" id="hero-headline">
              Welcome to <span className="text-red-100">Phikiswayo Primary School</span>
            </h1>

            {/* Official Motto & Subtitle */}
            <p className="text-xl sm:text-2xl font-bold text-red-100 italic font-serif" id="hero-motto">
              "Quality Education in the Heart of Ntuzuma — Strive for Success"
            </p>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base text-neutral-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed" id="hero-description">
              Serving our community with dedication, resilience, and academic excellence. We empower around 900 learners in KwaZulu-Natal with strong foundational literacy, numeracy, and life values.
            </p>

            {/* Action Buttons: Admission Steps, Download Form, & Contact Us */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2" id="hero-actions-container">
              <button
                onClick={() => setActiveTab('admissions')}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-[#ff2121] px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                id="hero-btn-admission-steps"
              >
                <GraduationCap className="w-5 h-5 text-[#ff2121]" />
                <span>Admissions Guide</span>
              </button>

              <a
                href={ADMISSION_FORM_PATH}
                download={ADMISSION_FORM_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-900 text-white border border-red-300/40 hover:border-white px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-xl transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer no-underline"
                id="hero-btn-download-pdf"
              >
                <Download className="w-5 h-5 text-[#ff4d4d]" />
                <span>Download Form (PDF)</span>
              </a>

              <button
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center gap-2 bg-black/25 hover:bg-black/40 text-white border border-white/30 hover:border-white px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition backdrop-blur-sm cursor-pointer"
                id="hero-btn-contact-us"
              >
                <Send className="w-4 h-4 text-red-200" />
                <span>Contact Us</span>
              </button>
            </div>

          </div>

          {/* Hero Quick Info Card */}
          <div className="lg:col-span-5" id="hero-sidebar-card-container">
            <div className="bg-white text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200/80" id="hero-info-card">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[#ff2121] font-display">
                    In-Person Admissions
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    Ntuzuma Circuit, KwaZulu-Natal
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black border border-emerald-300 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Currently Enrolling
                </span>
              </div>

              {/* Notice Box */}
              <div className="bg-red-50 border-l-4 border-[#ff2121] p-4 rounded-r-lg mb-6">
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                  <strong>Notice:</strong> All admission applications are completed in person at our school administration office at 348 Khangela Street.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Free Daily Nutrition Scheme (NSNP) for all learners</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Complete CAPS Curriculum from Grade R to Grade 7</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Sports, cultural activities and holistic development</span>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between gap-2">
                <a
                  href={ADMISSION_FORM_PATH}
                  download={ADMISSION_FORM_FILENAME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-neutral-800 hover:text-[#ff2121] flex items-center gap-1.5 cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition no-underline"
                  id="hero-card-download-btn"
                >
                  <Download className="w-3.5 h-3.5 text-[#ff2121]" />
                  <span>Download Form</span>
                </a>
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="text-xs font-bold text-[#ff2121] hover:underline flex items-center gap-1 cursor-pointer"
                  id="hero-card-admission-guide-btn"
                >
                  <span>Admission Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
