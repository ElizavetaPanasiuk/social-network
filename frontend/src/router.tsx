import { createBrowserRouter } from "react-router-dom";
import {
  ExplorePage,
  LoginPage,
  MessagesPage,
  NotificationsPage,
  ProfilePage,
  RegistrationPage,
  SettingsPage,
  SubscribersPage,
  SubscriptionsPage,
} from "@/pages";
import { Layout } from "./components";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/profile/:profileId",
        element: <ProfilePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/messages",
        element: <MessagesPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/subscribers/:profileId",
        element: <SubscribersPage />,
      },
      {
        path: "/subscriptions/:profileId",
        element: <SubscriptionsPage />,
      },
    ],
  },
]);

export default router;
