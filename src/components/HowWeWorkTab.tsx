import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, BarChart3, Clock, Lock, Sparkles, Sliders, ArrowRight, ChevronDown, MessageSquare } from 'lucide-react';
import { PHASES } from '../data';
import { PhaseInfo, TabType } from '../types';
import { 
  staggerContainerVariants, 
  badgeVariants, 
  headingVariants, 
  descriptionVariants, 
  buttonVariants, 
  cardRevealVariants, 
  imageRevealVariants, 
  getAccessibleVariants 
} from '../lib/animations';

interface HowWeWorkTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenConsultation: () => void;
}

const faqs = [
  {
    q: 'What kind of work can you automate?',
    a: 'We can automate many repetitive business processes, including lead follow-up, appointment booking, customer inquiries, data entry, reporting, internal workflows, and other administrative tasks.'
  },
  {
    q: 'Will automation replace my employees?',
    a: 'No. The goal is to remove repetitive work so your team can spend more time on work that actually requires people, judgment, and customer relationships.'
  },
  {
    q: 'How can automation save my business money?',
    a: 'By reducing the amount of manual work your team has to perform, automation can reduce wasted employee hours, administrative overhead, and the need to hire additional staff for repetitive tasks.'
  },
  {
    q: 'Can automation actually help me make more money?',
    a: 'Yes. Automation can help businesses respond to leads faster, follow up consistently, reduce missed opportunities, improve customer experiences, and handle more business without adding the same amount of overhead.'
  },
  {
    q: 'Do I need to change the software my business already uses?',
    a: 'Not necessarily. We aim to work with your existing tools wherever practical rather than forcing you to replace systems that already work for your business.'
  },
  {
    q: 'How long does it take to implement?',
    a: 'It depends on the complexity of the process and the systems involved. After understanding your requirements, we can give you a clearer implementation timeline.'
  },
  {
    q: 'What happens after the system is built?',
    a: 'We monitor the system, make improvements where needed, and help ensure it continues to support your business as your processes and needs change.'
  },
  {
    q: 'How much does automation cost?',
    a: 'The cost depends on what needs to be automated, the complexity of the workflow, and the systems involved. We recommend starting with a strategy session so we can understand the opportunity before recommending a solution.'
  }
];

interface FAQItemProps {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  variants: any;
}

const FAQItem = React.memo(({ faq, isOpen, onToggle, variants }: FAQItemProps) => {
  return (
    <motion.div 
      variants={variants}
      className="w-full transition-colors duration-200 hover:bg-slate-50/60"
    >
      <h3 className="m-0 p-0 block font-normal">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 md:px-5 py-4.5 md:py-5 text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg"
        >
          <span className={`font-display text-base md:text-[17px] font-semibold transition-colors pr-4 leading-snug ${
            isOpen ? 'text-[#2563EB]' : 'text-[#0F172A] group-hover:text-[#2563EB]'
          }`}>
            {faq.q}
          </span>
          <span className="shrink-0 ml-3">
            <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
              isOpen ? 'text-[#2563EB] rotate-180' : 'group-hover:text-[#0F172A]'
            }`} />
          </span>
        </button>
      </h3>

      <div 
        className={`grid transition-all duration-250 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 md:px-5 pb-5 pt-0 font-sans text-sm md:text-[15.5px] text-[#0F172A]/85 leading-relaxed">
            {faq.a}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

interface FAQAccordionProps {
  containerVariants: any;
  cardVariants: any;
}

const FAQAccordion = React.memo(({ containerVariants, cardVariants }: FAQAccordionProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-8 md:mt-10 border-y border-slate-200/90 divide-y divide-slate-200/90" 
      id="faq-accordion-container"
    >
      {faqs.map((faq, idx) => (
        <FAQItem
          key={idx}
          faq={faq}
          isOpen={openFaqIndex === idx}
          onToggle={() => toggleFaq(idx)}
          variants={cardVariants}
        />
      ))}
    </motion.div>
  );
});

export default function HowWeWorkTab({ setActiveTab, onOpenConsultation }: HowWeWorkTabProps) {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const currentPhase: PhaseInfo = PHASES[activePhaseIndex];

  const container = staggerContainerVariants();
  const badge = getAccessibleVariants(badgeVariants, prefersReducedMotion);
  const heading = getAccessibleVariants(headingVariants, prefersReducedMotion);
  const description = getAccessibleVariants(descriptionVariants, prefersReducedMotion);
  const button = getAccessibleVariants(buttonVariants, prefersReducedMotion);
  const card = getAccessibleVariants(cardRevealVariants, prefersReducedMotion);
  const image = getAccessibleVariants(imageRevealVariants, prefersReducedMotion);

  return (
    <div className="w-full animate-fade-in" id="how-we-work-container">
      {/* 1. Our Process Section */}
      <section className="w-full relative" id="process-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Upper Title Area */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.span variants={badge} className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase">
              OUR PROCESS
            </motion.span>
            <motion.h1 variants={heading} className="mt-4 font-display text-3xl md:text-[40px] font-bold tracking-tight text-[#0F172A]">
              A Simple Process That Gets Results
            </motion.h1>
            <motion.p variants={description} className="mt-4 md:mt-5 font-sans text-base sm:text-[18px] leading-relaxed text-[#0F172A]/85">
              Every successful system starts with understanding how your business actually works. We identify the biggest opportunities, build the right solution, and continuously improve it as your business grows.
            </motion.p>
          </motion.div>

      {/* Stepper Buttons Panel */}
      <motion.div 
        variants={staggerContainerVariants(0.12, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-8 md:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
        id="phase-stepper-menu"
      >
        {[
          {
            phase: 1,
            label: "PHASE 01",
            number: "01",
            title: "Discover & Diagnose",
          },
          {
            phase: 2,
            label: "PHASE 02",
            number: "02",
            title: "Design, Build & Validate",
          },
          {
            phase: 3,
            label: "PHASE 03",
            number: "03",
            title: "Launch, Monitor & Optimize",
          }
        ].map((item, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <motion.button
              key={item.phase}
              variants={card}
              onClick={() => setActivePhaseIndex(idx)}
              className={`phase-nav-card group relative flex items-center gap-4 rounded-[24px] p-4 sm:p-5 md:p-6 text-left transition-all duration-300 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
                isActive ? 'active' : ''
              }`}
              id={`stepper-btn-phase-${item.phase}`}
            >
              {/* Number Badge on the Left */}
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' 
                  : 'bg-[#EFF6FF] text-[#2563EB] group-hover:bg-[#DBEAFE]'
              }`}>
                {item.number}
              </div>

              {/* Label & Title on the Right */}
              <div className="flex flex-col min-w-0">
                <span className={`font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors duration-300 ${
                  isActive 
                    ? 'text-[#2563EB]' 
                    : 'text-[#64748B] group-hover:text-[#0F172A]'
                }`}>
                  {item.label}
                </span>
                <h3 className="font-display text-sm md:text-base font-bold tracking-tight text-[#0F172A] mt-1">
                  {item.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Stepper Content Display */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={card}
        className="mt-5 sm:mt-6 rounded-[24px] p-6 sm:p-8 md:p-10 relative overflow-hidden static-card-container" 
        id="phase-viewer-display"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[75%] md:max-w-[85%] mr-auto text-left flex flex-col items-start"
          >
            {/* Phase Text Content */}
            <div className="w-full flex flex-col items-start text-left">
               {/* Section Label */}
              <span className="font-mono text-xs font-medium tracking-wider text-[#2563EB] uppercase">
                {currentPhase.subtitle}
              </span>
              
              {/* Heading */}
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-[36px] font-bold tracking-tight text-[#0F172A] leading-tight">
                {currentPhase.title}
              </h2>
              
              {/* Tagline */}
              <p className="mt-3 font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85">
                {currentPhase.tagline}
              </p>

              {/* Bullet list */}
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-4.5 font-sans w-full">
                {currentPhase.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-[#0F172A]/85 leading-relaxed text-base sm:text-[17px] font-normal">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
        </div>
      </section>

      {/* Quick Action bar */}
      <section className="w-full relative" id="how-we-work-cta-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="static-card-container group flex flex-col items-center justify-between gap-6 rounded-[24px] p-6 sm:p-8 md:p-10 sm:flex-row"
          >
            <div className="text-left">
              <motion.h3 variants={heading} className="font-display text-[22px] font-bold text-[#0F172A] tracking-tight">Ready to save time and grow faster?</motion.h3>
              <motion.p variants={description} className="font-sans text-[16px] leading-relaxed text-[#0F172A]/85 mt-1.5">Get a custom blueprint showing exactly where your business can save hours and reduce costs.</motion.p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="group btn-enterprise-primary shrink-0"
            >
              <span>Book My Strategy Session</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Frequently Asked Questions (FAQ) Accordion Section */}
      <section className="w-full relative" id="faq-section-wrapper">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl mx-auto" id="testimonials-faq-section">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={staggerContainerVariants(0, 0.08)}
              className="text-center mx-auto max-w-2xl"
            >
              <motion.div variants={badge} className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </motion.div>
              <motion.h2 variants={heading} className="mt-3 font-display text-2xl sm:text-3xl md:text-[36px] font-bold text-[#0F172A] tracking-tight leading-[1.15]">
                Clear Answers to Common Questions
              </motion.h2>
              <motion.p variants={description} className="mt-3 md:mt-4 font-sans text-base sm:text-[17px] leading-[1.7] text-[#0F172A]/85">
                Everything you need to know about what we automate, software integrations, employee impact, and getting started.
              </motion.p>
            </motion.div>

            <FAQAccordion 
              containerVariants={container} 
              cardVariants={card} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
