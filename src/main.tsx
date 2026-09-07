// Safeguard for "Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter"
// in some iframe or polyfilled environments.
if (typeof window !== 'undefined') {
  try {
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!desc || !desc.set) {
      const rawFetch = window.fetch;
      let currentFetch = typeof rawFetch === 'function' ? rawFetch.bind(window) : rawFetch;
      const fetchDesc = {
        get() {
          return currentFetch;
        },
        set(val: any) {
          currentFetch = val;
        },
        configurable: true,
        enumerable: true,
      };
      try {
        Object.defineProperty(window, 'fetch', fetchDesc);
      } catch (e1) {}
      if (typeof Window !== 'undefined' && Window.prototype) {
        try {
          Object.defineProperty(Window.prototype, 'fetch', fetchDesc);
        } catch (e2) {}
      }
    }
  } catch (e) {
    console.warn('Failed to define fetch property wrapper:', e);
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
