import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Copy, 
  Check,
  AlertCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export type QueryType = 'question' | 'comment' | 'callback';

export interface SubmittedQuery {
  id: string;
  refNumber: string;
  queryType: QueryType;
  fullName: string;
  phone: string;
  email: string;
  gradeLevel: string;
  preferredCallTime?: string;
  message: string;
  submittedAt: string;
}

export const PRIMARY_SCHOOL_EMAIL = 'PHIKISWAYO-PS@kznschools.gov.za';
export const SECONDARY_QUERY_EMAIL = 'blanknava205@gmail.com';

const STORAGE_KEY = 'phikiswayo_school_queries';

export const SchoolQueryForm: React.FC = () => {
  const [queryType, setQueryType] = useState<QueryType>('question');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade R - 7 General');
  const [preferredCallTime, setPreferredCallTime] = useState('Morning: 08:00 – 11:00');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState<SubmittedQuery | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [pastQueries, setPastQueries] = useState<SubmittedQuery[]>([]);
  const [showPastHistory, setShowPastHistory] = useState(false);

  // Load queries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPastQueries(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (queryType === 'callback' && !cleanPhone) {
      setErrorMessage('A contact phone number is required so our administration office can call you back.');
      return;
    }

    if (queryType === 'question' && !cleanPhone && !cleanEmail) {
      setErrorMessage('Please provide either a telephone number or an email address so we can answer your question.');
      return;
    }

    if (!cleanMessage) {
      setErrorMessage(
        queryType === 'callback'
          ? 'Please briefly describe what you would like to discuss during your call.'
          : queryType === 'question'
          ? 'Please enter your question.'
          : 'Please enter your comment or feedback.'
      );
      return;
    }

    setIsSubmitting(true);

    const refNumber = `PQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newQuery: SubmittedQuery = {
      id: `query-${Date.now()}`,
      refNumber,
      queryType,
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      gradeLevel,
      preferredCallTime: queryType === 'callback' ? preferredCallTime : undefined,
      message: cleanMessage,
      submittedAt: new Date().toLocaleString('en-ZA', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    // Save to local state and localStorage
    const updatedHistory = [newQuery, ...pastQueries];
    setPastQueries(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch {
      // Storage failure non-blocking
    }

    // Automatically trigger email client pre-addressed to both emails
    try {
      const link = document.createElement('a');
      link.href = getMailtoHref(newQuery);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedQuery(newQuery);
    }, 600);
  };

  const handleResetForm = () => {
    setSubmittedQuery(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrorMessage(null);
  };

  const getQuerySummaryText = (q: SubmittedQuery) => {
    const typeLabel = 
      q.queryType === 'question' 
        ? 'Question / General Enquiry' 
        : q.queryType === 'callback' 
        ? 'Call Back Request' 
        : 'Parent / Community Comment';

    return `PHIKISWAYO PRIMARY SCHOOL ENQUIRY
Reference: ${q.refNumber}
Type: ${typeLabel}
Name: ${q.fullName}
Phone: ${q.phone || 'Not provided'}
Email: ${q.email || 'Not provided'}
Grade of Interest: ${q.gradeLevel}
${q.preferredCallTime ? `Preferred Call Time: ${q.preferredCallTime}\n` : ''}Date: ${q.submittedAt}

Message:
${q.message}

Forwarded to:
- Official School Email: ${PRIMARY_SCHOOL_EMAIL}
- Notification Inbox: ${SECONDARY_QUERY_EMAIL}
School Office Helpline: 081 509 1460
Physical Address: 348 Khangela St, Ntuzuma A, 4360`;
  };

  const handleCopySummary = (q: SubmittedQuery) => {
    const text = getQuerySummaryText(q);
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getMailtoHref = (q: SubmittedQuery) => {
    const subject = encodeURIComponent(`[${q.refNumber}] School ${q.queryType.toUpperCase()}: ${q.fullName}`);
    const body = encodeURIComponent(getQuerySummaryText(q));
    return `mailto:${PRIMARY_SCHOOL_EMAIL},${SECONDARY_QUERY_EMAIL}?cc=${encodeURIComponent(SECONDARY_QUERY_EMAIL)}&subject=${subject}&body=${body}`;
  };

  return (
    <div className="mt-16 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden" id="school-query-section">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-50/70 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-wider mb-2 border border-red-200">
          <HelpCircle className="w-3.5 h-3.5" />
          Online Enquiries Desk
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
          Leave a Question, Comment, or Request a Call Back
        </h3>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
          Need information about 2026/2027 admissions, curriculum, fees, or school hours? Have feedback or want our administration team to phone you? Submit your query below. All enquiries are sent directly to the school office (<strong>PHIKISWAYO-PS@kznschools.gov.za</strong>) and <strong>blanknava205@gmail.com</strong>.
        </p>
      </div>

      {submittedQuery ? (
        /* Confirmation Receipt State */
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-6 sm:p-8 animate-in fade-in duration-300" id="query-success-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Enquiry Logged Successfully
                </span>
                <h4 className="text-xl font-extrabold text-neutral-900">
                  Thank You, {submittedQuery.fullName}!
                </h4>
              </div>
            </div>

            <div className="bg-white border border-emerald-200 px-4 py-2 rounded-xl text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-500 block">Reference Number</span>
              <span className="text-sm font-black text-[#ff2121]">{submittedQuery.refNumber}</span>
            </div>
          </div>

          <div className="py-5 space-y-3 text-sm text-neutral-700">
            <p>
              Your <strong>{submittedQuery.queryType === 'callback' ? 'call-back request' : submittedQuery.queryType === 'question' ? 'question' : 'comment'}</strong> has been registered. 
              {submittedQuery.queryType === 'callback' && (
                <span> Our administrative office will phone you at <strong>{submittedQuery.phone}</strong> during <strong>{submittedQuery.preferredCallTime}</strong>.</span>
              )}
            </p>

            <div className="bg-white p-4 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
              <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                <span className="text-neutral-500 font-medium">Query Type:</span>
                <span className="font-bold uppercase text-neutral-800">
                  {submittedQuery.queryType === 'callback' ? 'Call Back Request' : submittedQuery.queryType}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                <span className="text-neutral-500 font-medium">Recipients:</span>
                <span className="font-bold text-neutral-800 text-right">
                  {PRIMARY_SCHOOL_EMAIL}<br />
                  <span className="text-neutral-600 font-medium">{SECONDARY_QUERY_EMAIL}</span>
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                <span className="text-neutral-500 font-medium">Contact Phone:</span>
                <span className="font-bold text-neutral-800">{submittedQuery.phone || 'None provided'}</span>
              </div>
              {submittedQuery.email && (
                <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="text-neutral-500 font-medium">Contact Email:</span>
                  <span className="font-bold text-neutral-800">{submittedQuery.email}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                <span className="text-neutral-500 font-medium">School Office Hours:</span>
                <span className="font-bold text-neutral-800">Mon – Fri: 07:30 – 15:30</span>
              </div>
              <div className="pt-1">
                <span className="text-neutral-500 font-medium block mb-1">Your Enquiry Message:</span>
                <p className="bg-neutral-50 p-2.5 rounded-lg text-neutral-800 italic">"{submittedQuery.message}"</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={getMailtoHref(submittedQuery)}
              className="inline-flex items-center gap-2 bg-[#ff2121] hover:bg-[#e01a1a] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer no-underline"
              id="send-email-copy-btn"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email to School & Admin</span>
            </a>

            <button
              onClick={() => handleCopySummary(submittedQuery)}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition cursor-pointer"
              id="copy-query-summary-btn"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSummary ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleResetForm}
              className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 text-xs sm:text-sm font-semibold px-3 py-2 cursor-pointer ml-auto"
              id="submit-another-query-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Query</span>
            </button>
          </div>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-6" id="school-query-form">
          
          {/* Query Type Selector Pills */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2">
              Select What You Would Like to Do *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="query-type-selector">
              
              {/* Question */}
              <button
                type="button"
                onClick={() => setQueryType('question')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition text-left cursor-pointer ${
                  queryType === 'question'
                    ? 'border-[#ff2121] bg-red-50/60 shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                id="query-type-question"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  queryType === 'question' ? 'bg-[#ff2121] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 block leading-tight">
                    Ask a Question
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Admissions, fees, requirements
                  </span>
                </div>
              </button>

              {/* Call Back */}
              <button
                type="button"
                onClick={() => setQueryType('callback')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition text-left cursor-pointer ${
                  queryType === 'callback'
                    ? 'border-[#ff2121] bg-red-50/60 shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                id="query-type-callback"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  queryType === 'callback' ? 'bg-[#ff2121] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 block leading-tight">
                    Request a Call Back
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    We'll phone you directly
                  </span>
                </div>
              </button>

              {/* Comment */}
              <button
                type="button"
                onClick={() => setQueryType('comment')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition text-left cursor-pointer ${
                  queryType === 'comment'
                    ? 'border-[#ff2121] bg-red-50/60 shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                id="query-type-comment"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  queryType === 'comment' ? 'bg-[#ff2121] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 block leading-tight">
                    Leave a Comment
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Feedback, ideas, compliment
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#ff2121]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="query-fullName" className="block text-xs font-bold text-neutral-700 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="query-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sipho Sithole"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] focus:ring-2 focus:ring-red-100 transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="query-phone" className="block text-xs font-bold text-neutral-700 mb-1">
                Phone Number {queryType === 'callback' ? '(Required for Call Back) *' : '(Optional)'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="query-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 082 123 4567"
                  required={queryType === 'callback'}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] focus:ring-2 focus:ring-red-100 transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="query-email" className="block text-xs font-bold text-neutral-700 mb-1">
                Email Address {queryType === 'callback' ? '(Optional)' : '(Recommended)'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="query-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sipho@example.co.za"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] focus:ring-2 focus:ring-red-100 transition"
                />
              </div>
            </div>

            {/* Grade of Interest */}
            <div>
              <label htmlFor="query-grade" className="block text-xs font-bold text-neutral-700 mb-1">
                Learner Grade / Area
              </label>
              <select
                id="query-grade"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] focus:ring-2 focus:ring-red-100 transition"
              >
                <option value="Grade R - 7 General">General School Enquiry</option>
                <option value="Grade R">Grade R (Reception)</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Admissions Documents">Admission Documents & Requirements</option>
              </select>
            </div>

          </div>

          {/* Call Back Specific: Preferred Time */}
          {queryType === 'callback' && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 animate-in fade-in duration-200">
              <label htmlFor="query-call-time" className="block text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Preferred Call Back Time (Office Hours: 07:30 – 15:30)</span>
              </label>
              <select
                id="query-call-time"
                value={preferredCallTime}
                onChange={(e) => setPreferredCallTime(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-amber-300 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] transition"
              >
                <option value="Morning: 08:00 – 11:00">Morning (08:00 – 11:00)</option>
                <option value="Midday: 11:00 – 13:00">Midday (11:00 – 13:00)</option>
                <option value="Afternoon: 13:00 – 15:30">Afternoon (13:00 – 15:30)</option>
                <option value="Anytime during office hours">Anytime during school office hours</option>
              </select>
            </div>
          )}

          {/* Message / Question / Comment */}
          <div>
            <label htmlFor="query-message" className="block text-xs font-bold text-neutral-700 mb-1">
              {queryType === 'question' 
                ? 'Your Question Details *' 
                : queryType === 'callback' 
                ? 'Reason for Call Back / Discussion Topics *' 
                : 'Your Comment or Feedback *'}
            </label>
            <textarea
              id="query-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                queryType === 'question'
                  ? 'Please write your question here (e.g. What documents must I bring to register my child for Grade 1? Are there still spaces available?)'
                  : queryType === 'callback'
                  ? 'Please briefly explain what you would like the administration office to call you regarding...'
                  : 'Please share your comment, feedback, or message for Phikiswayo Primary School...'
              }
              required
              className="w-full p-4 bg-neutral-50 border border-neutral-300 rounded-2xl text-sm text-neutral-900 focus:outline-none focus:border-[#ff2121] focus:ring-2 focus:ring-red-100 transition resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-neutral-500">
              ⚡ Typical response time: Within 1 school day during term time (07:30 – 15:30).
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff2121] hover:bg-[#e01a1a] text-white px-7 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 cursor-pointer"
              id="submit-query-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    {queryType === 'callback' 
                      ? 'Request Call Back' 
                      : queryType === 'question' 
                      ? 'Send Question' 
                      : 'Submit Comment'}
                  </span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Past Queries Viewer (if user has previously submitted on this browser) */}
      {pastQueries.length > 0 && !submittedQuery && (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => setShowPastHistory(!showPastHistory)}
            className="text-xs font-bold text-neutral-600 hover:text-[#ff2121] flex items-center gap-1.5 transition cursor-pointer"
            id="toggle-past-queries-btn"
          >
            <span>{showPastHistory ? 'Hide' : 'View'} your past submitted enquiries ({pastQueries.length})</span>
          </button>

          {showPastHistory && (
            <div className="mt-4 space-y-3 animate-in fade-in">
              {pastQueries.map((item) => (
                <div key={item.id} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 text-xs flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-neutral-900">
                      <span className="text-[#ff2121]">{item.refNumber}</span>
                      <span>•</span>
                      <span className="capitalize">{item.queryType}</span>
                      <span>•</span>
                      <span className="text-neutral-500 font-normal">{item.submittedAt}</span>
                    </div>
                    <p className="text-neutral-700 mt-1 line-clamp-1 italic">"{item.message}"</p>
                  </div>
                  <div className="text-neutral-500 shrink-0 self-start sm:self-center">
                    <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 rounded text-[11px] font-semibold">
                      Recorded
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
