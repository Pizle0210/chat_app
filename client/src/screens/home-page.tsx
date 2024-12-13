import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] py-14 lg:py-24 px-5 lg:px-10 flex h-screen mx-auto `
      )}
    >
      <h1 className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magni
        molestias exercitationem? Voluptatibus commodi delectus provident
        aliquid eligendi quis voluptates nesciunt enim tempora molestias.
        Aperiam nihil quasi saepe culpa dolore!
      </h1>
      <Button className="bg-apple-blue p-7" size={"lg"}>Love</Button>
    </div>
  );
}
