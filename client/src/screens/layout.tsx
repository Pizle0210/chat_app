import Footer from "@/components/shared/footer";
import Topbar from "@/components/shared/topbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useThemeStore } from "@/store/useThemeStore";

export default function Layout() {
  const { theme } = useThemeStore();
  console.log("current theme:", theme);

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
