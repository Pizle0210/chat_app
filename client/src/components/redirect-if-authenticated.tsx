import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/store"; // Adjust the import path as necessary

interface RedirectIfAuthenticatedProps {
  children: JSX.Element;
}

export default function NoRedirectingIfAuthenticated({
  children
}: RedirectIfAuthenticatedProps) {
  const { checkAuth, authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [authUser, checkAuth, navigate]);

  return authUser ? <Navigate to={"/"} /> : children;
}
