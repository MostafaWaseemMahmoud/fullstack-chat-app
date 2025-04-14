import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
export const useChatStore = create((set,get) => (
  {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
      set({ isUsersLoading: true });
      try {
        const res = await axiosInstance.get("/messages/users");
        set({ users: res.data });
      } catch (error) {
        console.log("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages: async (userId) => {
      set({ isMessagesLoading: true });

      try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: res.data });
        console.log("message" , res)
      } catch (error) {
        console.log("Error fetching messages:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    setSelectedUser: (selectedUser) => {
      set({ selectedUser: selectedUser });
    },

    sendMessage:async (messageData)=> {
      const {selectedUser,messages} = get();
      try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
        set({
          messages: [...messages, res.data],
        });
      } catch (error) {
        console.log("Error sending message:", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  }
))