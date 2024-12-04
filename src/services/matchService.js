import api from "../lib/api";

export const matchService = {
  getMatches: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.date) params.append("date", filters.date);
    if (filters.competition) params.append("competition", filters.competition);
    return api.get(`/api/matches?${params.toString()}`);
  },

  createMatch: (matchData) => api.post("/api/matches", matchData),

  updateMatch: (matchId, matchData) =>
    api.put(`/api/matches/${matchId}`, matchData),

  deleteMatch: async (matchId) => {
    try {
      await api.delete(`/api/matches/${matchId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error deleting match");
    }
  },

  getMatchHistory: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.date) params.append("date", filters.date);
    if (filters.competition) params.append("competition", filters.competition);
    return api.get(`/api/matches/history?${params.toString()}`);
  },
};
