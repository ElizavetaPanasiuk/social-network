import { createBrowserRouter } from "react-router-dom";
import {
  FriendsPage,
  LoginPage,
  MessengerPage,
  ProfilePage,
  RegistrationPage,
  SearchPage,
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
        path: "/friends",
        element: <FriendsPage />,
      },
      {
        path: "/messenger",
        element: <MessengerPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
