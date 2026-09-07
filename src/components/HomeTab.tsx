import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Trophy, Clock, Cpu, Eye, Layers, Zap, ShieldCheck, UserCheck } from 'lucide-react';
import { TabType } from '../types';
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

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenConsultation: () => void;
}

export default function HomeTab({ setActiveTab, onOpenConsultation }: HomeTabProps) {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const container = staggerContainerVariants();
  const badge = getAccessibleVariants(badgeVariants, prefersReducedMotion);
  const heading = getAccessibleVariants(headingVariants, prefersReducedMotion);
  const description = getAccessibleVariants(descriptionVariants, prefersReducedMotion);
  const button = getAccessibleVariants(buttonVariants, prefersReducedMotion);
  const card = getAccessibleVariants(cardRevealVariants, prefersReducedMotion);
  const image = getAccessibleVariants(imageRevealVariants, prefersReducedMotion);

  // Stats definitions - calibrated for established agency trust bar
  const stats = [
    { 
      eyebrow: 'ENTERPRISE DEPLOYMENTS',
      value: '25+', 
      label: 'Production Systems Built', 
      detail: 'Custom AI pipelines & automated operations',
      icon: Trophy 
    },
    { 
      eyebrow: 'OPERATIONAL ROI',
      value: '4,000+', 
      label: 'Hours Saved / Month', 
      detail: 'Manual bottlenecks permanently eliminated',
      icon: Clock 
    },
    { 
      eyebrow: 'DIRECT ENGAGEMENT',
      value: 'Rofiqul Islam', 
      label: 'Founder & Principal Architect', 
      detail: 'Direct strategy & executive delivery',
      trustBadge: 'Principal-Led',
      icon: UserCheck 
    }
  ];

  const heroParticles = [
    { id: 1, top: '15%', left: '12%', size: '3px', delay: 0, duration: 9 },
    { id: 2, top: '22%', left: '88%', size: '4px', delay: 1, duration: 11 },
    { id: 3, top: '55%', left: '8%', size: '3px', delay: 2, duration: 8 },
    { id: 4, top: '48%', left: '84%', size: '5px', delay: 0.5, duration: 10 },
    { id: 5, top: '68%', left: '42%', size: '4px', delay: 1.5, duration: 9 },
  ];

  return (
    <div className="bg-grid-pattern pb-0" id="home-tab-container">
      {/* 1. Hero & Stats Section */}
      <section className="relative w-full overflow-hidden" id="hero-section">
        {/* Soft, layered premium cinema background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.05, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        >
          {/* Subtle Animated Perspective Grid with low opacity */}
          <div className="hero-perspective-grid-container">
            <div className="hero-perspective-grid animate-grid-scroll opacity-30" />
          </div>

          {/* Slow Moving Layered Mesh Glows */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <div className="hero-mesh-glow-1" />
            <div className="hero-mesh-glow-2" />
            <div className="hero-mesh-glow-3" />
          </div>

          {/* Soft Blue Radial Lighting behind Headline */}
          <div className="headline-ambient-glow" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl lg:max-w-[1350px] px-6 flex flex-col justify-center items-center text-center">
          {/* Elegant Floating Glass Orb behind Hero */}
          <motion.div 
            className="hero-floating-orb pointer-events-none hidden md:block"
            style={{
              width: '380px',
              height: '380px',
              top: '5%',
              right: '5%',
              opacity: 0.15,
            }}
            animate={prefersReducedMotion ? {} : {
              y: [-15, 15, -15],
              x: [-8, 8, -8],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Slow Moving Particles with volumetric blurs */}
          {heroParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-blue-400/10 pointer-events-none"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 8px 1px rgba(96, 165, 250, 0.2)',
                zIndex: 0,
              }}
              animate={prefersReducedMotion ? {} : {
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.08, 0.25, 0.08],
              }}
              transition={{
                duration: p.duration + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

          {/* Modern Minimalist Badge */}
          <motion.div 
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3 py-1 font-sans text-[11px] sm:text-xs font-semibold tracking-wider text-[#2563EB] uppercase relative z-10"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>RELIABLE OPERATIONS AUTOMATION</span>
          </motion.div>

          {/* Clean Typography Heading animated line-by-line with a subtle stagger */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[54px] xl:text-[62px] 2xl:text-[70px] font-bold tracking-tighter text-[#0F172A] leading-[1.1] max-w-4xl xl:max-w-[1000px] mt-4 sm:mt-5 relative z-10">
            <span className="block overflow-hidden py-0.5">
              <motion.span 
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#0F172A]"
              >
                AI Systems That Scale
              </motion.span>
            </span>
            <span className="block text-[#0F172A] overflow-hidden py-0.5">
              <motion.span 
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#0F172A]"
              >
                Your Business.
              </motion.span>
            </span>
            <span className="block text-[#2563EB] overflow-hidden py-0.5">
              <motion.span 
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#2563EB]"
              >
                Without Increasing the Workload.
              </motion.span>
            </span>
          </h1>

          {/* Premium Description Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[680px] font-sans text-sm sm:text-base xl:text-[17px] 2xl:text-[18px] leading-[1.7] text-[#0F172A]/85 mt-4 sm:mt-5 relative z-10"
          >
            We identify operational bottlenecks, automate repetitive processes, and build business systems that increase capacity, reduce operating costs, and enable your company to scale efficiently—without adding unnecessary headcount or complexity.
          </motion.p>

          {/* Both CTAs kept on the same line */}
          <div 
            className="flex flex-row items-center justify-center gap-4 flex-wrap w-full mt-6 sm:mt-8 relative z-10"
          >
            <button
              onClick={onOpenConsultation}
              className="group btn-enterprise-primary"
              id="hero-cta-primary"
            >
              <span>Schedule an AI Strategy Session</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('live-demos');
              }}
              className="btn-enterprise-secondary"
              id="hero-cta-secondary"
            >
              Explore Solutions
            </button>
          </div>

        </div>
      </section>

    {/* 2. Trust Proof Cards Section */}
    <section className="relative w-full z-10 pt-4 pb-8 sm:pt-6 sm:pb-12" id="trust-cards-section">
      <div className="mx-auto max-w-4xl lg:max-w-5xl px-6" id="stats-grid-container">
        <motion.div 
          variants={staggerContainerVariants(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full" 
          id="stats-grid"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isFounderCard = idx === 2;
            return (
              <motion.div
                key={idx}
                variants={card}
                id={isFounderCard ? 'founder-trust-card' : undefined}
                className={`trust-card group relative overflow-hidden rounded-xl p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 w-full border border-slate-200/80 transition-all duration-200 ${
                  isFounderCard ? 'ring-1 ring-blue-500/20' : ''
                }`}
              >
                {/* Header row: category tracker eyebrow + compact icon badge */}
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    {stat.eyebrow}
                  </span>
                  <div className={`trust-card-icon flex h-6 w-6 sm:h-6.5 sm:w-6.5 items-center justify-center rounded-md shrink-0 ${
                    isFounderCard ? 'bg-blue-50 text-[#2563EB] border-blue-200/70' : 'bg-slate-50 text-slate-600 border-slate-200/70'
                  }`}>
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                </div>

                {/* Primary Metric or Name */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-display text-xl sm:text-[22px] font-bold tracking-tight text-[#0F172A] leading-tight">
                      {stat.value}
                    </p>
                    {isFounderCard && stat.trustBadge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 font-sans text-[9px] font-semibold text-[#2563EB] tracking-wide">
                        <ShieldCheck className="h-2.5 w-2.5 text-[#2563EB] shrink-0" />
                        {stat.trustBadge}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs sm:text-[12.5px] font-semibold tracking-tight text-[#0F172A]/85 mt-0.5 leading-snug">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[10.5px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight truncate">
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

      {/* 3. The Bilvo Ai Method Teaser */}
      <section className="w-full relative" id="methodology-teaser-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="static-card-container rounded-[24px] p-8 md:p-10 relative overflow-hidden" 
            id="methodology-teaser"
          >
          {/* Subtle decoration lines */}
          <div className="absolute right-0 top-0 h-48 w-48 bg-brand-purple/5 blur-[50px] rounded-full" />
          
          <div className="max-w-2xl">
            <motion.span variants={badge} className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase">
              OUR PROCESS
            </motion.span>
            <motion.h2 variants={heading} className="mt-4 font-display text-3xl md:text-[40px] font-bold tracking-tight text-[#0F172A]">
              A Simple Process That Gets Results
            </motion.h2>
            <motion.p variants={description} className="mt-5 md:mt-6 font-sans text-[18px] leading-relaxed text-[#0F172A]/85">
              Every successful system starts with understanding how your business actually works. We identify the biggest opportunities, build the right solution, and continuously improve it as your business grows.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainerVariants(0.12, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-10 md:mt-12 grid gap-6 md:grid-cols-3"
          >
            {/* Phase 1 card teaser */}
            <motion.div 
              variants={card}
              className="phase-teaser-card group rounded-[24px] p-8 md:p-10 flex flex-col h-full justify-between"
            >
              <div className="space-y-6 text-left">
                <div className="obsidian-icon-badge">
                  <Layers className="h-5 w-5 group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#2563EB] uppercase">Phase 01</span>
                  <h3 className="font-display text-[22px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">Discover & Diagnose</h3>
                  <p className="text-xs font-sans text-[#2563EB] font-medium tracking-wide">understand fast, automate second</p>
                </div>
                <p className="font-sans text-[16px] leading-relaxed text-[#0F172A]/85 font-normal">
                  We review your current daily tasks, uncovering bottleneck areas that slow your team down.
                </p>
              </div>
            </motion.div>

            {/* Phase 2 card teaser */}
            <motion.div 
              variants={card}
              className="phase-teaser-card group rounded-[24px] p-8 md:p-10 flex flex-col h-full justify-between"
            >
              <div className="space-y-6 text-left">
                <div className="obsidian-icon-badge">
                  <Cpu className="h-5 w-5 group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#2563EB] uppercase">Phase 02</span>
                  <h3 className="font-display text-[22px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">Design, Build & Validate</h3>
                  <p className="text-xs font-sans text-[#2563EB] font-medium tracking-wide">custom solutions, tested before launch</p>
                </div>
                <p className="font-sans text-[16px] leading-relaxed text-[#0F172A]/85 font-normal">
                  We design bespoke automation workflows that fit seamlessly with your team's daily habits.
                </p>
              </div>
            </motion.div>

            {/* Phase 3 card teaser */}
            <motion.div 
              variants={card}
              className="phase-teaser-card group rounded-[24px] p-8 md:p-10 flex flex-col h-full justify-between"
            >
              <div className="space-y-6 text-left">
                <div className="obsidian-icon-badge">
                  <Zap className="h-5 w-5 group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#2563EB] uppercase">Phase 03</span>
                  <h3 className="font-display text-[22px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">Launch, Monitor & Optimize</h3>
                  <p className="text-xs font-sans text-[#2563EB] font-medium tracking-wide">Continuous improvement, not a one-off project</p>
                </div>
                <p className="font-sans text-[16px] leading-relaxed text-[#0F172A]/85 font-normal">
                  We launch, monitor, and continuously optimize your new automated systems for long-term reliability.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={button} className="mt-10 flex">
            <motion.button
              onClick={() => {
                setActiveTab('how-we-work');
                const el = document.getElementById('how-we-work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={prefersReducedMotion ? {} : { 
                y: -1, 
                scale: 1.01, 
                backgroundColor: "#EFF6FF",
                borderColor: "#2563EB"
              }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#2563EB] bg-white px-8 py-4 font-sans text-sm font-semibold tracking-wide text-[#2563EB] cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              id="teaser-methodology-btn"
            >
              <span>See How We Work</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>
        </motion.div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="w-full relative" id="cta-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="static-card-container relative overflow-hidden rounded-[24px] p-8 md:p-10 text-center"
          >
          {/* Subtle Ambient light spotlights styling */}
          <div className="absolute left-[-10%] top-[-20%] h-60 w-60 rounded-full bg-brand-blue/5 blur-[90px]" />

          <motion.div variants={badge} className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase">
            GROW WITHOUT THE BUSYWORK
          </motion.div>
          <motion.h2 variants={heading} className="mt-6 font-display text-3xl md:text-[40px] font-bold tracking-tight text-[#0F172A] leading-[1.15]">
            Give Your Team More Time to Grow.<br />Scale Your Business Without More Work.
          </motion.h2>
          <motion.p variants={description} className="mx-auto mt-6 max-w-2xl font-sans text-[18px] leading-[1.7] text-[#0F172A]/85">
            We take repetitive work off your team’s plate, make everyday operations more efficient, and help your business handle more customers and opportunities without adding unnecessary costs or staff.
          </motion.p>

          <motion.div variants={button} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenConsultation}
              className="group btn-enterprise-primary"
              id="cta-section-primary-btn"
            >
              <span>Schedule an AI Strategy Session</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => {
                setActiveTab('how-we-work');
                const el = document.getElementById('how-we-work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-enterprise-secondary"
            >
              See How We Work
            </button>
          </motion.div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

