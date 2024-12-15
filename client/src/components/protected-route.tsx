import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
import Loader from "./loader";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return authUser ? children : <Navigate to="/signin" />;
}

