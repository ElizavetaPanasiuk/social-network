import { createBrowserRouter } from 'react-router-dom';
import {
  ConversationsPage,
  LoginPage,
  MessagesPage,
  NewsPage,
  NotificationsPage,
  PostPage,
  ProfilePage,
  RegistrationPage,
  SearchPage,
  SettingsPage,
  SubscribersPage,
  SubscriptionsPage,
} from '@/modules';
import { Layout } from '@/components';

const router = createBrowserRouter([
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/profile/:profileId',
        element: <ProfilePage />,
      },
      {
        path: '/news',
        element: <NewsPage />,
      },
      {
        path: '/notifications',
        element: <NotificationsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/subscribers/:profileId',
        element: <SubscribersPage />,
      },
      {
        path: '/subscriptions/:profileId',
        element: <SubscriptionsPage />,
      },
      {
        path: '/post/:id',
        element: <PostPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/messages',
        element: <ConversationsPage />,
      },
      {
        path: '/messages/:rommId',
        element: <MessagesPage />,
      },
    ],
  },
]);

export default router;
