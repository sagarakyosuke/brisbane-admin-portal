import { useRoutes } from 'react-router-dom';
import router from '@/features/routes';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import ThemeProviderWrapper from '@/features/utils/theme/ThemeProvider';
import { AnimationProvider } from '@/features/reusables/animation';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProviderWrapper>
      <AnimationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </AnimationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
