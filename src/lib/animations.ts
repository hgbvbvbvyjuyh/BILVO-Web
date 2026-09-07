import { Variants } from 'motion/react';

// Premium Linear/Apple-style cubic-bezier curve: deceleration with high initial inertia
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as any;

// Staggered child animator container
export const staggerContainerVariants = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    }
  }
});

// 1. Badge Reveal Variant (GPU-accelerated opacity + slight upward shift)
export const badgeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12, 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.4,
      ease: EASE_PREMIUM
    }
  }
};

// 2. Heading Reveal Variant (GPU-accelerated opacity + upward shift for hierarchy)
export const headingVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 18, 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.5,
      ease: EASE_PREMIUM
    }
  }
};

// 3. Description Reveal Variant (GPU-accelerated opacity + upward shift)
export const descriptionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 14, 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.45,
      ease: EASE_PREMIUM
    }
  }
};

// 4. Button/CTA Reveal Variant
export const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12, 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.4,
      ease: EASE_PREMIUM
    }
  }
};

// 5. Card Reveal Variant (independently animated, scale 0.985 -> 1, translate Y 18px)
export const cardRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 18, 
    scale: 0.985,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.45,
      ease: EASE_PREMIUM
    }
  }
};

// 6. Image/Media Reveal Variant
export const imageRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.985,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_PREMIUM
    }
  }
};

// Quick helper to adapt variants if user prefers reduced motion (safeguards 60fps and accessibility)
export const getAccessibleVariants = (variants: Variants, prefersReducedMotion: boolean): Variants => {
  if (!prefersReducedMotion) return variants;
  
  const accessible: Variants = {};
  for (const key in variants) {
    if (Object.prototype.hasOwnProperty.call(variants, key)) {
      accessible[key] = {
        opacity: key === 'visible' ? 1 : 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.01 }
      };
    }
  }
  return accessible;
};
