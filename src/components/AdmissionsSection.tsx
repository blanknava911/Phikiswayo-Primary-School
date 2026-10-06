import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  Eye, 
  FileCheck2, 
  Printer, 
  FileText, 
  Layers, 
  Phone,
  ExternalLink
} from 'lucide-react';
import { ADMISSION_FORM_PATH, ADMISSION_FORM_FILENAME, openAdmissionForm } from '../utils/admissionForm';
import { AdmissionFormModal } from './AdmissionFormModal';
import { GeneratedAdmissionForm } from './GeneratedAdmissionForm';
import { SchoolCrest } from './SchoolCrest';

export const AdmissionsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState<1 | 2 | 'all'>('all');
  const [inlineViewMode, setInlineViewMode] = useState<'checklist' | 'reader'>('checklist');
  const [readerPage, setReaderPage] = useState<1 | 2 | 'all'>('all');

  // Interactive Document Checklist state for parents
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    doc1: false,
    doc2: false,
    doc3: false,
    doc4: false,
  });

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openModalWithPage = (page: 1 | 2 | 'all') => {
    setModalPage(page);
    setIsModalOpen(true);
  };

  const allChecked = Object.values(checkedDocs).every(Boolean);

  return (
    <section className="py-20 bg-[#F9F9F9]" id="admissions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="admissions-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
            Admissions & Enrolment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
            School Admission & Application Form
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Read, preview, and download the official 2-page Phikiswayo Primary School application form for Grades R through 7.
          </p>
        </div>

        {/* HERO CARD: Downloadable Admission Form & Generated Document Reader */}
        <div className="mb-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-red-500/30 overflow-hidden relative" id="admission-hero-card">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#ff2121]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2121]/20 border border-[#ff2121]/40 text-[#ff4d4d] text-xs font-bold uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>Official Department of Education Approved Form</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                Official Admission Application Form
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Parents and guardians can review the full <strong>Application for Admission to School</strong> document directly in our generated vector reader below, or download the printable PDF for completion and submission at our administration office.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 bg-neutral-800/90 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> 2-Page Standard A4 Document
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-800/90 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> Grade R – Grade 7
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-800/90 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> Learner, Parent & Medical Details
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-800/90 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d4d]" /> Sibling & Pre-Primary Sections
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                {/* Native download anchor: prevents Chrome blocking */}
                <a
                  href={ADMISSION_FORM_PATH}
                  download={ADMISSION_FORM_FILENAME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#ff2121] hover:bg-[#e01a1a] text-white font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-red-900/40 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer no-underline"
                  id="admissions-download-pdf-hero"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Form (PDF)</span>
                </a>

                <button
                  onClick={() => openModalWithPage('all')}
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-neutral-700 transition text-sm sm:text-base cursor-pointer"
                  id="admissions-preview-btn"
                >
                  <Eye className="w-5 h-5 text-[#ff4d4d]" />
                  <span>Open Full Screen Reader</span>
                </button>

                <button
                  onClick={openAdmissionForm}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white underline cursor-pointer py-2"
                >
                  <ExternalLink className="w-4 h-4 text-[#ff4d4d]" />
                  <span>Open PDF in new tab</span>
                </button>
              </div>
            </div>

            {/* Right: Generated Miniature Interactive Document Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
              <div 
                onClick={() => openModalWithPage('all')}
                className="w-full max-w-[320px] bg-white text-neutral-900 rounded-2xl p-4 shadow-2xl border-2 border-neutral-300 transform hover:scale-[1.03] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                id="doc-miniature-card"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-neutral-600">
                      Official Form Preview
                    </span>
                  </div>
                  <SchoolCrest size={32} variant="shield" />
                </div>
                
                <div className="text-[11px] font-black text-center mb-0.5 text-neutral-900 uppercase">
                  APPLICATION FOR ADMISSION TO SCHOOL
                </div>
                <div className="text-[9px] font-bold text-center text-[#ff2121] mb-2.5">
                  PHIKISWAYO PRIMARY SCHOOL • DURBAN 4360
                </div>

                {/* Vector Layout Snippet */}
                <div className="space-y-1.5 mb-3 text-[8px] text-neutral-700 bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                  <div className="flex justify-between border-b border-neutral-200 pb-1 font-semibold">
                    <span>Grade Applied: [ &nbsp; ]</span>
                    <span>Accession No: [ &nbsp; ]</span>
                  </div>
                  <div className="border-b border-neutral-200 pb-1 font-semibold flex justify-between">
                    <span>Learner Surname & Names</span>
                    <span className="text-neutral-400">DOB (YYYY/MM/DD)</span>
                  </div>
                  <div className="border-b border-neutral-200 pb-1 font-semibold">
                    <span>13-Digit ID / Passport Grid</span>
                  </div>
                  <div className="border-b border-neutral-200 pb-1 font-semibold flex justify-between">
                    <span>Parent / Guardian Info</span>
                    <span className="text-neutral-400">Residential Address</span>
                  </div>
                  <div className="flex justify-between font-semibold text-neutral-500">
                    <span>Siblings & Medical Sections</span>
                    <span>Parent Declaration</span>
                  </div>
                </div>

                {/* Page badges */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModalWithPage(1);
                    }}
                    className="p-1.5 bg-neutral-100 hover:bg-red-50 hover:text-[#ff2121] rounded text-[10px] font-bold text-center border border-neutral-200 transition"
                  >
                    View Page 1
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModalWithPage(2);
                    }}
                    className="p-1.5 bg-neutral-100 hover:bg-red-50 hover:text-[#ff2121] rounded text-[10px] font-bold text-center border border-neutral-200 transition"
                  >
                    View Page 2
                  </button>
                </div>

                <div className="w-full py-2.5 bg-red-50 text-[#ff2121] text-xs font-extrabold rounded-xl text-center flex items-center justify-center gap-1.5 group-hover:bg-[#ff2121] group-hover:text-white transition shadow-sm">
                  <Eye className="w-4 h-4" />
                  <span>Click for Full Screen Reader</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Clear Banner Stating In-Person Admissions Submission */}
        <div className="mb-10 bg-red-50 border-2 border-[#ff2121] rounded-2xl p-5 sm:p-7 shadow-sm" id="admission-submission-banner">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#ff2121] text-white shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#ff2121] mb-1">
                  Submission at School Administration Desk
                </h3>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed max-w-3xl">
                  After completing the application form, all registrations must be submitted <strong>in person</strong> at our school administration office at <strong>A348 Khangela Street, Ntuzuma A</strong>. Please bring original and certified copies of all supporting documents.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:0815091460"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff2121]" />
                <span>081 509 1460</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive View Container: Switch between Document Reader and Step Guide & Checklist */}
        <div className="mb-14" id="admission-view-container">
          
          {/* Tab Navigation */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex rounded-2xl bg-neutral-200 p-1.5 border border-neutral-300 shadow-inner">
              <button
                onClick={() => setInlineViewMode('checklist')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  inlineViewMode === 'checklist'
                    ? 'bg-white text-neutral-900 shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-4 h-4 text-[#ff2121]" />
                <span>Admission Steps & Checklist</span>
              </button>

              <button
                onClick={() => setInlineViewMode('reader')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  inlineViewMode === 'reader'
                    ? 'bg-[#ff2121] text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Generated Document Reader</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: Steps & Checklist */}
          {inlineViewMode === 'checklist' && (
            <div className="space-y-10 animate-in fade-in duration-200">
              {/* Step-by-Step Admission Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="admission-steps-grid">
                
                {/* Step 1 */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-1-card">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-sm">
                      1
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2">
                      Download or Collect Form
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                      Download the official 2-page PDF form, preview it directly on-screen, or collect a physical hard-copy directly from the school administration office.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={ADMISSION_FORM_PATH}
                      download={ADMISSION_FORM_FILENAME}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff2121] hover:underline cursor-pointer no-underline"
                      id="admission-step-1-download"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                    <span className="text-neutral-300">•</span>
                    <button
                      onClick={() => setInlineViewMode('reader')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Online</span>
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-2-card">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-sm">
                      2
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2">
                      Prepare Required Documents
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                      Prepare certified copies of Parent/Guardian ID, Learner's Birth Certificate, Latest School Report, Immunisation Clinic Card, and official Transfer Card.
                    </p>
                  </div>
                  <div className="text-xs text-neutral-500 font-semibold pt-2">
                    Check off the interactive list below ↓
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-sm transition hover:shadow-md hover:border-[#ff2121] flex flex-col justify-between" id="admission-step-3-card">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#ff2121] text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-sm">
                      3
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2">
                      Submit to Admissions Desk
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                      Submit the completed, signed form and all certified supporting documents directly to the admissions committee at A348 Khangela St, Ntuzuma A.
                    </p>
                  </div>
                  <div className="text-xs text-neutral-500 font-semibold pt-2">
                    Mon – Fri: 07:30 – 15:30
                  </div>
                </div>

              </div>

              {/* Document Checklist Helper */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto" id="documents-checklist-card">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="text-xl font-bold text-[#ff2121] font-display">
                      Required Supporting Documents Checklist
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Check off each item to ensure your admission folder is complete before visiting the office:
                    </p>
                  </div>
                  {allChecked && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5" id="all-docs-ready-badge">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>All Documents Ready!</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <label 
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                      checkedDocs.doc1 
                        ? 'bg-red-50/50 border-[#ff2121]' 
                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    id="doc-check-item-1"
                  >
                    <input
                      type="checkbox"
                      checked={checkedDocs.doc1}
                      onChange={() => toggleDoc('doc1')}
                      className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                      id="doc-checkbox-1"
                    />
                    <div>
                      <span className="text-sm font-bold text-neutral-900 block">
                        Certified Parent / Guardian ID
                      </span>
                      <span className="text-xs text-neutral-500">
                        Certified photocopy of South African ID document or smart ID card.
                      </span>
                    </div>
                  </label>

                  <label 
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                      checkedDocs.doc2 
                        ? 'bg-red-50/50 border-[#ff2121]' 
                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    id="doc-check-item-2"
                  >
                    <input
                      type="checkbox"
                      checked={checkedDocs.doc2}
                      onChange={() => toggleDoc('doc2')}
                      className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                      id="doc-checkbox-2"
                    />
                    <div>
                      <span className="text-sm font-bold text-neutral-900 block">
                        Learner's Birth Certificate
                      </span>
                      <span className="text-xs text-neutral-500">
                        Certified copy of unabridged or computerised birth certificate.
                      </span>
                    </div>
                  </label>

                  <label 
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                      checkedDocs.doc3 
                        ? 'bg-red-50/50 border-[#ff2121]' 
                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    id="doc-check-item-3"
                  >
                    <input
                      type="checkbox"
                      checked={checkedDocs.doc3}
                      onChange={() => toggleDoc('doc3')}
                      className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                      id="doc-checkbox-3"
                    />
                    <div>
                      <span className="text-sm font-bold text-neutral-900 block">
                        Latest School Report & Transfer Card
                      </span>
                      <span className="text-xs text-neutral-500">
                        Previous term academic report and official school transfer card.
                      </span>
                    </div>
                  </label>

                  <label 
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                      checkedDocs.doc4 
                        ? 'bg-red-50/50 border-[#ff2121]' 
                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    id="doc-check-item-4"
                  >
                    <input
                      type="checkbox"
                      checked={checkedDocs.doc4}
                      onChange={() => toggleDoc('doc4')}
                      className="mt-1 w-5 h-5 rounded text-[#ff2121] focus:ring-[#ff2121] accent-[#ff2121] cursor-pointer"
                      id="doc-checkbox-4"
                    />
                    <div>
                      <span className="text-sm font-bold text-neutral-900 block">
                        Clinic Road to Health Card
                      </span>
                      <span className="text-xs text-neutral-500">
                        Official clinic card showing complete immunisation schedule.
                      </span>
                    </div>
                  </label>

                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Generated Document Reader Inline */}
          {inlineViewMode === 'reader' && (
            <div className="bg-neutral-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-neutral-800 text-white animate-in fade-in duration-200">
              
              {/* Reader Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff2121] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      Live Document Reader
                    </span>
                    <span className="text-xs text-neutral-400">Official Phikiswayo Primary Application</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                    Application For Admission To School
                  </h3>
                </div>

                {/* Reader Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-lg bg-neutral-800 p-1 border border-neutral-700">
                    <button
                      onClick={() => setReaderPage('all')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                        readerPage === 'all'
                          ? 'bg-[#ff2121] text-white'
                          : 'text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      All Pages
                    </button>
                    <button
                      onClick={() => setReaderPage(1)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                        readerPage === 1
                          ? 'bg-[#ff2121] text-white'
                          : 'text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      Page 1
                    </button>
                    <button
                      onClick={() => setReaderPage(2)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                        readerPage === 2
                          ? 'bg-[#ff2121] text-white'
                          : 'text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      Page 2
                    </button>
                  </div>

                  <button
                    onClick={() => openModalWithPage(readerPage)}
                    className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-neutral-700"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ff4d4d]" />
                    <span>Full Screen</span>
                  </button>

                  <a
                    href={ADMISSION_FORM_PATH}
                    download={ADMISSION_FORM_FILENAME}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#ff2121] hover:bg-[#e01a1a] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer no-underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Embedded Form Viewport */}
              <div className="overflow-x-auto py-2">
                <GeneratedAdmissionForm page={readerPage} />
              </div>

              {/* Reader Bottom Bar */}
              <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
                <span>
                  Address: A348 Khangela Street, Durban, 4360 • Telephone: 081 509 1460
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#ff4d4d] font-bold cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Document</span>
                  </button>
                  <span>•</span>
                  <a
                    href={ADMISSION_FORM_PATH}
                    download={ADMISSION_FORM_FILENAME}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#ff4d4d] hover:underline font-bold cursor-pointer no-underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Callout Box with Phone Number */}
        <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-2xl p-8 text-center max-w-3xl mx-auto" id="admission-contact-callout">
          <h4 className="text-xl sm:text-2xl font-bold text-[#ff2121] mb-2">
            Have questions or need to confirm admission dates?
          </h4>
          <p className="text-sm sm:text-base text-neutral-700 mb-6">
            Call our school office directly at <span className="font-bold text-[#ff2121]">081 509 1460</span> or visit us at A348 Khangela Street, Ntuzuma A.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:0815091460"
              className="inline-flex items-center gap-2.5 bg-[#ff2121] hover:bg-[#e01a1a] text-white font-extrabold px-7 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              id="admissions-call-btn"
            >
              <span>Call School Office: 081 509 1460</span>
            </a>

            <a
              href={ADMISSION_FORM_PATH}
              download={ADMISSION_FORM_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer no-underline"
              id="admissions-callout-download-btn"
            >
              <Download className="w-5 h-5 text-[#ff4d4d]" />
              <span>Download PDF Form</span>
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Full Screen Form Reader Modal */}
      <AdmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPage={modalPage}
      />
    </section>
  );
};
