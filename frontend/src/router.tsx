import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegistrationPage } from "@/pages";

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
    path: "/profile",
    element: <div>profile</div>,
  },
]);

export default router;
