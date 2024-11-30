import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap the App component with MantineProvider */}
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light', // or 'dark' if you prefer
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
