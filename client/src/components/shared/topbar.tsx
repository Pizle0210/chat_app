import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { LuMessageSquare, LuUser } from "react-icons/lu";
import { LucideLogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";

export default function Topbar() {
  const { authUser, signout } = useAuthStore();
  return (
    <header className="mx-auto px-10 flex w-full bg-apple-lightGray fixed top-0 z-40 backdrop-blur-lg border-b">
      <div className="container h-14 mx-auto">
        <div className="flex items-center justify-between h-full">
          {/* left */}
          <div className="flex items-center gap-8 text-white">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg justify-center flex items-center">
                <LuMessageSquare size={44} className="text-apple-black/50" />
              </div>
              <div className=" ">
                <span className="text-apple-blue antialiased text-lg">
                  chat
                </span>
                <span className="font-extrabold text-apple-black/50 text-xl">
                  App
                </span>
              </div>
            </Link>
          </div>
          {/* right */}
          <div className="flex gap-3 items-center justify-center">
            <Link
              to="/settings"
              className={cn(
                ` flex items-center hover:border hover:border-spacing-4 border-apple-gray/50 hover:p-2 hover:rounded-xl transition-all duration-100 ease-in-out`
              )}
            >
              <Settings size={22} />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Link>

            {authUser && (
              <div className="flex items-center gap-7">
                <Link
                  to="/profile"
                  className={cn(
                    ` flex items-center hover:border hover:border-spacing-4 border-apple-gray/50 hover:p-2 hover:rounded-xl transition-all duration-100 ease-in-out`
                  )}
                >
                  <LuUser size={22} />
                  <span className="hidden sm:inline text-sm">Profile</span>
                </Link>
                <Button
                  className="shadow-lg shadow-apple-silver/50 hover:scale-90 transform transition-all duration-150 ease-in-out"
                  onClick={signout}
                >
                  <LucideLogOut size={22} />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
