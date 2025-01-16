import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router/router';
import { ErrorBoundary, ThemeProvider } from './components';

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
