import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

window.addEventListener('load', () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker зарегистрирован:', registration);
      })
      .catch((error) => {
        console.error('Ошибка регистрации Service Worker:', error);
      });
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
