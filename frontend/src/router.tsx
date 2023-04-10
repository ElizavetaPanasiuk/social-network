import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, RegistrationPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
