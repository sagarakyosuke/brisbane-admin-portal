import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from '@/features/App';
import { SidebarProvider } from '@/contexts/SidebarContext';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
);
