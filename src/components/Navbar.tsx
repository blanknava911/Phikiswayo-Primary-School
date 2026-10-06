import React, { useState } from 'react';
import { TabType } from '../types';
import { SchoolCrest } from './SchoolCrest';
import {
  Menu, 
  X, 
  Info, 
  GraduationCap, 
  Calendar, 
  Send, 
  Home, 
  Newspaper, 
  Download
} from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME } from '../utils/admissionForm';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'about' as TabType, label: 'About Us', icon: Info },
    { id: 'admissions' as TabType, label: 'Admissions', icon: GraduationCap },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
    { id: 'news' as TabType, label: 'News', icon: Newspaper },
    { id: 'contact' as TabType, label: 'Contact & Socials', icon: Send },
  ];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white border-b border-neutral-200">
      {/* Main Clean Sticky Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Crest & School Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          id="nav-brand-logo"
        >
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-white p-1 shadow-sm ring-1 ring-neutral-200 transition-colors group-hover:ring-red-200">
            <SchoolCrest size={50} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#ff2121] tracking-tight font-display leading-tight">
              Phikiswayo Primary School
            </h1>
            <p className="text-xs text-neutral-500 font-medium tracking-wide">
              Ntuzuma, KZN • <span className="text-[#ff2121] font-semibold italic">Strive for Success</span>
            </p>
          </div>
        </button>

        {/* Desktop Nav Links & Quick Download Button */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-link-${item.id}`}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#ff2121] text-white shadow-sm'
                    : 'text-neutral-700 hover:text-[#ff2121] hover:bg-neutral-100'
                }`}
              >
                {Icon && (
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                )}
                <span>{item.label}</span>
                {item.id === 'admissions' && (
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isActive ? 'bg-white text-[#ff2121]' : 'bg-red-100 text-[#ff2121]'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-5 w-px bg-neutral-300 mx-1"></div>

          {/* Direct Native PDF Download in Navbar (never blocked by Chrome) */}
          <a
            href={ADMISSION_FORM_PATH}
            download={ADMISSION_FORM_FILENAME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition cursor-pointer no-underline"
            id="nav-quick-download-pdf"
            title="Download Official Admission Form (PDF)"
          >
            <Download className="w-3.5 h-3.5 text-[#ff4d4d]" />
            <span>Download Form</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={ADMISSION_FORM_PATH}
            download={ADMISSION_FORM_FILENAME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ff2121] text-white shadow-sm transition cursor-pointer no-underline"
            id="mobile-nav-download-pdf"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
            id="btn-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff2121]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-1.5 shadow-xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#ff2121] text-white'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#ff2121]'}`} />}
                  <span>{item.label}</span>
                </div>
                {item.id === 'admissions' && (
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isActive ? 'bg-white text-[#ff2121]' : 'bg-red-100 text-[#ff2121]'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-extrabold bg-neutral-900 text-white shadow-md transition cursor-pointer no-underline"
            >
              <Download className="w-4 h-4 text-[#ff4d4d]" />
              <span>Download Official Admission Form (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
