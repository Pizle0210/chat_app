import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./store";

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

type ChatState = {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  error: string | null;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: {
    text?: string;
    image?: string;
  }) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  listenToMessages: () => void;
  stopListeningToMessages: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  error: null,

  getUsers: async () => {
    set({ isUsersLoading: true, error: null });
    try {
      const res = await axiosInstance.get<User[]>("/messages/users");
      set({ users: res.data });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error fetching users";
      set({ error: errorMessage });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true, error: null });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error fetching messages";
      set({ error: errorMessage });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: { text?: string; image?: string }) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      throw new Error("No user selected to send the message.");
    }

    try {
      const res = await axiosInstance.post<Message>(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error sending message";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // optimize
    socket?.on("newMessage", (newMessage) => {
      const messageToSelectedUser = newMessage.senderId === selectedUser._id
      if (!messageToSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  stopListeningToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  }
}));
