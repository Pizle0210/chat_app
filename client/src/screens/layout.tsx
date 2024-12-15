import Footer from "@/components/shared/footer";
import Topbar from "@/components/shared/topbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <div className="flex w-full bg-apple-lightGray flex-col flex-1 h-screen justify-between">
      <Topbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}
