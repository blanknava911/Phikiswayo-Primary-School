import React from 'react';
import { Cookie, FileText, Info, Lock, Mail, ShieldCheck } from 'lucide-react';

type LegalMode = 'terms' | 'cookies';

interface LegalSectionProps {
  mode: LegalMode;
}

const updatedDate = '07 September 2026';

const cardClass = 'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm';
const headingClass = 'font-display text-xl font-extrabold text-neutral-950';
const bodyClass = 'mt-3 text-sm leading-relaxed text-neutral-700';

export const LegalSection: React.FC<LegalSectionProps> = ({ mode }) => {
  const isTerms = mode === 'terms';

  return (
    <section className="bg-[#F9F9F9] py-16" id={`${mode}-section`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="mb-8 rounded-2xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ff2121]">
            {isTerms ? <FileText className="h-4 w-4" /> : <Cookie className="h-4 w-4" />}
            {isTerms ? 'Terms of Service' : 'Cookies & Privacy'}
          </span>
          <h2 className="font-display text-3xl font-extrabold text-neutral-950 sm:text-4xl">
            {isTerms ? 'Website Terms of Service' : 'Cookie and Privacy Notice'}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
            {isTerms
              ? 'These terms explain how visitors may use the Phikiswayo Primary School website and its public information.'
              : 'This notice explains what information the website uses, how cookies and browser storage are handled, and how privacy is protected.'}
          </p>
          <p className="mt-3 text-xs font-semibold text-neutral-500">Last updated: {updatedDate}</p>
        </div>

        {isTerms ? (
          <div className="space-y-5">
            <article className={cardClass}>
              <h3 className={headingClass}>1. About This Website</h3>
              <p className={bodyClass}>
                This website shares public information about Phikiswayo Primary School, including admissions, contact details, school notices, and upcoming events. It is intended for parents, guardians, learners, staff, and community members.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>2. Use of Information</h3>
              <p className={bodyClass}>
                Visitors may read, download, and share public school information for personal, family, educational, and community purposes. Content must not be copied, altered, or presented in a misleading way that suggests it is an official school notice when it is not.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>3. Admissions Forms and Documents</h3>
              <p className={bodyClass}>
                The downloadable admission form is provided for convenience. A completed form must still be submitted to the school office with the required supporting documents. The school may update admission requirements, dates, or processes when required.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>4. Accuracy of Notices and Events</h3>
              <p className={bodyClass}>
                The school aims to keep dates and notices accurate, but event details may change. Parents and guardians should confirm important dates with the school office where needed, especially for meetings, reports, excursions, payments, and closing dates.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>5. Photos, Learners, and Community Content</h3>
              <p className={bodyClass}>
                The website should only publish learner photographs or identifying learner information when the school has the required permission and a lawful reason to do so. Until confirmed, the site uses non-identifying images and illustrations for event cards.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>6. External Links</h3>
              <p className={bodyClass}>
                The website may link to official social media pages or other external sites. Those sites are managed by their own owners and may have separate privacy terms, cookies, and community rules.
              </p>
            </article>

            <article className={cardClass}>
              <h3 className={headingClass}>7. Contact</h3>
              <p className={bodyClass}>
                Questions about the website or published school information can be sent to the school office at PHIKISWAYO-PS@kznschools.gov.za or raised directly with the administration office.
              </p>
            </article>
          </div>
        ) : (
          <div className="space-y-5">
            <article className={cardClass}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#ff2121]" />
                <div>
                  <h3 className={headingClass}>Personal Information</h3>
                  <p className={bodyClass}>
                    This public website is designed to collect as little personal information as possible. It does not include a public login, online admission submission, payment form, or public comment form. Admission information is submitted directly to the school office, not through the website.
                  </p>
                </div>
              </div>
            </article>

            <article className={cardClass}>
              <div className="flex items-start gap-3">
                <Cookie className="mt-1 h-5 w-5 shrink-0 text-[#ff2121]" />
                <div>
                  <h3 className={headingClass}>Cookies and Browser Storage</h3>
                  <p className={bodyClass}>
                    The website does not use advertising cookies or tracking cookies. It may use essential browser storage only to remember simple site preferences, such as whether a visitor has dismissed the cookie notice.
                  </p>
                </div>
              </div>
            </article>

            <article className={cardClass}>
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 shrink-0 text-[#ff2121]" />
                <div>
                  <h3 className={headingClass}>Basic Technical Information</h3>
                  <p className={bodyClass}>
                    The hosting provider may process basic technical information needed to deliver the website, such as IP address, browser type, device information, pages requested, and security logs. This helps the website load correctly and remain secure.
                  </p>
                </div>
              </div>
            </article>

            <article className={cardClass}>
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 shrink-0 text-[#ff2121]" />
                <div>
                  <h3 className={headingClass}>Protection of Learner Information</h3>
                  <p className={bodyClass}>
                    Learner names, photos, documents, contact details, and school records should be handled carefully and only published or shared where there is permission, a lawful purpose, and appropriate protection. Public event images should avoid identifying learners unless the school has confirmed consent.
                  </p>
                </div>
              </div>
            </article>

            <article className={cardClass}>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-[#ff2121]" />
                <div>
                  <h3 className={headingClass}>Privacy Questions</h3>
                  <p className={bodyClass}>
                    Privacy questions or requests about school information can be directed to PHIKISWAYO-PS@kznschools.gov.za or raised at the school administration office.
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};
