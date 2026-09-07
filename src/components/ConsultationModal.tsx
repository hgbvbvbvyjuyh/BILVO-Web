import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Sparkles, AlertCircle } from 'lucide-react';
import { ConsultationRequest } from '../types';
import { motion } from 'motion/react';
import BilvoLogo from './BilvoLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM: ConsultationRequest = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  companyWebsite: '',
  role: '',
  companySize: '',
  annualRevenue: '',
  projectBudget: '',
  howCanWeHelp: '',
  aiGoals: [],
  additionalNotes: '',
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [form, setForm] = useState<ConsultationRequest>(INITIAL_FORM);
  const [submittedData, setSubmittedData] = useState<ConsultationRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const firstInputRef = useRef<HTMLInputElement>(null);
  const hasFocusedRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      hasFocusedRef.current = false;
      return;
    }
    
    // Auto-focus first field strictly once on modal opening, without fighting user's immediate selection
    if (!hasFocusedRef.current) {
      hasFocusedRef.current = true;
      const isTouch = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
      if (!isTouch) {
        const timer = setTimeout(() => {
          // Check if user has already focused another element inside the modal
          if (!document.activeElement || document.activeElement === document.body || document.activeElement === document.documentElement) {
            firstInputRef.current?.focus({ preventScroll: true });
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }

    // Escape to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleGoal = (goal: string) => {
    setForm(prev => {
      const aiGoals = prev.aiGoals.includes(goal)
        ? prev.aiGoals.filter(g => g !== goal)
        : [...prev.aiGoals, goal];
      return { ...prev, aiGoals };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage(null);

    // Client-side validation
    if (
      !form.firstName.trim() || 
      !form.lastName.trim() || 
      !form.email.trim() || 
      !form.companyName.trim() || 
      !form.role || 
      !form.companySize || 
      !form.annualRevenue || 
      !form.projectBudget || 
      !form.howCanWeHelp.trim()
    ) {
      setErrorMessage('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      let result: any = null;
      let submittedSuccessfully = false;

      // 1. Send the form data securely to the server-side backend
      try {
        const response = await fetch('/api/strategy-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            companyName: form.companyName,
            companyWebsite: form.companyWebsite,
            role: form.role,
            companySize: form.companySize,
            annualRevenue: form.annualRevenue,
            projectBudget: form.projectBudget,
            howCanWeHelp: form.howCanWeHelp,
            aiGoals: form.aiGoals,
            additionalNotes: form.additionalNotes,
          }),
        });

        if (response.ok) {
          result = await response.json().catch(() => null);
          if (result?.success) {
            submittedSuccessfully = true;
          }
        }
      } catch {
        // Backend route unavailable, attempt static deployment fallback
      }

      // 2. Direct client fallback (active if deployed purely as static SPA without Node.js server)
      if (!submittedSuccessfully) {
        try {
          const fallbackRes = await fetch('https://formsubmit.co/ajax/knmili2000@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              _subject: 'New AI Strategy Session Request — Bilvo Ai',
              _template: 'table',
              'Full Name': `${form.firstName} ${form.lastName}`,
              'Email': form.email,
              'Company': form.companyName,
              'Website': form.companyWebsite || 'Not provided',
              'Role': form.role,
              'Company Size': form.companySize,
              'Annual Revenue': form.annualRevenue,
              'Project Budget': form.projectBudget,
              'AI Goals': form.aiGoals.join(', ') || 'None specified',
              'Message': form.howCanWeHelp,
              'Additional Notes': form.additionalNotes || 'None',
              'Submission Date': new Date().toISOString(),
            }),
          });

          if (fallbackRes.ok) {
            submittedSuccessfully = true;
            result = { id: `direct_${Date.now()}` };
          }
        } catch {
          // Network offline
        }
      }

      if (!submittedSuccessfully) {
        throw new Error(result?.error || 'Unable to submit your request at this moment. Please check your internet connection or email us directly at contact@bilvo.ai.');
      }

      // 3. Save local lead backup in browser storage
      try {
        const savedLeads = JSON.parse(localStorage.getItem('bilvo_consultation_leads') || '[]');
        savedLeads.push({
          ...form,
          id: result?.id,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('bilvo_consultation_leads', JSON.stringify(savedLeads));
      } catch {
        // LocalStorage access failsafe
      }

      // 4. Preserve snapshot for confirmation view and reset form
      setSubmittedData({ ...form });
      setForm(INITIAL_FORM);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please review your entries and try again.');
    } finally {
      setLoading(false);
    }
  };

  const aiGoalOptions = [
    'Lead generation or sales',
    'Customer support',
    'Internal operations',
    'Data processing or reporting',
    'Content or marketing workflows',
    'Not sure yet'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-hidden touch-manipulation" 
      id="modal-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Background radial gradient */}
      <div className="absolute inset-x-0 top-0 -z-10 h-72 fill-current text-[#2563EB]/5 filter blur-3xl opacity-30 pointer-events-none select-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-3xl border border-[#E2E8F0] bg-white p-6 md:p-10 shadow-2xl overscroll-contain z-10" 
        id="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-gray-500 hover:text-[#0F172A] hover:bg-slate-50 hover:border-[#CBD5E1] active:scale-95 transition-all duration-150 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
          id="btn-close-modal"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 pointer-events-none" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3">
              <BilvoLogo size="sm" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#2563EB] uppercase">Bilvo Ai Consultation</span>
            </div>
            
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
              Schedule an AI Strategy Session
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#0F172A]/85">
              Fill out the details below to let us know about your company and what you're looking to achieve with automation.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6" id="consultation-booking-form">
              {/* Anti-spam honeypot (hidden from real users) */}
              <input 
                type="text" 
                name="website_hp" 
                tabIndex={-1} 
                autoComplete="off" 
                className="hidden" 
                aria-hidden="true" 
              />

              {/* Error Message Alert */}
              {errorMessage && (
                <div 
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {/* First Name & Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block font-display text-xs font-semibold text-[#0F172A]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label htmlFor="email" className="block font-display text-xs font-semibold text-[#0F172A]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm"
                />
              </div>

              {/* Company Name & Company Website */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    placeholder="Acme Inc."
                    value={form.companyName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="companyWebsite" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Company Website (optional)
                  </label>
                  <input
                    type="url"
                    id="companyWebsite"
                    name="companyWebsite"
                    placeholder="https://acme.com"
                    value={form.companyWebsite}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Your Role & Company Size */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="role" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Your Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="Owner">Owner</option>
                    <option value="Founder / Co-Founder">Founder / Co-Founder</option>
                    <option value="C-Level Executive">C-Level Executive</option>
                    <option value="VP / Director">VP / Director</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Product / Tech Lead">Product / Tech Lead</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="companySize" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Company Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    required
                    value={form.companySize}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select company size</option>
                    <option value="Solo or freelancer">Solo or freelancer</option>
                    <option value="2-10 employees">2-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>
              </div>

              {/* Annual Revenue & Project Budget */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="annualRevenue" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Company's Annual Revenue <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="annualRevenue"
                    name="annualRevenue"
                    required
                    value={form.annualRevenue}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select revenue range</option>
                    <option value="Less than $100K">Less than $100K</option>
                    <option value="$100K - $500K">$100K - $500K</option>
                    <option value="$500K - $1M">$500K - $1M</option>
                    <option value="$1M - $5M">$1M - $5M</option>
                    <option value="$5M - $20M">$5M - $20M</option>
                    <option value="$20M+">$20M+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectBudget" className="block font-display text-xs font-semibold text-[#0F172A]">
                    Project Budget <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectBudget"
                    name="projectBudget"
                    required
                    value={form.projectBudget}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select budget range</option>
                    <option value="Less than $10K">Less than $10K</option>
                    <option value="$10K - $25K">$10K - $25K</option>
                    <option value="$25K - $50K">$25K - $50K</option>
                    <option value="$50K - $100K">$50K - $100K</option>
                    <option value="$100K+">$100K+</option>
                  </select>
                </div>
              </div>

              {/* How can we help? */}
              <div className="space-y-2">
                <label htmlFor="howCanWeHelp" className="block font-display text-xs font-semibold text-[#0F172A]">
                  How can we help? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="howCanWeHelp"
                  name="howCanWeHelp"
                  required
                  rows={3}
                  placeholder="Tell us what you're looking to achieve..."
                  value={form.howCanWeHelp}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm resize-none"
                />
              </div>

              {/* What are you hoping to improve with AI or automation? */}
              <div className="space-y-3">
                <label className="block font-display text-xs font-semibold text-[#0F172A]">
                  What are you hoping to improve with AI or automation? <span className="text-red-500">*</span>
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {aiGoalOptions.map((goal) => {
                    const isSelected = form.aiGoals.includes(goal);
                    return (
                      <button
                        type="button"
                        key={goal}
                        role="checkbox"
                        aria-checked={isSelected}
                        onClick={() => toggleGoal(goal)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left font-sans text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                          isSelected
                            ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-sm'
                            : 'border-[#E2E8F0] bg-white text-gray-600 hover:border-[#CBD5E1] hover:text-[#0F172A]'
                        }`}
                      >
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-150 pointer-events-none ${
                          isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white scale-105' : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span className="pointer-events-none select-none">{goal}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Anything else we should know before reaching out? */}
              <div className="space-y-2">
                <label htmlFor="additionalNotes" className="block font-display text-xs font-semibold text-[#0F172A]">
                  Anything else we should know before reaching out? (optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  placeholder="Any additional context or questions..."
                  value={form.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/50 hover:border-[#CBD5E1] px-4 py-3 font-sans text-sm text-[#0F172A] placeholder-gray-400 transition-all duration-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none shadow-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] active:scale-[0.99] text-white font-sans text-sm font-semibold py-3.5 px-6 shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                id="btn-submit-consultation"
              >
                {loading ? (
                  <div className="flex items-center gap-2.5">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6" id="modal-success-layout">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
              <Check className="h-8 w-8" />
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
              Thank you!
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm text-[#0F172A]/85 leading-relaxed font-medium">
              Your request has been submitted successfully. We'll be in touch soon.
            </p>

            {submittedData && (
              <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-slate-50 p-6 text-left max-w-md mx-auto font-sans text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2563EB] font-bold">SUBMISSION SUMMARY:</span>
                <ul className="mt-3 space-y-2 text-[#0F172A]/85">
                  <li>• <strong className="text-[#0F172A]">Name:</strong> {submittedData.firstName} {submittedData.lastName}</li>
                  <li>• <strong className="text-[#0F172A]">Company:</strong> {submittedData.companyName} ({submittedData.role})</li>
                  <li>• <strong className="text-[#0F172A]">Email:</strong> {submittedData.email}</li>
                  <li>• <strong className="text-[#0F172A]">Annual Revenue:</strong> {submittedData.annualRevenue}</li>
                  <li>• <strong className="text-[#0F172A]">Project Budget:</strong> {submittedData.projectBudget}</li>
                  <li>• <strong className="text-[#0F172A]">Target Focus:</strong> {submittedData.aiGoals.length > 0 ? submittedData.aiGoals.join(', ') : 'Not specified'}</li>
                </ul>
              </div>
            )}

            <p className="mt-6 font-mono text-xs text-gray-500">
              Our team will review your project details and respond shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setSubmittedData(null);
                setErrorMessage(null);
                onClose();
              }}
              className="btn-enterprise-secondary mt-8 w-full max-w-xs cursor-pointer"
              id="btn-return-landing"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
