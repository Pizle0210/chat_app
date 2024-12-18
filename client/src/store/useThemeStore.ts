import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || " ",
  setTheme: (theme: string) => {
    localStorage.setItem('chat-theme',theme);
    set({theme})
  }
}));
