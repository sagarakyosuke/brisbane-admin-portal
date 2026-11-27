
import { createContext, useContext } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface OverlayContextValue {
  open: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

/* =====================================================================
 * Context
 * ===================================================================== */

export const OverlayContext = createContext<OverlayContextValue | null>(null);

/* =====================================================================
 * Hook
 * ===================================================================== */

export const useOverlayContext = (): OverlayContextValue => {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error(
      'useOverlayContext must be used within an OverlayProvider.',
    );
  }

  return context;
};
