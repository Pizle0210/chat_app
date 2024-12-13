import Footer from "@/components/shared/footer";
import Topbar from "@/components/shared/topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex bg-apple-lightGray flex-col flex-1 h-screen justify-between">
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}
