import Footer from "@/components/shared/footer";
import Topbar from "@/components/shared/topbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/store";

export default function Layout() {
  const { theme } = useThemeStore();
  const { onlineUsers } = useAuthStore();
  console.log({onlineUsers});
  return (
    <div
      className={`flex w-full flex-col ${
        theme ? theme : "bg-apple-lightGray"
      } flex-1 justify-between`}
      data-theme={theme}
    >
      <Topbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}
