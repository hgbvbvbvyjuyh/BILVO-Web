import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TabType } from '../types';
import BilvoLogo from './BilvoLogo';

interface HeaderProps {
  activeTab: TabType | '404';
  setActiveTab: (tab: TabType) => void;
  onOpenConsultation: () => void;
  theme?: 'bilvo' | 'midnight';
  toggleTheme?: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrolled = window.scrollY > 15;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 15;
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: { label: string; tab: TabType }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'How We Work', tab: 'how-we-work' },
    { label: 'Live Demos', tab: 'live-demos' },
    { label: 'Testimonials', tab: 'testimonials' },
    { label: 'Why Bilvo Ai', tab: 'why-bilvo' },
  ];

  const handleLogoClick = () => {
    setActiveTab('home');
    setMobileMenuOpen(false);
  };

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'theme-navbar-scrolled backdrop-blur-xl' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'h-14' : 'h-18'
      }`}>
        {/* Logo */}
        <div 
          onClick={handleLogoClick} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogoClick();
            }
          }}
          role="button"
          tabIndex={0}
          className="flex cursor-pointer items-center gap-3 transition-colors group/logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50 rounded-xl p-1"
          id="brand-logo-container"
        >
          <BilvoLogo size="md" showText={true} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1.5 md:flex" id="desktop-navigation">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.label}
                id={`nav-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setActiveTab(item.tab);
                }}
                className={`relative group px-3.5 py-2 font-sans text-xs sm:text-sm tracking-wide transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 ${
                  isActive 
                    ? 'text-[#2563EB] font-semibold' 
                    : 'text-theme-secondary hover:text-theme-primary font-medium'
                }`}
              >
                <span className="relative z-10 py-0.5 inline-block">
                  {item.label}
                  {/* Subtle underline hover effect for inactive items */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#2563EB]/40 scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
                  )}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="headerActiveIndicator"
                    className="absolute bottom-0 inset-x-2.5 h-[2px] bg-[#2563EB] rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-4 md:flex" id="header-cta-desktop">
          <button
            onClick={onOpenConsultation}
            id="btn-book-consultation"
            className="group btn-enterprise-primary"
          >
            <span>Schedule an AI Strategy Session</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white md:hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          id="btn-mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full theme-mobile-dropdown backdrop-blur-xl px-6 py-6 md:hidden shadow-2xl" 
            id="mobile-navigation-dropdown"
          >
            <div className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full rounded-lg px-4 py-2.5 font-sans text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                      isActive 
                        ? 'bg-[#2563EB]/10 text-[#2563EB]' 
                        : 'text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <hr className="my-2 border-theme" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="group btn-enterprise-primary w-full"
                id="btn-mobile-menu-consultation"
              >
                <span>Schedule an AI Strategy Session</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
