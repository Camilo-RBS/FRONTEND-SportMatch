import api from "../lib/api";

export const chatService = {
  getMessages: (userId) => api.get(`/api/chat${userId ? `/${userId}` : ""}`),

  sendMessage: (messageData) => api.post("/api/chat", messageData),

  searchUsers: (query) => api.get(`/api/users/search?search=${query}`),
};
