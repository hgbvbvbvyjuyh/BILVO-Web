import React from 'react';
import { motion } from 'motion/react';
import { Phone, Zap, MessageSquare, ArrowRight, Timer, RefreshCw, Star } from 'lucide-react';
import { TabType } from '../types';
import { 
  staggerContainerVariants, 
  badgeVariants, 
  headingVariants, 
  descriptionVariants, 
  getAccessibleVariants 
} from '../lib/animations';

interface LiveDemosTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenConsultation: () => void;
}

interface SystemDemoCardProps {
  id: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  headline: string;
  problem?: string;
  benefits: string[];
  steps?: { label: string; detail: string }[];
  onOpenConsultation: () => void;
  prefersReducedMotion: boolean;
}

function SystemDemoCard({
  id,
  badgeText,
  icon: Icon,
  title,
  headline,
  problem,
  benefits,
  onOpenConsultation,
  prefersReducedMotion
}: SystemDemoCardProps) {
  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-[24px] border border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 p-6 sm:p-7 lg:p-8 relative overflow-hidden group text-left">
      {/* Accent subtle background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
      
      {/* Card Header & Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-xl text-[#2563EB]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full uppercase whitespace-nowrap">
            {badgeText}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-[#0F172A] tracking-tight">
          {title}
        </h3>
        
        <p className="mt-1.5 font-sans text-sm font-medium text-[#475569] leading-relaxed min-h-[44px]">
          {headline}
        </p>

        {/* Jargon-free Business Problem Statement (if provided) */}
        {problem && (
          <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-gray-100/80 text-xs font-sans text-slate-600 leading-relaxed italic relative">
            <span className="text-slate-400 font-bold not-italic block mb-1 text-[10px] uppercase tracking-wider">Business Problem:</span>
            "{problem}"
          </div>
        )}

        {/* 3 Clear Business Benefits */}
        <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5 flex-1">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
              <span className="text-emerald-600 font-bold text-base leading-none shrink-0 mt-0.5">✓</span>
              <span className="font-normal text-[#0F172A]/90">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={onOpenConsultation}
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors group/link cursor-pointer"
        >
          <span>Discuss this system</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

export default function LiveDemosTab({ setActiveTab, onOpenConsultation }: LiveDemosTabProps) {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const badge = getAccessibleVariants(badgeVariants, prefersReducedMotion);
  const heading = getAccessibleVariants(headingVariants, prefersReducedMotion);
  const description = getAccessibleVariants(descriptionVariants, prefersReducedMotion);

  return (
    <div className="flex flex-col gap-8 sm:gap-10 pt-4 sm:pt-6 pb-12 sm:pb-16" id="live-demos-tab-container">
      {/* Dedicated Live Demos Showcase Section */}
      <section className="w-full relative" id="live-demos-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants(0, 0.08)}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <motion.div variants={badge} className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase">
              LIVE DEMOS
            </motion.div>
            <motion.h1 variants={heading} className="mt-3.5 font-display text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-[#0F172A]">
              See Our AI Systems in Action
            </motion.h1>
            <motion.p variants={description} className="mt-3.5 sm:mt-4 mx-auto max-w-3xl font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85">
              Explore proven AI systems we've built for businesses. See how each one saves time, improves customer experience, and automates repetitive work—before you book a call.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Demo Card 1: AI Receptionist */}
            <SystemDemoCard 
              id="ai-receptionist"
              badgeText="SAVE TIME"
              icon={Phone}
              title="AI Receptionist"
              headline="Never miss another customer call."
              benefits={[
                "Answers common questions instantly",
                "Books appointments automatically",
                "Transfers urgent calls to your team"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Demo Card 2: AI Lead Response System */}
            <SystemDemoCard 
              id="lead-response"
              badgeText="GET MORE LEADS"
              icon={Zap}
              title="AI Lead Response System"
              headline="Turns new leads into booked meetings."
              benefits={[
                "Replies within seconds",
                "Qualifies prospects automatically",
                "Books meetings for your calendar"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Demo Card 3: AI Customer Support Assistant */}
            <SystemDemoCard 
              id="customer-support"
              badgeText="SERVE CUSTOMERS FASTER"
              icon={MessageSquare}
              title="AI Customer Support Assistant"
              headline="Provides fast support 24/7."
              benefits={[
                "Answers customer questions",
                "Escalates complex issues",
                "Reduces support workload"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Demo Card 4: Speed-to-Lead System */}
            <SystemDemoCard 
              id="speed-to-lead"
              badgeText="GET LEADS FASTER"
              icon={Timer}
              title="Speed-to-Lead System"
              headline="Respond to new leads within seconds while they're still ready to buy."
              benefits={[
                "Instant response to new inquiries",
                "Qualifies leads automatically",
                "Books appointments without waiting for your team"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Demo Card 5: Database Reactivation */}
            <SystemDemoCard 
              id="database-reactivation"
              badgeText="WIN BACK OLD CUSTOMERS"
              icon={RefreshCw}
              title="Database Reactivation"
              headline="Turn your existing customer database into new sales opportunities."
              benefits={[
                "Reconnect with past customers",
                "Follow up with old leads automatically",
                "Generate new appointments and sales"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Demo Card 6: Review Automation */}
            <SystemDemoCard 
              id="review-automation"
              badgeText="GET MORE REVIEWS"
              icon={Star}
              title="Review Automation"
              headline="Automatically ask happy customers for reviews and strengthen your online reputation."
              benefits={[
                "Request reviews at the right time",
                "Make it easy for customers to leave feedback",
                "Build more trust with future customers"
              ]}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </section>

      {/* Quick Action Consultation Banner */}
      <section className="w-full relative" id="live-demos-cta-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="static-card-container group flex flex-col items-center justify-between gap-6 rounded-[24px] p-6 sm:p-7 md:p-8 sm:flex-row"
          >
            <div className="text-left">
              <motion.h3 variants={heading} className="font-display text-xl sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                Ready to Make Your Business Easier to Run?
              </motion.h3>
              <motion.p variants={description} className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#0F172A]/85 mt-1.5 max-w-2xl">
                Let’s identify where your team is losing time, where costs can be reduced, and where your business can handle more work without adding more people.
              </motion.p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="group btn-enterprise-primary shrink-0"
            >
              <span>Schedule Your Strategy Session</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
