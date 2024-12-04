import api from "../lib/api";

export const teamService = {
  getTeams: () => api.get("/api/teams"),

  filterTeams: (filters) => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);
    if (filters.sport) params.append("sport", filters.sport);
    if (filters.category) params.append("category", filters.category);
    return api.get(`/api/teams/filter?${params.toString()}`);
  },

  createTeam: (teamData) => api.post("/api/teams", teamData),

  updateTeam: (teamId, teamData) => api.put(`/api/teams/${teamId}`, teamData),

  deleteTeam: async (teamId) => {
    try {
      await api.delete(`/api/teams/${teamId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error deleting team");
    }
  },

  joinTeam: (teamId) => api.post(`/api/teams/${teamId}/join`),
};
