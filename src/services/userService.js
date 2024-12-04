import api from "../lib/api";
import { ADMIN_EMAIL } from "../lib/constants";

export const userService = {
  searchUsers: async (query = "") => {
    try {
      const response = await api.get(`/api/users/search`, {
        params: { search: query },
      });
      return response.data.filter((user) => user.email !== ADMIN_EMAIL);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error searching users");
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get("/api/users/all");
      return response.data.filter((user) => user.email !== ADMIN_EMAIL);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error getting all users"
      );
    }
  },

  getNearbyUsers: async (longitude, latitude, maxDistance) => {
    try {
      const response = await api.get("/api/users/nearby", {
        params: { longitude, latitude, maxDistance },
      });
      return response.data.filter((user) => user.email !== ADMIN_EMAIL);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error getting nearby users"
      );
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post("/api/users", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error creating user");
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error updating user");
    }
  },

  deleteUser: async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error deleting user");
    }
  },
};
