import { createBrowserRouter } from "react-router-dom";
import Layout from "./screens/layout";
import Home from "./screens/home-page";
import SignUp from "./screens/sign-up";
import Settings from "./screens/settings";
import Profile from "./screens/profile";
import { SignIn } from "./screens/sign-in";
import ProtectedRoute from "./components/protected-route";
import NoRedirectingIfAuthenticated from "./components/redirect-if-authenticated";

export const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/signin",
        element: (
          <NoRedirectingIfAuthenticated>
            <SignIn />
          </NoRedirectingIfAuthenticated>
        )
      },
      {
        path: "/signup",
        element: (
          <NoRedirectingIfAuthenticated>
            <SignUp />
          </NoRedirectingIfAuthenticated>
        )
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
]);
