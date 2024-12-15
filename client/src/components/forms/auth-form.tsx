import { cn } from "@/lib/utils";
import type React from "react";

export default function AuthForm({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(`shadow-lg px-4 shadow-apple-silver bg-white lg:p-20  rounded-xl max-w-6xl mx-auto max-lg:max-w-3xl flex flex-col items-center justify-center`, className)}
    >
      {children}
    </div>
  );
}
