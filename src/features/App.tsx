
import { useEffect } from 'react';

import { useRoutes } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';

import router from '@/features/routes';
import ThemeProviderWrapper from '@/features/utils/theme/ThemeProvider';
import { AnimationProvider } from '@/features/reusables/animation';
import { OverlayProvider, useOverlayContext } from '@/features/components/Loader/Overlay';

/* =====================================================================
 * Initial Application Loader
 * ===================================================================== */

const AppContent = () => {
  const content = useRoutes(router);
  const { showOverlay, hideOverlay } = useOverlayContext();

  useEffect(() => {
    showOverlay();

    const timeout = window.setTimeout(() => {
      hideOverlay();
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
      hideOverlay();
    };
  }, [showOverlay, hideOverlay]);

  return content;
};

/* =====================================================================
 * Main App Component
 * ===================================================================== */

function App() {
  return (
    <ThemeProviderWrapper>
      <AnimationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <OverlayProvider>
            <CssBaseline />
            <AppContent />
          </OverlayProvider>
        </LocalizationProvider>
      </AnimationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
