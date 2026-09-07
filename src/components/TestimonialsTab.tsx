import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { TabType } from '../types';
import { 
  staggerContainerVariants, 
  badgeVariants, 
  headingVariants, 
  descriptionVariants, 
  cardRevealVariants, 
  getAccessibleVariants 
} from '../lib/animations';

interface TestimonialsTabProps {
  setActiveTab?: (tab: TabType) => void;
  onOpenConsultation?: () => void;
}

export default function TestimonialsTab({ setActiveTab, onOpenConsultation }: TestimonialsTabProps) {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const badge = getAccessibleVariants(badgeVariants, prefersReducedMotion);
  const heading = getAccessibleVariants(headingVariants, prefersReducedMotion);
  const description = getAccessibleVariants(descriptionVariants, prefersReducedMotion);
  const card = getAccessibleVariants(cardRevealVariants, prefersReducedMotion);

  const handleCtaClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (setActiveTab) {
      setActiveTab('live-demos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full animate-fade-in text-left pt-6 sm:pt-10 pb-16 md:pb-24" id="testimonials-tab-container">
      <section className="w-full relative" id="testimonials-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Header */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.div 
              variants={badge} 
              className="inline-flex items-center rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase"
            >
              TESTIMONIALS
            </motion.div>
            
            <motion.h1 
              variants={heading} 
              className="mt-4 font-display text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#0F172A] leading-[1.15]"
            >
              Trusted by Businesses That Value Results
            </motion.h1>
            
            <motion.p 
              variants={description} 
              className="mt-4 sm:mt-5 font-sans text-base sm:text-[17px] md:text-[18px] leading-relaxed text-[#0F172A]/85 max-w-2xl"
            >
              See what business owners and leaders say about working with us. Every system is built to solve real operational problems and deliver measurable results.
            </motion.p>
          </motion.div>

          {/* Testimonial Cards */}
          <motion.div 
            variants={staggerContainerVariants(0.12, 0.08)}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-3 items-stretch" 
            id="testimonials-quotes-grid"
          >
            {TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={card}
                className="glass-card group flex flex-col justify-between rounded-[24px] p-8 md:p-10 relative h-full"
              >
                {/* Top content: Star rating & Quote with consistent flex expansion */}
                <div className="flex flex-col flex-1">
                  {/* Star Rating row */}
                  <div className="flex gap-1.5 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-3.5 w-3.5 fill-current text-amber-400 group-hover:scale-105 transition-transform duration-200" 
                        style={{ transitionDelay: `${i * 30}ms` }} 
                      />
                    ))}
                  </div>

                  {/* Quote area with uniform spacing and full absorption of vertical height */}
                  <div className="mt-6 flex-1 flex flex-col justify-start">
                    <blockquote className="font-sans text-[16px] leading-relaxed text-[#0F172A]/85 italic relative z-10 font-normal">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Bottom content: Author attribution & Outcome badge consistently pinned */}
                <div className="mt-8 flex flex-col justify-end shrink-0">
                  <div className="flex items-center gap-3.5 min-h-[44px]">
                    <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-display text-sm font-bold text-[#2563EB] bg-[#EFF6FF] shadow-inner">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="text-left min-w-0">
                      <cite className="block not-italic font-display text-sm font-bold text-[#0F172A] leading-snug">
                        {testimonial.author}
                      </cite>
                      <span className="block mt-0.5 font-sans text-xs text-gray-500">
                        {testimonial.role}, <span className="font-medium text-gray-600">{testimonial.company}</span>
                      </span>
                    </div>
                  </div>

                  {/* Outcome tag aligned to the bottom across all cards */}
                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between min-h-[44px]">
                    <span className="text-gray-400 font-semibold tracking-wider uppercase font-mono text-[10px] shrink-0">
                      Outcome
                    </span>
                    <span className="font-mono text-xs text-[#2563EB] bg-[#EFF6FF] border border-[#2563EB]/20 px-3 py-1.5 rounded-lg font-bold tracking-tight inline-flex items-center justify-center shrink-0">
                      {testimonial.improvement}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* End-of-Page Call to Action */}
      <section className="w-full relative mt-12 sm:mt-16 md:mt-20" id="testimonials-cta-section">
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
                See What Better Business Operations Look Like.
              </motion.h3>
              <motion.p variants={description} className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#0F172A]/85 mt-1.5 max-w-2xl">
                See how businesses are using smarter processes to save time, reduce costs, and create more capacity for growth.
              </motion.p>
            </div>
            <button
              onClick={handleCtaClick}
              className="group btn-enterprise-primary shrink-0"
              id="testimonials-results-cta-button"
            >
              <span>Schedule a Strategy Session</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
