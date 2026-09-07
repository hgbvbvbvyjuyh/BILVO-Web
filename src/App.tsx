import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { Cpu, Mail, Star, Users, ArrowRight } from 'lucide-react';
import { TabType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';

// Tab components imports - HomeTab eager for instantaneous initial paint
import HomeTab from './components/HomeTab';

// Code-split secondary views with background idle prefetching
const HowWeWorkTab = lazy(() => import('./components/HowWeWorkTab'));
const LiveDemosTab = lazy(() => import('./components/LiveDemosTab'));
const TestimonialsTab = lazy(() => import('./components/TestimonialsTab'));
const WhyBilvoTab = lazy(() => import('./components/WhyBilvoTab'));
const ConsultationModal = lazy(() => import('./components/ConsultationModal'));

const preloadSecondaryRoutes = () => {
  import('./components/HowWeWorkTab');
  import('./components/LiveDemosTab');
  import('./components/TestimonialsTab');
  import('./components/WhyBilvoTab');
  import('./components/ConsultationModal');
};

const getTabFromLocation = (): TabType | '404' => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  const token = hash || path;

  if (!token || token === 'home') return 'home';
  if (token === 'how-we-work') return 'how-we-work';
  if (token === 'live-demos' || token === 'demos') return 'live-demos';
  if (token === 'testimonials') return 'testimonials';
  if (token === 'why-bilvo' || token === 'about') return 'why-bilvo';

  return '404';
};

export default function App() {
  const [theme, setTheme] = useState<'bilvo' | 'midnight'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bilvo-theme');
      if (saved === 'midnight') {
        return 'midnight';
      }
    }
    return 'bilvo';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'bilvo' ? 'midnight' : 'bilvo'));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'midnight') {
      root.setAttribute('data-theme', 'midnight');
      root.classList.add('theme-midnight');
      root.classList.remove('theme-bilvo');
    } else {
      root.setAttribute('data-theme', 'bilvo');
      root.classList.add('theme-bilvo');
      root.classList.remove('theme-midnight');
    }
    localStorage.setItem('bilvo-theme', theme);
  }, [theme]);

  const [activeTab, setActiveTab] = useState<TabType | '404'>(() => {
    return getTabFromLocation();
  });
  
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = useCallback(() => setIsConsultationOpen(true), []);
  const closeConsultation = useCallback(() => setIsConsultationOpen(false), []);

  const handleSetActiveTab = (tab: TabType) => {
    const targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({ tab }, '', targetPath);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Synchronize path and hash changes (browser back / forward buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const resolvedTab = getTabFromLocation();
      setActiveTab(resolvedTab);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Dynamic SEO Page Title & Meta Description sync based on active Tab
  useEffect(() => {
    let title = 'Bilvo Ai | Enterprise AI Automations & Workflows';
    let description = 'Bilvo Ai builds premium custom enterprise AI systems and seamless automations that eliminate operational bottlenecks, saving thousands of manual work hours.';
    
    switch (activeTab) {
      case 'home':
        title = 'Bilvo Ai | Enterprise AI Automations & Workflows';
        description = 'Bilvo Ai builds premium custom enterprise AI systems and seamless automations that eliminate operational bottlenecks, saving thousands of manual work hours.';
        break;
      case 'how-we-work':
        title = 'How We Work - Our Process | Bilvo Ai';
        description = 'Explore our step-by-step methodology for designing, implementing, and deploying highly accurate, reliable business automation workflows.';
        break;
      case 'live-demos':
        title = 'Live AI Demos & Interactive Systems | Bilvo Ai';
        description = 'Experience live interactive demos of Bilvo Ai systems: AI Receptionist, AI Lead Response, and 24/7 AI Customer Support Assistant.';
        break;
      case 'testimonials':
        title = 'Client Testimonials & FAQs | Bilvo Ai';
        description = 'Read verified reviews and outcomes from business owners who automated standard business processes, and get answers to common questions.';
        break;
      case 'why-bilvo':
        title = 'Why Bilvo Ai - Practical Automation for Growing Businesses | Bilvo Ai';
        description = 'Discover why businesses choose Bilvo Ai to eliminate administrative bottlenecks, respond to customers instantly, and scale without increasing overhead.';
        break;
      case '404':
        title = 'Page Not Found | Bilvo Ai';
        description = 'The requested custom AI automation system or page is not found. Return to our home systems.';
        break;
    }

    document.title = title;
    
    // Dynamically update the meta description tag
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Scroll safety check for tab changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // High-fidelity premium timing and animation settings (550ms duration)
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  // Interactive ambient light tracker
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const targetOpacity = useMotionValue(0);
  const hoverScale = useMotionValue(1);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true until verified in mount

  const cursorX = useSpring(mouseX, { damping: 50, stiffness: 220, mass: 0.8 });
  const cursorY = useSpring(mouseY, { damping: 50, stiffness: 220, mass: 0.8 });
  const cursorOpacity = useSpring(targetOpacity, { damping: 40, stiffness: 120 });

  // Spring physics for custom feedback ring cursor
  const ringScale = useSpring(hoverScale, { damping: 25, stiffness: 180 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scheduleIdle = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 1200));
      scheduleIdle(preloadSecondaryRoutes);
    }
  }, []);

  useEffect(() => {
    // Detect mobile touch pointers to safely disable custom cursors on touchscreen devices
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768 || prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', checkTouch);
      };
    }

    let timeoutId: any;
    let rafId: number | null = null;
    let pendingX = -1000;
    let pendingY = -1000;
    let pendingTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      pendingTarget = e.target as HTMLElement | null;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(pendingX);
          mouseY.set(pendingY);
          targetOpacity.set(0.08); // Max opacity 8% (<10% threshold)

          // Intelligently check if cursor is hovering over an interactive element
          if (pendingTarget) {
            const isInteractive = 
              pendingTarget.tagName === 'BUTTON' ||
              pendingTarget.tagName === 'A' ||
              pendingTarget.closest('button') ||
              pendingTarget.closest('a') ||
              pendingTarget.closest('.cursor-pointer') ||
              pendingTarget.closest('[role="checkbox"]') ||
              pendingTarget.closest('[role="button"]');
            hoverScale.set(isInteractive ? 1.6 : 1.0);
          }
          rafId = null;
        });
      }

      if (timeoutId) clearTimeout(timeoutId);

      // Fade out gradually after 1.2s of inactivity
      timeoutId = setTimeout(() => {
        targetOpacity.set(0);
      }, 1200);
    };

    const handleMouseLeave = () => {
      targetOpacity.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, targetOpacity, prefersReducedMotion]);

  const pageVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  };

  const pageTransition = { 
    duration: 0.16, 
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-gray-100 relative" id="applet-main-layout">
      {/* Premium Fine Noise Overlay */}
      <div className="noise-overlay" />

      {/* Interactive smooth mouse-follow ambient light */}
      {!prefersReducedMotion && (
        <motion.div 
          className="mouse-follow-light"
          style={{
            x: cursorX,
            y: cursorY,
            opacity: cursorOpacity,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* Premium custom mouse feedback dot and ring ring */}
      {!prefersReducedMotion && !isTouchDevice && (
        <>
          {/* Central feedback dot - inverted for stunning contrast over text and images */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              opacity: cursorOpacity,
              translateX: '-50%',
              translateY: '-50%',
              scale: hoverScale,
            }}
          />
          {/* Springy feedback outer ring */}
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/20 pointer-events-none z-50 mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              opacity: cursorOpacity,
              translateX: '-50%',
              translateY: '-50%',
              scale: ringScale,
            }}
          />
        </>
      )}

      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-[500px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-purple/5 blur-[160px] pointer-events-none" />

      {/* Header component */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
        onOpenConsultation={openConsultation} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Hub Router */}
      <main className="flex-1 w-full" id="main-content-viewport">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <HomeTab 
                  setActiveTab={handleSetActiveTab} 
                  onOpenConsultation={openConsultation} 
                />
              </motion.div>
            )}

            {activeTab === 'how-we-work' && (
              <motion.div
                key="how-we-work"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <HowWeWorkTab 
                  setActiveTab={handleSetActiveTab} 
                  onOpenConsultation={openConsultation} 
                />
              </motion.div>
            )}

            {activeTab === 'live-demos' && (
              <motion.div
                key="live-demos"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <LiveDemosTab 
                  setActiveTab={handleSetActiveTab} 
                  onOpenConsultation={openConsultation} 
                />
              </motion.div>
            )}

            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <TestimonialsTab 
                  setActiveTab={handleSetActiveTab} 
                  onOpenConsultation={openConsultation} 
                />
              </motion.div>
            )}

            {activeTab === 'why-bilvo' && (
              <motion.div
                key="why-bilvo"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <WhyBilvoTab 
                  setActiveTab={handleSetActiveTab}
                  onOpenConsultation={openConsultation} 
                />
              </motion.div>
            )}

            {activeTab === '404' && (
              <motion.div
                key="404"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="mx-auto max-w-7xl px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center text-left"
                id="notfound-tab-container"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/10 bg-red-500/5 px-3.5 py-1.5 font-sans text-xs font-semibold tracking-wide text-red-400 uppercase">
                  404 - NOT FOUND
                </span>
                <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white leading-none">
                  Lost in the System?
                </h1>
                <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#A7B0C0]">
                  The resource or custom workflow path you are looking for does not exist. Let's get you back to our high-performance enterprise systems.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    onClick={() => {
                      handleSetActiveTab('home');
                    }}
                    whileHover={{ 
                      y: -1.5, 
                      scale: 1.015, 
                      boxShadow: "0 12px 24px -4px rgba(37, 99, 235, 0.3)",
                      backgroundColor: "#1d4ed8"
                    }}
                    whileTap={{ scale: 0.985 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-white shadow-lg cursor-pointer transition-all duration-200"
                  >
                    <span>Return Home</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer component */}
      <Footer 
        setActiveTab={handleSetActiveTab} 
        onOpenConsultation={openConsultation} 
      />

      {/* Consultation Modal */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {isConsultationOpen && (
            <ConsultationModal 
              isOpen={isConsultationOpen} 
              onClose={closeConsultation} 
            />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
