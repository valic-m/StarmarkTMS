// C:\Users\valic\PycharmProjects\StarmarkTMS\frontend\src\routes\authRoutes.tsx

import { RouteObject } from 'react-router-dom';
import SplitSignIn from 'auth/SignIn';
import SplitSignUp from 'auth/SignUp';
import SplitSignOut from 'auth/SignOut';
import SplitForgotPassword from 'auth/ForgotPassword';
import SplitResetPassword from 'auth/ResetPassword';
import SplitLockScreen from 'auth/LockScreen';
import SplitTwoFA from 'auth/TwoFA';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'sign-in',
        element: <SplitSignIn /> // Correct path
      },
      {
        path: 'sign-up',
        element: <SplitSignUp />
      },
      {
        path: 'sign-out',
        element: <SplitSignOut />
      },
      {
        path: 'forgot-password',
        element: <SplitForgotPassword />
      },
      {
        path: 'reset-password',
        element: <SplitResetPassword />
      },
      {
        path: 'lock-screen',
        element: <SplitLockScreen />
      },
      {
        path: '2FA',
        element: <SplitTwoFA />
      }
    ]
  }
];
