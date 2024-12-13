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
      className={cn(` h-screen flex flex-col items-center justify-center`, className)}
    >
      {children}
    </div>
  );
}
