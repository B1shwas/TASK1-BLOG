import { create } from "zustand";
import { authApi } from "@/lib/auth.api";
import { User } from "@/types/blog.types";

interface AuthState {
  user: User | null;
  isLoggedIn: () => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,
  isLoggedIn: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await authApi.getCurrentUser();
        set({ user: response.data, isAdmin: response.data.role === "admin" });
        return true;
      } catch (error) {
        localStorage.removeItem("token");
        set({ user: null, isAdmin: false });
        return false;
      }
    }
    return false;
  },
  login: async (username: string, password: string) => {
    try {
      const response = await authApi.login({ username, password });
      localStorage.setItem("token", response.data.token);
      set({
        user: response.data.user,
        isAdmin: response.data.user.role === "admin",
      });
      return true;
    } catch (error) {
      set({ user: null, isAdmin: false });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAdmin: false });
  },
}));

export default useAuthStore;
