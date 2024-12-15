import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useAuthStore } from "@/store/store";
export default function Home() {
  // const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  return (
    <div className={cn("w-full h-screen flex flex-col items-center justify-center p-4")}>
      <div className="flex flex-col space-y-6 max-w-lg text-center">
        <h1 className="text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magni
          molestias exercitationem? Voluptatibus commodi delectus provident
          aliquid eligendi quis voluptates nesciunt enim tempora molestias.
          Aperiam nihil quasi saepe culpa dolore!
        </h1>
        <p className="text-gray-600">
          {/* Placeholder text or remove this paragraph if not needed */}
          This is a placeholder text. Please replace it with actual content.
        </p>
      </div>
      <Button className="bg-apple-blue p-4 mt-6" size="lg" variant={"default"}>
        Love
      </Button>
    </div>
  );
}
  

