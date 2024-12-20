import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

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
  setSelectedUser: (user: User | null) => void;
};

export const useChatStore = create<ChatState>((set) => ({
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
        error instanceof Error ? error.message : `Error fetching users`;
      throw new Error(errorMessage);
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
        error instanceof Error ? error.message : `Error fetching user messages`;
      throw new Error(errorMessage);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  }
}));
