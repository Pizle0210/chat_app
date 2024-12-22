import ChatInput from "./chat/chat-input";
import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./chat/chat-header";
import { useToast } from "@/hooks/use-toast";
import MessageSkeleton from "./message-skeleton";
import { useAuthStore } from "@/store/store";
import { formatMessageTime } from "@/lib/utils";

export default function ChatContainer() {
  const { getMessages, messages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id).catch((error: unknown) => {
        toast({
          title: `Failed to fetch messages: ${String(error)}`,
          variant: "destructive"
        });
      });
    }
  }, [selectedUser, getMessages, toast]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }
  console.log(messages);

  return (
    <div className="flex-1 flex flex-col overflow-auto  p-6 rounded-lg shadow-lg shadow-apple-silver/70">
      <div className="flex flex-col h-full justify-between">
        <ChatHeader />
        {/* Message Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y- 4">
          {messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message._id}
                className={`mb-4 chat ${
                  message.senderId === authUser?._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-7 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser?._id
                          ? authUser?.profilePic || "/avatar.jpg"
                          : selectedUser?.profilePic || "/avatar.jpg"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="chat-header ml-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message?.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded mb-2 object-cover"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
        </div>
        {/* Input Area */}
        <ChatInput />
      </div>
    </div>
  );
}
