import { axiosInstance } from "@/lib/axios";
import {
  signInValidation,
  userValidation,
  type profileUpdateValidation
} from "@/validations/user.validation";
import type { z } from "zod";
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

// Define the shape of the state
type AuthUserType = {
  _id: string;
  profilePic: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: string;
};

type AuthState = {
  authUser: AuthUserType | null;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: z.infer<typeof userValidation>) => Promise<void>;
  signin: (data: z.infer<typeof signInValidation>) => Promise<void>;
  signout: () => Promise<void>;
  updateProfile: (
    data: z.infer<typeof profileUpdateValidation>
  ) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

const BASE_URL =
  import.meta.env.MODE === "development" ? `http://localhost:4009` : "/api";

// Create the store with typed state
export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isUpdatingProfile: false,
  isSigningIn: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // check authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`/auth/check`);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error: unknown) {
      console.log(`error authenticating user`, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // signup
  signup: async (data: z.infer<typeof userValidation>) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : `Error signing up, try again later`;
      throw new Error(errMsg);
    } finally {
      set({ isSigningUp: false });
    }
  },
  // signin
  signin: async (data: z.infer<typeof signInValidation>) => {
    set({ isSigningIn: true });

    try {
      const response = await axiosInstance.post("/auth/signin", data);
      if (response.status === 401) {
        throw new Error(`Invalid Email or Password`);
      }
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : `Error signing in, try again later`;
      throw new Error(errMsg);
    } finally {
      set({ isSigningIn: false });
    }
  },
  signout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : `Error signing in, try again later`;
      throw new Error(errMsg);
    }
  },

  updateProfile: async (data: z.infer<typeof profileUpdateValidation>) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
    } catch (error) {
      throw new Error(`Profile update failed. Please try again, ${error} `);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    try {
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id
        }
      });
      socket.connect();
      set({ socket });
      socket.on(`getOnlineUsers`, (userIds: string[]) => {
        set({ onlineUsers: userIds });
      });
    } catch (error) {
      console.error("Error connecting socket:", error);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      try {
        socket.disconnect();
        set({ socket: null });
      } catch (error) {
        console.error("Error disconnecting socket:", error);
      }
    }
  }
}));
