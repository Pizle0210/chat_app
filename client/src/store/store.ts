import { axiosInstance } from "@/lib/axios";
import {
  signInValidation,
  userValidation
} from "@/validations/user.validation";
import type { z } from "zod";
import { create } from "zustand";
// Define the shape of the state

interface AuthState {
  authUser: null;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: z.infer<typeof userValidation>) => Promise<void>;
  signin: (data: z.infer<typeof signInValidation>) => Promise<void>;
  signout: () => Promise<void>;
}

// Create the store with typed state
export const useAuthStore = create<AuthState>((set) => ({
  
  authUser: null,
  isSigningUp: false,
  isUpdatingProfile: false,
  isSigningIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    
    try {
      const res = await axiosInstance.get(`/auth/check`);
      set({ authUser: res.data });
    } catch (error: unknown) {
      console.log(`error authenticating user`, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: z.infer<typeof userValidation>) => {
    
    set({ isSigningUp: true });


    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
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
  signin: async (data: z.infer<typeof signInValidation>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isSigningIn: true });


    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.post("/auth/signin", data);
      if (response.status===401) {
        throw new Error(`Invalid Email or Password`)
      }
      set({ authUser: response.data });

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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : `Error signing in, try again later`;
      throw new Error(errMsg);
    }
  }
}));
