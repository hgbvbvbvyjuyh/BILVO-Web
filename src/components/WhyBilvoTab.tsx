import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Zap, 
  Sparkles,
  Headphones,
  Award,
  CalendarCheck
} from 'lucide-react';
import { TabType } from '../types';
import { 
  staggerContainerVariants, 
  badgeVariants, 
  headingVariants, 
  descriptionVariants, 
  cardRevealVariants, 
  getAccessibleVariants 
} from '../lib/animations';
import founderPortrait from '../assets/images/regenerated_image_1788687350782.png';
import founderPortraitWebp from '../assets/images/founder.webp';
import BilvoLogo from './BilvoLogo';

interface WhyBilvoTabProps {
  setActiveTab?: (tab: TabType) => void;
  onOpenConsultation: () => void;
}

export default function WhyBilvoTab({ setActiveTab, onOpenConsultation }: WhyBilvoTabProps) {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const badge = getAccessibleVariants(badgeVariants, prefersReducedMotion);
  const heading = getAccessibleVariants(headingVariants, prefersReducedMotion);
  const description = getAccessibleVariants(descriptionVariants, prefersReducedMotion);
  const card = getAccessibleVariants(cardRevealVariants, prefersReducedMotion);

  const coreValues = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Give your employees hours back each week. Routine admin, scheduling, and data entry happen automatically so your team can focus on valuable client work."
    },
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Reduce unnecessary operating costs and overhead. Handle higher workloads and client volume without the expense of hiring additional administrative staff."
    },
    {
      icon: TrendingUp,
      title: "Make More Money",
      description: "Respond to new inquiries in seconds and follow up instantly. Capture more leads, book more consultations, and win business before competitors reply."
    },
    {
      icon: CheckCircle2,
      title: "Eliminate Repetitive Work",
      description: "Remove manual busywork from your daily operations. Information flows cleanly between your tools without copying, pasting, or human error."
    }
  ];

  const businessProblems = [
    {
      problem: "Losing Sales to Slow Follow-Up",
      consequence: "When prospective clients reach out, waiting hours or days for a response usually means they contact a competitor instead. Every delayed reply is lost revenue.",
      solution: "Engage, qualify, and book appointments with inbound leads in under 60 seconds, capturing new business while buyer interest is highest."
    },
    {
      problem: "Employees Wasting Hours on Manual Busywork",
      consequence: "Your key team members lose 15 to 20 hours each week typing data, updating records across tools, and writing routine emails instead of serving paying clients.",
      solution: "Eliminate repetitive administrative work completely, freeing your existing staff to focus on high-value, revenue-producing activities."
    },
    {
      problem: "Spending Too Much on Work That Runs on Autopilot",
      consequence: "Paying employee salaries or contractor hours for basic clerical work, status tracking, and repetitive data entry inflates overhead and cuts into your profits.",
      solution: "Complete routine administrative tasks accurately without ongoing labor costs, directly lowering your operating expenses."
    },
    {
      problem: "Growth Blocked by Limited Team Capacity",
      consequence: "Taking on more customers currently requires hiring and training more staff, increasing payroll overhead and spreading management too thin.",
      solution: "Handle twice the customer and project volume with your current team, allowing your business to scale without adding to payroll."
    }
  ];

  const differentiators = [
    {
      icon: Layers,
      title: "Built Around Your Existing Tools",
      description: "We don't make you replace the software your team already knows. Everything is tailored to fit directly into your current CRM, email, and scheduling tools."
    },
    {
      icon: Users,
      title: "Zero Learning Curve for Staff",
      description: "Your team doesn't need to learn complicated new software or change their daily habits. The work gets done automatically in the background."
    },
    {
      icon: ShieldCheck,
      title: "Complete End-to-End Delivery",
      description: "We handle everything from initial assessment and setup to testing and ongoing support. You get a finished, working solution without having to manage vendors."
    },
    {
      icon: DollarSign,
      title: "Focused on Measurable ROI",
      description: "We only implement solutions that deliver tangible business returns: measurable hours saved, lower operational costs, and higher sales conversion."
    }
  ];

  const clientOutcomes = [
    {
      metric: "15–20 hrs",
      label: "Saved Weekly Per Employee",
      detail: "Eliminating routine data entry, status follow-ups, and calendar coordination."
    },
    {
      metric: "< 60 sec",
      label: "Average Lead Response Time",
      detail: "Greeting, qualifying, and booking qualified prospects while interest is highest."
    },
    {
      metric: "24/7",
      label: "Always-On Business Coverage",
      detail: "Handling customer questions and after-hours inquiries without adding night shifts."
    },
    {
      metric: "30–40%",
      label: "Lower Administrative Overhead",
      detail: "Handling significantly more client volume while protecting healthy profit margins."
    }
  ];

  return (
    <div className="w-full animate-fade-in text-left pt-6 sm:pt-10 pb-16 md:pb-24 space-y-16 sm:space-y-20 md:space-y-24" id="why-bilvo-tab-container">
      
      {/* 1. Hero: What Bilvo Ai Helps Businesses Achieve */}
      <section className="w-full relative" id="why-bilvo-hero">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.div 
              variants={badge} 
              className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase"
            >
              <BilvoLogo size="sm" />
              <span>WHY BILVO AI</span>
            </motion.div>
            
            <motion.h1 
              variants={heading} 
              className="mt-4 font-display text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-[#0F172A] leading-[1.12]"
            >
              Run a Leaner, Faster Business That Scales Without More Overhead
            </motion.h1>
            
            <motion.p 
              variants={description} 
              className="mt-4 sm:mt-5 font-sans text-base sm:text-[17px] md:text-[18px] leading-relaxed text-[#0F172A]/85 max-w-2xl"
            >
              Bilvo Ai helps growing companies eliminate daily administrative bottlenecks, answer customers instantly, and expand capacity without adding to payroll.
            </motion.p>
          </motion.div>

          {/* Core Outcomes: 4 Key Value Cards */}
          <motion.div 
            variants={staggerContainerVariants(0.12, 0.08)}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
          >
            {coreValues.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={card}
                  className="glass-card rounded-[24px] p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#2563EB]/40 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="h-11 w-11 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform duration-200">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#475569]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 2. The Business Problems We Solve */}
      <section className="w-full relative" id="why-bilvo-problems">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.div 
              variants={badge} 
              className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase"
            >
              <AlertCircle className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>THE PROBLEMS WE SOLVE</span>
            </motion.div>
            
            <motion.h2 
              variants={heading} 
              className="mt-4 font-display text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight text-[#0F172A] leading-[1.15]"
            >
              Everyday Problems That Drain Your Time and Profits
            </motion.h2>
            
            <motion.p 
              variants={description} 
              className="mt-3.5 sm:mt-4 font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85 max-w-2xl"
            >
              Most businesses lose thousands of dollars and countless staff hours to slow responses, repetitive manual work, and rising overhead. Here is how we fix them.
            </motion.p>
          </motion.div>

          <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-2">
            {businessProblems.map((prob, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={card}
                className="bg-white rounded-[24px] border border-gray-200/80 p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-rose-600 font-display font-semibold text-xs tracking-wider uppercase">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Common Bottleneck
                  </div>
                  <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                    {prob.problem}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">
                    {prob.consequence}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-sm text-blue-900 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100/80">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-blue-950 block text-xs uppercase tracking-wide">How Bilvo Ai Solves It:</span>
                    <span className="text-blue-900 text-xs sm:text-sm">{prob.solution}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Our Approach Is Different */}
      <section className="w-full relative" id="why-bilvo-difference">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.div 
              variants={badge} 
              className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase"
            >
              <Award className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>OUR DIFFERENCE</span>
            </motion.div>
            
            <motion.h2 
              variants={heading} 
              className="mt-4 font-display text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight text-[#0F172A] leading-[1.15]"
            >
              A Practical Approach Built for Real Business Owners
            </motion.h2>
            
            <motion.p 
              variants={description} 
              className="mt-3.5 sm:mt-4 font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85 max-w-2xl"
            >
              You shouldn't have to hire expensive software developers or settle for rigid, off-the-shelf tools that don't match how your company works.
            </motion.p>
          </motion.div>

          <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-2">
            {differentiators.map((diff, idx) => {
              const IconComponent = diff.icon;
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={card}
                  className="value-card group rounded-[24px] p-7 sm:p-8 space-y-4 text-left h-full flex flex-col justify-start"
                >
                  <div className="obsidian-icon-badge">
                    <IconComponent className="h-5 w-5 group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {diff.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#0F172A]/85 font-normal">
                    {diff.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Founder Credibility */}
      <section className="w-full relative" id="why-bilvo-founder">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={card}
            className="founder-card rounded-[24px] p-8 md:p-12 relative overflow-hidden" 
          >
            <div className="absolute right-0 top-0 h-48 w-48 bg-brand-blue/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Bio Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB] uppercase">
                    LEADERSHIP & BACKGROUND
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                    Rofiqul Islam
                  </h2>
                  <p className="font-sans text-sm font-medium text-slate-600">
                    Founder, Bilvo Ai • AI Automation Specialist
                  </p>
                </div>

                <div className="space-y-4 font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85">
                  <p>
                    Rofiqul founded Bilvo Ai to help businesses remove the repetitive work that slows teams down and limits growth.
                  </p>
                  <p>
                    With hands-on experience in AI automation, he works directly with business owners to understand how their operations actually run—from lead management and customer follow-up to administrative tasks and internal processes. By asking the right questions and examining where time, money, and opportunities are being lost, he identifies the bottlenecks that are worth solving.
                  </p>
                  <p>
                    The goal isn't to automate everything. It's to build practical business systems around the processes that create the biggest impact—helping businesses save time, reduce unnecessary costs, respond faster, and handle more work without adding unnecessary complexity.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-[#0F172A] block text-xs sm:text-sm">Business-First Automation</span>
                      <span className="text-slate-600 text-xs leading-relaxed block">Focus on the processes that directly affect time, costs, and growth.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-[#0F172A] block text-xs sm:text-sm">Hands-On Strategy</span>
                      <span className="text-slate-600 text-xs leading-relaxed block">Work directly with Rofiqul to identify bottlenecks and prioritize the right opportunities.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Portrait */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-slate-900 shadow-xl aspect-[4/3] lg:aspect-[4/5] w-full">
                  <picture>
                    <source srcSet={founderPortraitWebp} type="image/webp" />
                    <img
                      src={founderPortrait}
                      alt="Portrait profile of Rofiqul Islam, Bilvo Ai founder"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={500}
                      height={625}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Business Outcomes Clients Can Expect */}
      <section className="w-full relative" id="why-bilvo-outcomes">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="max-w-3xl"
          >
            <motion.div 
              variants={badge} 
              className="inline-flex items-center gap-2 rounded-full border border-[#EFF6FF] bg-[#EFF6FF] px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-[#2563EB] uppercase"
            >
              <TrendingUp className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>MEASURABLE OUTCOMES</span>
            </motion.div>
            
            <motion.h2 
              variants={heading} 
              className="mt-4 font-display text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight text-[#0F172A] leading-[1.15]"
            >
              The Real Business Results You Can Expect
            </motion.h2>
            
            <motion.p 
              variants={description} 
              className="mt-3.5 sm:mt-4 font-sans text-base sm:text-[17px] leading-relaxed text-[#0F172A]/85 max-w-2xl"
            >
              When your core processes run smoothly without manual bottlenecks, the results show up directly in your team's productivity and bottom line.
            </motion.p>
          </motion.div>

          <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientOutcomes.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={card}
                className="glass-card rounded-[24px] p-6 sm:p-7 flex flex-col justify-between h-full border border-gray-200/80"
              >
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#2563EB] tracking-tight">
                    {item.metric}
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-[#0F172A] tracking-tight">
                    {item.label}
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Strong Final CTA */}
      <section className="w-full relative" id="why-bilvo-final-cta">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainerVariants(0, 0.08)}
            className="static-card-container group flex flex-col items-center justify-between gap-6 rounded-[24px] p-6 sm:p-8 md:p-10 sm:flex-row"
          >
            <div className="text-left">
              <motion.h3 variants={heading} className="font-display text-xl sm:text-[24px] font-bold text-[#0F172A] tracking-tight">
                Ready to Make Your Business Easier to Run?
              </motion.h3>
              <motion.p variants={description} className="font-sans text-sm sm:text-[16px] leading-relaxed text-[#0F172A]/85 mt-1.5 max-w-2xl">
                Let’s identify where your team is losing time, where costs can be reduced, and where your business can handle more work without adding more people.
              </motion.p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="group btn-enterprise-primary shrink-0"
              id="why-bilvo-strategy-button"
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
