import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkauth response", res.data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("❌ Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
      return res.data; // Return success data
    } catch (error) {
      console.error("Error signing up:", error);
      console.error("Error response:", error.response);
      
      let errorMessage = "Error signing up";
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "Cannot connect to server. Please check if the backend is running.";
      } else {
        // Something else happened
        errorMessage = error.message || "An unexpected error occurred";
      }
      
      toast.error(errorMessage);
      throw error; // Throw error so navigation doesn't happen
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
      return res.data; // Return success data
    } catch (error) {
      console.error("Error logging in:", error);
      console.error("Error response:", error.response);
      
      let errorMessage = "Error logging in";
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "Cannot connect to server. Please check if the backend is running.";
      } else {
        // Something else happened
        errorMessage = error.message || "An unexpected error occurred";
      }
      
      toast.error(errorMessage);
      throw error; // Throw error so navigation doesn't happen
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },

  demoLogin: async () => {
    set({ isLoggingIn: true });
    try {
      // Use demo credentials to login
      const demoCredentials = {
        email: "demo@leetnest.com",
        password: "demo123",
      };

      const res = await axiosInstance.post("/auth/login", demoCredentials);

      set({ authUser: res.data.user });

      toast.success("Demo login successful");
    } catch (error) {
      console.log("Error with demo login", error);
      // If demo user doesn't exist, show a message
      toast.error("Demo account not available. Please sign up to create an account.");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
