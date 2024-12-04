import { useState, useCallback } from 'react';
import { teamService } from '../services/teamService';

export const useTeams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeams = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamService.getTeams();
            setTeams(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al cargar los equipos';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const filterTeams = useCallback(async (filters) => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamService.filterTeams(filters);
            setTeams(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al filtrar equipos';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTeam = async (teamData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamService.createTeam(teamData);
            setTeams(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear el equipo';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const joinTeam = async (teamId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamService.joinTeam(teamId);
            setTeams(prev => prev.map(team =>
                team._id === teamId ? response.data : team
            ));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al unirse al equipo';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        teams,
        loading,
        error,
        fetchTeams,
        filterTeams,
        createTeam,
        joinTeam
    };
};