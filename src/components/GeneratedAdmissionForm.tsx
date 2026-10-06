import React from 'react';
import { SchoolCrest } from './SchoolCrest';

interface GeneratedAdmissionFormProps {
  page?: 1 | 2 | 'all';
  className?: string;
  isPrintMode?: boolean;
}

export const GeneratedAdmissionForm: React.FC<GeneratedAdmissionFormProps> = ({
  page = 'all' as 1 | 2 | 'all',
  className = '',
  isPrintMode = false,
}: GeneratedAdmissionFormProps) => {
  const showPage1 = page === 1 || page === 'all';
  const showPage2 = page === 2 || page === 'all';

  return (
    <div className={`admission-form-document font-sans text-neutral-900 leading-tight ${className}`} id="generated-admission-form-root">
      {showPage1 && (
        <div
          className={`admission-page bg-white p-6 sm:p-8 md:p-10 shadow-lg border border-neutral-300 rounded-lg mx-auto max-w-[850px] text-[11px] sm:text-xs select-text ${
            page === 'all' ? 'mb-8' : ''
          }`}
          id="admission-form-page-1"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-black pb-3 mb-2">
            <div className="space-y-0.5">
              <h1 className="font-extrabold text-sm sm:text-base uppercase tracking-wider underline">
                APPLICATION FOR ADMISSION TO SCHOOL
              </h1>
              <div className="font-black text-base sm:text-lg tracking-wide text-neutral-950">
                PHIKISWAYO PRIMARY SCHOOL
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-700">
                A348 KHANGELA STREET, DURBAN, 4360
              </div>
              <div className="flex flex-wrap gap-x-4 text-[10px] sm:text-[11px] font-medium text-neutral-700 pt-0.5">
                <span><strong>Telephone:</strong> 081 509 1460</span>
                <span><strong>Fax:</strong> ________________</span>
                <span><strong>Year:</strong> 2026 / 2027</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs font-bold text-neutral-500">1</span>
              <div className="p-1 bg-white border border-neutral-200 rounded">
                <SchoolCrest size={52} variant="shield" />
              </div>
            </div>
          </div>

          {/* Important Notice Box */}
          <div className="border border-black bg-neutral-50 p-2 mb-2 text-[10px] leading-snug">
            <strong>Note:</strong> This form must be completed in full. All changes to be initialed or signed by parent / guardian. Completing the form does not necessarily mean that the learner has been accepted into the school.
          </div>

          {/* Top Classification Row */}
          <div className="grid grid-cols-12 border border-black mb-2 divide-x divide-black bg-neutral-100 font-medium text-[10px]">
            <div className="col-span-3 p-1.5 flex flex-col justify-between">
              <span className="font-bold">Grade Applied For:</span>
              <div className="h-5 bg-white border border-neutral-300 mt-1 rounded-xs"></div>
            </div>
            <div className="col-span-3 p-1.5 flex flex-col justify-between">
              <span className="font-bold">Highest Grade Passed:</span>
              <div className="h-5 bg-white border border-neutral-300 mt-1 rounded-xs"></div>
            </div>
            <div className="col-span-3 p-1.5 flex flex-col justify-between">
              <span className="font-bold">Year When Grade Passed:</span>
              <div className="h-5 bg-white border border-neutral-300 mt-1 rounded-xs"></div>
            </div>
            <div className="col-span-3 p-1.5 flex flex-col justify-between">
              <span className="font-bold">Accession No:</span>
              <div className="h-5 bg-white border border-neutral-300 mt-1 rounded-xs"></div>
            </div>
          </div>

          {/* Section: Learner Information */}
          <div className="border border-black mb-2">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Learner Personal Information
            </div>

            <div className="p-2 space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">Surname:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block text-[10px]">Initials:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block text-[10px]">Nick Name:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">First Name:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">Other Names:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Date Of Birth:</span>
                  <div className="flex gap-1 items-center pt-0.5 text-[9px]">
                    <span>YYYY:</span>
                    <div className="h-5 w-14 border border-neutral-400 flex items-center justify-center font-mono"></div>
                    <span>MM:</span>
                    <div className="h-5 w-8 border border-neutral-400 flex items-center justify-center font-mono"></div>
                    <span>DD:</span>
                    <div className="h-5 w-8 border border-neutral-400 flex items-center justify-center font-mono"></div>
                  </div>
                </div>

                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Gender:</span>
                  <div className="flex gap-4 pt-1 text-[10px]">
                    <span className="inline-flex items-center gap-1">Male <span className="inline-block w-4 h-4 border border-neutral-600"></span></span>
                    <span className="inline-flex items-center gap-1">Female <span className="inline-block w-4 h-4 border border-neutral-600"></span></span>
                  </div>
                </div>

                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Race:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              {/* ID or Passport Grid (13 boxes) */}
              <div>
                <span className="font-bold block text-[10px]">South African ID or Passport Number:</span>
                <div className="flex items-center gap-0.5 pt-1">
                  {Array.from({ length: 13 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-6 border border-black bg-neutral-50 flex items-center justify-center font-mono text-xs"
                    ></div>
                  ))}
                  <span className="text-[9px] text-neutral-500 ml-2">(13 Digits)</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Country of Residence:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Citizenship:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">If SA, Province:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Communication Grid */}
          <div className="border border-black mb-2">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Physical Address & Contact Details
            </div>
            <div className="p-2 space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <span className="font-bold block text-[10px]">Physical Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-5">
                  <span className="font-bold block text-[10px]">Home Telephone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <span className="font-bold block text-[10px]">City / Suburb:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-5">
                  <span className="font-bold block text-[10px]">Emergency Telephone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3">
                  <span className="font-bold block text-[10px]">Postal Code:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block text-[10px]">Learner Cell:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-5">
                  <span className="font-bold block text-[10px]">Learner Email:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">Home Language:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">Preferred Language of Instruction:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 text-[10px] items-center pt-1">
                <div className="col-span-3 flex items-center gap-2">
                  <span className="font-bold">Boarder:</span>
                  <span>Yes <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                  <span>No <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                </div>
                <div className="col-span-5 flex items-center gap-2">
                  <span className="font-bold">Deceased Parent:</span>
                  <span>Mother <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Father <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Both <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                </div>
                <div className="col-span-4">
                  <span className="font-bold">Mode of Transport:</span>
                  <span className="inline-block w-24 border-b border-neutral-400 ml-1"></span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 text-[10px] items-center">
                <div className="col-span-4">
                  <span className="font-bold">Religion:</span>
                  <span className="inline-block w-28 border-b border-neutral-400 ml-1"></span>
                </div>
                <div className="col-span-8 flex items-center gap-2">
                  <span className="font-bold">Grade 1 only (Pre-primary):</span>
                  <span>None <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Non Formal <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Formal <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Previous School Information */}
          <div className="border border-black mb-2">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Previous School Information
            </div>
            <div className="p-2 space-y-1.5">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12">
                  <span className="font-bold block text-[10px]">Name of Previous School:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block text-[10px]">Previous School Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block text-[10px]">Code:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block text-[10px]">Province:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block text-[10px]">Country:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Medical Information */}
          <div className="border border-black mb-2">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Learner Medical & Health Information
            </div>
            <div className="p-2 space-y-1.5 text-[10px]">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <span className="font-bold block">Medical Aid Number:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block">Medical Aid Name:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block">Medical Aid Main Member:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <span className="font-bold block">Doctor Name:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-5">
                  <span className="font-bold block">Doctor's Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">Doctor Phone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Medical Condition / Allergies:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Special Problems Requiring Counseling:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Dexterity of Learner:</span>
                  <span>Right Handed <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Left Handed <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span>Ambidextrous <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span><strong>Reg. Social Grant:</strong> YES <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span> NO <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  <span><strong>Rec. Social Grant:</strong> YES <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Documentation Checklist Note */}
          <div className="border-2 border-black bg-neutral-100 p-2.5 text-[10px]">
            <div className="font-extrabold uppercase mb-1">
              If the learner is accepted, the following documents must be submitted to the school:
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-semibold text-neutral-800">
              <div>1. Copy of Immunisation Clinic Records</div>
              <div>2. Copy of Birth Certificate</div>
              <div>3. Progress Report from Previous School</div>
              <div>4. Official Transfer Letter from Previous School</div>
            </div>
          </div>
        </div>
      )}

      {showPage2 && (
        <div
          className="admission-page bg-white p-6 sm:p-8 md:p-10 shadow-lg border border-neutral-300 rounded-lg mx-auto max-w-[850px] text-[11px] sm:text-xs select-text"
          id="admission-form-page-2"
        >
          {/* Page 2 Header */}
          <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
            <h2 className="font-extrabold text-sm sm:text-base uppercase tracking-wider underline">
              APPLICATION FOR ADMISSION TO SCHOOL
            </h2>
            <span className="text-xs font-bold text-neutral-500">2</span>
          </div>

          {/* Section: Siblings */}
          <div className="border border-black mb-3">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Siblings Information
            </div>
            <div className="p-2 space-y-2">
              <div className="grid grid-cols-12 gap-2 text-[10px]">
                <div className="col-span-6">
                  <span className="font-bold">Number of other Children at this school:</span>
                  <div className="h-5 border-b border-neutral-400 mt-0.5"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold">Position in the family (e.g. 1st, 2nd):</span>
                  <div className="h-5 border-b border-neutral-400 mt-0.5"></div>
                </div>
              </div>

              <div>
                <span className="font-bold block text-[10px] mb-1">Please supply full names of siblings below:</span>
                <div className="space-y-1.5">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-9 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600 w-12">Name 1:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                    <div className="col-span-3 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600">Grade:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-9 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600 w-12">Name 2:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                    <div className="col-span-3 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600">Grade:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-9 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600 w-12">Name 3:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                    <div className="col-span-3 flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-neutral-600">Grade:</span>
                      <div className="h-5 border-b border-neutral-400 flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Parent / Guardian Information */}
          <div className="border border-black mb-3">
            <div className="bg-neutral-200 px-2 py-0.5 flex items-center justify-between font-bold uppercase tracking-wider text-[10px] border-b border-black">
              <span>Parent / Guardian Information</span>
              <span className="text-[9px] font-semibold text-neutral-600 lowercase tracking-normal italic">
                (Complete a SEPARATE parent form for each parent living at a different address)
              </span>
            </div>

            <div className="p-2 space-y-2 text-[10px]">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-2">
                  <span className="font-bold block">Title:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block">Initials:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-8">
                  <span className="font-bold block">Surname:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <span className="font-bold block">First Name:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">Gender:</span>
                  <div className="flex gap-2 pt-0.5">
                    <span>Male <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                    <span>Female <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                  </div>
                </div>
                <div className="col-span-4">
                  <span className="font-bold block">Home Language:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              {/* ID Digits */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-7">
                  <span className="font-bold block">Identification Number:</span>
                  <div className="flex items-center gap-0.5 pt-0.5">
                    {Array.from({ length: 13 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-5 border border-black bg-neutral-50 flex items-center justify-center font-mono text-[10px]"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">Or Passport Number:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block">Account Payer:</span>
                  <div className="flex gap-2 pt-0.5">
                    <span>Y <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                    <span>N <span className="inline-block w-3 h-3 border border-neutral-600 align-middle"></span></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <span className="font-bold block">Residential Street Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">City / Suburb:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block">Code:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Occupation:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Employer:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Surname of Spouse:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">First Name of Spouse:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <span className="font-bold block">Occupation of Spouse:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Learner resides with this parent/s:</span>
                  <div className="flex gap-4 pt-0.5">
                    <span>Yes <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                    <span>No <span className="inline-block w-3.5 h-3.5 border border-neutral-600 align-middle"></span></span>
                  </div>
                </div>
              </div>

              {/* Spouse ID & Relationship */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <span className="font-bold block">Spouse ID Number:</span>
                  <div className="flex items-center gap-0.5 pt-0.5">
                    {Array.from({ length: 13 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-5 border border-black bg-neutral-50 flex items-center justify-center font-mono text-[10px]"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">Relationship to Learner:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">Marital Status:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Correspondence Details */}
          <div className="border border-black mb-3">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Correspondence & Postal Details
            </div>
            <div className="p-2 space-y-2 text-[10px]">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3">
                  <span className="font-bold block">Title:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-9">
                  <span className="font-bold block">Surname:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <span className="font-bold block">Postal Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-3">
                  <span className="font-bold block">City / Suburb:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-2">
                  <span className="font-bold block">Code:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Contact Details */}
          <div className="border border-black mb-3">
            <div className="bg-neutral-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] border-b border-black">
              Contact Numbers & Communication
            </div>
            <div className="p-2 space-y-1.5 text-[10px]">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Home Telephone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Work Telephone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Fax Number:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Cell Number:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">Spouse Work Phone:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Spouse Cell Number:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <span className="font-bold block">E-Mail Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
                <div className="col-span-6">
                  <span className="font-bold block">Spouse E-Mail Address:</span>
                  <div className="h-5 border-b border-neutral-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Parent Declaration */}
          <div className="border-2 border-black bg-neutral-50 p-2.5 mb-3 text-[10px]">
            <p className="font-bold italic mb-2">
              "I hereby declare that to the best of my knowledge, the above information as supplied is accurate and correct."
            </p>
            <div className="grid grid-cols-12 gap-3 pt-1">
              <div className="col-span-5">
                <span className="font-bold block">Name of Parent / Guardian (Please Print):</span>
                <div className="h-5 border-b border-black mt-1"></div>
              </div>
              <div className="col-span-4">
                <span className="font-bold block">Signature of Parent / Guardian:</span>
                <div className="h-5 border-b border-black mt-1"></div>
              </div>
              <div className="col-span-3">
                <span className="font-bold block">Date (DD / MM / YYYY):</span>
                <div className="h-5 border-b border-black mt-1"></div>
              </div>
            </div>
          </div>

          {/* Section: Office Use Only */}
          <div className="border border-black bg-neutral-100 p-2 text-[10px]">
            <div className="font-black uppercase tracking-wider mb-1.5 border-b border-neutral-400 pb-0.5 text-neutral-800">
              Office Use Only:
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1.5 font-semibold">
              <div className="col-span-4">
                1. Date: <span className="inline-block w-28 border-b border-neutral-500"></span>
              </div>
              <div className="col-span-4">
                2. Accepted: <span className="inline-block w-28 border-b border-neutral-500"></span>
              </div>
              <div className="col-span-4">
                3. Accession Number: <span className="inline-block w-24 border-b border-neutral-500"></span>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-2 font-semibold">
              <div className="col-span-4">
                4. Rejected: <span className="inline-block w-24 border-b border-neutral-500"></span>
              </div>
              <div className="col-span-8">
                5. Reason for Rejection: <span className="inline-block w-64 border-b border-neutral-500"></span>
              </div>
            </div>
            <div className="border-t border-neutral-300 pt-1">
              <span className="font-bold block mb-1">6. Documentation Received:</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-semibold text-neutral-700">
                <div>6a. Immunisation Record: [ &nbsp; ]</div>
                <div>6b. Birth Certificate: [ &nbsp; ]</div>
                <div>6c. Progress Report from Previous School: [ &nbsp; ]</div>
                <div>6d. Transfer Letter from Previous School: [ &nbsp; ]</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
