import React from 'react';
import { createBrowserRouter } from 'react-router';

import ErrorPage from '../pages/ErrorPage/ErrorPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import WorkersPage from '../pages/WorkersPage/WorkersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProfilePage />,
    errorElement: <ErrorPage message='Внутренняя Ошибка!'/>,
  },
  {
    path:'/web-workers',
    element: <WorkersPage />
  }
])

export default router;
