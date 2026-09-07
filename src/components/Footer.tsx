import React, { useState } from 'react';
import { Mail, MapPin, Twitter, Linkedin, Github, Youtube, X } from 'lucide-react';
import { TabType } from '../types';
import BilvoLogo from './BilvoLogo';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenConsultation: () => void;
}

export default function Footer({ setActiveTab, onOpenConsultation }: FooterProps) {
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const handleLogoClick = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegalModal = (title: string) => {
    setLegalModalTitle(title);
  };

  const closeLegalModal = () => {
    setLegalModalTitle(null);
  };

  return (
    <footer 
      className="relative mt-20 md:mt-28 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-14 sm:py-16 md:px-12 md:py-20 text-[#475569]" 
      id="footer-section"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Main Navigation & Company Info Grid with Mathematically Aligned Tops */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 text-left">
          
          {/* Left: Company Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Bilvo Ai Logo - Aligned to h-9 height */}
            <div className="h-9 flex items-center">
              <div 
                className="flex cursor-pointer items-center gap-3 group/brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 rounded-xl" 
                onClick={handleLogoClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLogoClick();
                  }
                }}
                role="button"
                tabIndex={0}
                id="footer-brand-header"
              >
                <BilvoLogo size="lg" showText={true} textColor="text-[#0F172A]" />
              </div>
            </div>

            {/* Business-focused Description */}
            <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#475569] max-w-sm">
              Bilvo Ai helps businesses save time, reduce costs, eliminate repetitive work, and create more capacity for growth.
            </p>

            {/* Business Contact Information */}
            <div className="space-y-3 font-sans text-sm text-[#475569]">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#2563EB] shrink-0" />
                <span className="text-[#334155] font-medium">Austin, TX</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#2563EB] shrink-0" />
                <a 
                  href="mailto:rofiqul@bilvo.ai" 
                  className="text-[#334155] font-medium hover:text-[#2563EB] transition-colors duration-200"
                >
                  rofiqul@bilvo.ai
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="#twitter" 
                aria-label="Bilvo Ai on Twitter"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-200 shadow-xs"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#linkedin" 
                aria-label="Bilvo Ai on LinkedIn"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-200 shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#github" 
                aria-label="Bilvo Ai on GitHub"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-200 shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#youtube" 
                aria-label="Bilvo Ai on YouTube"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-200 shadow-xs"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Organized Nav Columns (3 Columns: QUICK LINKS, COMPANY, LEGAL) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:flex sm:flex-nowrap gap-8 sm:gap-12 lg:gap-16 lg:justify-end">
            
            {/* Quick Links */}
            <div className="space-y-4 shrink-0">
              <div className="h-9 flex items-center">
                <h4 className="font-display text-xs font-bold tracking-wider text-[#0F172A] uppercase">
                  QUICK LINKS
                </h4>
              </div>
              <ul className="flex flex-col gap-3 font-sans text-sm text-[#475569]">
                <li>
                  <button 
                    onClick={() => handleNavigate('home')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('how-we-work')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    How We Work
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('live-demos')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Live Demos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('testimonials')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('why-bilvo')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Why Bilvo Ai
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4 shrink-0">
              <div className="h-9 flex items-center">
                <h4 className="font-display text-xs font-bold tracking-wider text-[#0F172A] uppercase">
                  COMPANY
                </h4>
              </div>
              <ul className="flex flex-col gap-3 font-sans text-sm text-[#475569]">
                <li>
                  <button 
                    onClick={() => handleNavigate('why-bilvo')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Why Bilvo Ai
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenConsultation} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenConsultation} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Schedule a Strategy Session
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4 shrink-0">
              <div className="h-9 flex items-center">
                <h4 className="font-display text-xs font-bold tracking-wider text-[#0F172A] uppercase">
                  LEGAL
                </h4>
              </div>
              <ul className="flex flex-col gap-3 font-sans text-sm text-[#475569]">
                <li>
                  <button 
                    onClick={() => openLegalModal('Privacy Policy')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegalModal('Terms & Conditions')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegalModal('Cookie Policy')} 
                    className="hover:text-[#2563EB] transition-colors duration-200 text-left font-normal"
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* 3. Bottom Legal Bar with Consistent Dividers & Subtle Contrast */}
        <div className="mt-14 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs text-[#64748B]">
          <span>&copy; 2026 Bilvo Ai. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <button 
              onClick={() => openLegalModal('Privacy Policy')} 
              className="hover:text-[#0F172A] transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <span className="text-[#CBD5E1]">|</span>
            <button 
              onClick={() => openLegalModal('Terms & Conditions')} 
              className="hover:text-[#0F172A] transition-colors duration-200"
            >
              Terms & Conditions
            </button>
            <span className="text-[#CBD5E1]">|</span>
            <button 
              onClick={() => openLegalModal('Cookie Policy')} 
              className="hover:text-[#0F172A] transition-colors duration-200"
            >
              Cookie Policy
            </button>
          </div>
        </div>

      </div>

      {/* Lightweight Accessible Legal Modal Dialog - Matching Palette */}
      {legalModalTitle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-dialog-title"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 text-left shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 id="legal-dialog-title" className="font-display text-xl font-bold text-[#0F172A] tracking-tight">
                {legalModalTitle}
              </h3>
              <button
                onClick={closeLegalModal}
                className="rounded-lg p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans text-sm text-[#475569] leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {legalModalTitle === 'Privacy Policy' && (
                <>
                  <p>
                    Bilvo Ai respects your data privacy. We never sell, rent, or trade client operational data, customer lists, or proprietary workflows to third parties.
                  </p>
                  <p>
                    All automation integrations utilize industry-standard encryption in transit and at rest. Information provided during strategy sessions is held in strict commercial confidence.
                  </p>
                  <p>
                    For specific data processing questions, contact us directly at <span className="text-[#2563EB] font-medium">rofiqul@bilvo.ai</span>.
                  </p>
                </>
              )}

              {legalModalTitle === 'Terms & Conditions' && (
                <>
                  <p>
                    All services provided by Bilvo Ai are delivered pursuant to tailored Statements of Work and Master Services Agreements executed with each client.
                  </p>
                  <p>
                    Custom workflows and integrations developed specifically for your business remain your proprietary asset upon completion and payment.
                  </p>
                  <p>
                    Continued use of the website constitutes agreement to general commercial engagement principles and ethical use standards.
                  </p>
                </>
              )}

              {legalModalTitle === 'Cookie Policy' && (
                <>
                  <p>
                    Our website uses only essential session cookies and privacy-preserving analytics to ensure fast load times, responsive navigation, and error prevention.
                  </p>
                  <p>
                    We do not deploy intrusive third-party cross-site tracking cookies. You may manage or disable cookies via your browser settings at any time without impacting site navigation.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
              <button
                onClick={closeLegalModal}
                className="btn-enterprise-primary text-xs py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
