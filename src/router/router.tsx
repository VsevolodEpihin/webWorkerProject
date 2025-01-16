import React from 'react';
import { createBrowserRouter } from 'react-router';

import { ErrorPage, WorkersPage, ProfilePage } from '../pages'

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
