import { FC, ReactNode, useContext } from 'react';
import { Variants } from 'framer-motion';
import { AnimationContext, AnimationContextType } from './useContext';

// ==========================================
// 1. ANIMATION DEFINITIONS
// ==========================================

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const hoverScale = { scale: 1.02 };

const hoverSlideRight: Variants = {
  rest: { x: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  hover: { x: 6, transition: { duration: 0.2, ease: 'easeIn' } }
};

// ==========================================
// 2. PROVIDER COMPONENT
// ==========================================

export const AnimationProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const value: AnimationContextType = {
    fadeIn,
    fadeUp,
    slideInLeft,
    staggerContainer,
    hoverScale,
    hoverSlideRight
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

// ==========================================
// 3. CUSTOM HOOK
// ==========================================

export const useAnimation = () => {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }

  return context;
};
