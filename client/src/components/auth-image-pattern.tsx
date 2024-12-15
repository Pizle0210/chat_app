import { cn } from "@/lib/utils";

export default function AuthImagepattern({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 bg-apple-blue  rounded-3xl">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={cn(
                `aspect-square rounded-2xl bg-apple-lightGray ${
                  i % 2 === 0 && "animate-pulse"
                }`
              )}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-apple-lightGray">{title}</h2>
        <h2 className=" text-apple-lightGray text-sm">{subtitle}</h2>
      </div>
    </div>
  );
}
