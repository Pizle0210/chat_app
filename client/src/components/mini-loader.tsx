import { cn } from "@/lib/utils";

export default function MiniLoader({ className }: { className?: string }) {
  return (
    <div className="items-center flex justify-center h-screen">
      <div
        className={cn(
          "h-5 w-5 border-t-2 border-b-2 rounded-full animate-spin",
          className
        )}
      ></div>
    </div>
  );
}
