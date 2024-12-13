import { createBrowserRouter } from "react-router-dom";
import Layout from "./screens/layout";
import Home from "./screens/home-page";
import SignUp from "./screens/sign-up";
import Settings from "./screens/settings";
import Profile from "./screens/profile";
import { SignIn } from "./screens/sign-in";

export const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  }
]);
