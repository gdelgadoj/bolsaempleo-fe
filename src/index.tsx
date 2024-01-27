import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { PrimeReactProvider } from 'primereact/api';
import baseTheme from './themes/InitialTheme';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './client/queryClient';
import { ContextProvider } from './contextApi/AppContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider theme={baseTheme}>
        <PrimeReactProvider>
          <ContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </ContextProvider>
        </PrimeReactProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
