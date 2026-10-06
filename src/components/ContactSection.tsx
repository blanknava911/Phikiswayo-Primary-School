import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Copy,
  Music2
} from 'lucide-react';
import { SchoolQueryForm } from './SchoolQueryForm';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="py-20 bg-[#F9F9F9]" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Prominent "Follow & Like Our Pages" Section */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 mb-16 shadow-md flex flex-col md:flex-row items-center justify-between gap-6" id="social-follow-banner">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-wider mb-2">
              Community & Socials
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#ff2121] font-display">
              Follow & Like Our Pages
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Stay connected with school announcements, sports fixtures, and learner celebrations.
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="flex flex-wrap items-center gap-3" id="social-buttons-group">
            
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Phikiswayo-Primary-School/61590967820774/#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              id="social-btn-facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@phikiswayo.primar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              id="social-btn-tiktok"
            >
              <Music2 className="w-5 h-5" />
              <span>TikTok</span>
            </a>

          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="contact-directory-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Official Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            School Contact Directory
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Reach out to our administrative team or visit during official school hours.
          </p>
        </div>

        {/* School Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="contact-cards-grid">
          
          {/* Address */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-address">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <MapPin className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Physical Address
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              <strong>Phikiswayo Primary School</strong><br />
              348 Khangela St, Ntuzuma A<br />
              Ntuzuma, 4360<br />
              KwaZulu-Natal, South Africa
            </p>
            <button
              onClick={() => handleCopy('348 Khangela St, Ntuzuma A, 4360', 'address')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              id="copy-address-btn"
            >
              {copiedField === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'address' ? 'Copied!' : 'Copy Address'}</span>
            </button>
          </div>

          {/* Phone */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-phone">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <Phone className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Telephone & Enquiries
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              Phone: <strong className="text-base text-neutral-900">081 509 1460</strong><br />
              Office Hours: Mon – Fri: 07:30 – 15:30<br />
              Direct parent helpline & office desk
            </p>
            <div className="flex items-center justify-center gap-2">
              <a
                href="tel:0815091460"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#ff2121] hover:bg-[#e01a1a] px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                id="call-now-btn"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <button
                onClick={() => handleCopy('081 509 1460', 'phone')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                id="copy-phone-btn"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition" id="contact-card-email">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-[#ff2121] flex items-center justify-center mb-5">
              <Mail className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#ff2121] mb-2">
              Official Email
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4 truncate font-medium">
              PHIKISWAYO-PS@kznschools.gov.za<br />
              <span className="text-xs text-neutral-500">
                Pinetown District • KZN Department of Basic Education
              </span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <a
                href="mailto:PHIKISWAYO-PS@kznschools.gov.za"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#ff2121] hover:bg-[#e01a1a] px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                id="email-us-btn"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
              <button
                onClick={() => handleCopy('PHIKISWAYO-PS@kznschools.gov.za', 'email')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#ff2121] bg-neutral-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                id="copy-email-btn"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Online Enquiries & Call Back Request Form */}
        <SchoolQueryForm />

      </div>
    </section>
  );
};
