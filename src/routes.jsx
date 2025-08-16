import App from './App.jsx';
import Home from './Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import ForgotPasswordPage from './components/ForgotPasswordPage.jsx';
import ResetPasswordPage from './components/ResetPasswordPage.jsx';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      // Corrected: Point /forgot-password to ForgotPasswordPage
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      // Corrected: Point /reset-password to ResetPasswordPage
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
]);
