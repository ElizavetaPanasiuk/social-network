import { createBrowserRouter } from 'react-router-dom';

import {
  ConversationsPage,
  LoginPage,
  MessagesPage,
  NewsPage,
  PostPage,
  ProfilePage,
  RegistrationPage,
  SearchPage,
  SettingsPage,
  CommonSettingsPage,
  ProfileSettingsPage,
  PasswordSettingsPage,
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
        path: '/settings',
        element: <SettingsPage />,
        children: [
          {
            path: 'common',
            element: <CommonSettingsPage />,
          },
          {
            path: 'profile',
            element: <ProfileSettingsPage />,
          },
          {
            path: 'password',
            element: <PasswordSettingsPage />,
          },
        ],
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
        path: '/post/:postId',
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
        path: '/messages/:roomId',
        element: <MessagesPage />,
      },
    ],
  },
]);

export default router;
