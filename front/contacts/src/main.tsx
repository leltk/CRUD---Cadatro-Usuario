import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider>
           <App />
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
