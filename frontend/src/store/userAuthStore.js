import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
export const useAuthStore = create((set,get)=> (
  {
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers: [],


    checkAuth: async() => {
      try {
        const res = await axiosInstance.get("/auth/check");

        set({authUser:res.

          data});
      } catch (error) {
        console.log("Error checking auth:", error);

        set({authUser:null});
      }finally {
        set({isCheckingAuth:false});
      }
    },

    signup: async (data)=> {
      set({isSigningUp: true});
      console.log("Data" , data);
      try {
        console.log("Data" , data);
        const res = await  axiosInstance.post("/auth/signup" , data);
        toast.success("Account created successfully!");
        set({authUser: res.data});
      } catch (error) {
        console.log("Error signing up:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } finally {
        set({isSigningUp: false});
      }
    },

    logout: async()=> {
      try {
        const res = await axiosInstance.post("/auth/logout");
        set({authUser: null});
        toast.success("Logged out successfully!");
      } catch (error) {
        console.log("Error logging out:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },

    login: async(data)=> {
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({authUser: res.data});
        toast.success("Login successfully!");
      } catch (error) {
        console.log("Error logging out:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },

    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        const { authUser } = get();

        set({
          authUser: {
            ...authUser,
            profilePic: data.profilePic,
            updatedAt: new Date().toISOString(),
          },
        });

        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("error in update profile:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        set({ isUpdatingProfile: false });
      }
    },
  }
))