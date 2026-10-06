import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CookieNotice } from './components/CookieNotice';
import { LegalSection } from './components/LegalSection';
import { AdmissionsNotificationBanner } from './components/AdmissionsNotificationBanner';
import { FloatingAdmissionsBadge } from './components/FloatingAdmissionsBadge';
import { publicAssetPath } from './utils/assets';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description }) => (
  <div className="relative overflow-hidden bg-neutral-950 text-white py-12 px-4 sm:px-8 text-center space-y-2">
    <img
      src={publicAssetPath('school-hero.jpg')}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/70" />
    <div className="relative z-10 space-y-2">
      <span className="text-xs font-bold text-red-100 uppercase tracking-widest">
        {eyebrow}
      </span>
      <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
        {title}
      </h1>
      <p className="text-red-50 text-sm sm:text-base max-w-xl mx-auto">
        {description}
      </p>
    </div>
  </div>
);

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-[#F9F9F9] text-[#1A1A1A]">
      
      {/* Top Eye-Catching Admissions Notification Announcement */}
      <AdmissionsNotificationBanner setActiveTab={setActiveTab} />

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <AboutSection setActiveTab={setActiveTab} />
            <AdmissionsSection />
            <NewsSection />
            <EventsSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'about' && (
          <>
            <PageHeader
              eyebrow="Our Identity & Heritage"
              title="About Phikiswayo Primary School"
              description={'Quality education in the heart of Ntuzuma, KwaZulu-Natal - living our motto: "Strive for Success".'}
            />
            <AboutSection setActiveTab={setActiveTab} />
          </>
        )}

        {activeTab === 'admissions' && (
          <>
            <PageHeader
              eyebrow="Enrolment Information"
              title="Admissions & Enrolment"
              description="In-person admission steps, required document checklist, and school administration office details."
            />
            <AdmissionsSection />
          </>
        )}

        {activeTab === 'events' && (
          <>
            <PageHeader
              eyebrow="Calendar & Highlights"
              title="School Events"
              description="Stay updated with our academic assessments, athletic tournaments, and parent meetings."
            />
            <EventsSection />
          </>
        )}

        {activeTab === 'news' && (
          <>
            <PageHeader
              eyebrow="Announcements"
              title="News & Notices"
              description="Important updates for parents, guardians, learners, and the school community."
            />
            <NewsSection />
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <PageHeader
              eyebrow="Get In Touch"
              title="Contact & Socials Directory"
              description="348 Khangela Street, Ntuzuma A, KwaZulu-Natal. We are ready to assist you."
            />
            <ContactSection />
          </>
        )}

        {activeTab === 'terms' && (
          <>
            <PageHeader
              eyebrow="Website Terms"
              title="Terms of Service"
              description="How visitors may use the public Phikiswayo Primary School website and its information."
            />
            <LegalSection mode="terms" />
          </>
        )}

        {activeTab === 'cookies' && (
          <>
            <PageHeader
              eyebrow="Privacy & Cookies"
              title="Cookie and Privacy Notice"
              description="How this website handles basic browser storage, public information, and privacy."
            />
            <LegalSection mode="cookies" />
          </>
        )}
      </main>

      {/* Footer Section */}
      <Footer setActiveTab={setActiveTab} />
      <CookieNotice setActiveTab={setActiveTab} />
      <FloatingAdmissionsBadge activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
