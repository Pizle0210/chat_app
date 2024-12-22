import { useAuthStore } from "@/store/store";
import { useChatStore } from "@/store/useChatStore";
import { MdCancel } from "react-icons/md";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) {
    return (
      <div className="p-2.5 border-b border-base-300 text-center text-sm text-zinc-500">
        No user selected
      </div>
    );
  }


 


  return (
    <div className="p-3.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* User Details */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.jpg"}
                alt={selectedUser.fullName}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="text-2xl"
          onClick={() => setSelectedUser(null)}
          aria-label="Close Chat"
        >
          <MdCancel />
        </button>
      </div>
    </div>
  );
}
