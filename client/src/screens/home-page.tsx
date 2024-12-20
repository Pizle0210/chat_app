import ChatContainer from "@/components/chat-container";
import NoChatSelected from "@/components/noChatSelected";
import Sidebar from "@/components/shared/sidebar";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
export default function Home() {
  const { selectedUser } = useChatStore();

  return (
    <div className={cn("w-full h-screen items-center p-4")}>
      <div className="flex items-center justify-center pt-20 px-5">
        <div className="rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
