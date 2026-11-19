import { createContext } from 'react';
import { Variants } from 'framer-motion';

export interface AnimationContextType {
  fadeIn: Variants;
  fadeUp: Variants;
  slideInLeft: Variants;
  staggerContainer: Variants;
  hoverScale: { scale: number };
  hoverSlideRight: Variants;
}

export const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);
