import React from 'react';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import router from './router/router';
import ProfilePage from './pages/ProfilePage/ProfilePage';


const App = () => {
  return (
      <ErrorBoundary>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
  )
}

export default App;
