import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthSimpleLayout from 'layouts/AuthSimpleLayout';

const AuthWrapper: React.FC = () => (
  <AuthSimpleLayout>
    <Outlet />
  </AuthSimpleLayout>
);

export default AuthWrapper;
