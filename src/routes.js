import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CalendarView from 'src/views/calendar';
import FilesView from 'src/views/files';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'profile', element: <AccountView /> },
      { path: 'home', element: <DashboardView /> },
      { path: 'calendar', element: <CalendarView /> },
      { path: 'files', element: <FilesView /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
