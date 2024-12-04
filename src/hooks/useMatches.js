import { useState, useCallback } from 'react';
import { matchService } from '../services/matchService';

export const useMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMatches = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await matchService.getMatches(filters);
            setMatches(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al cargar los partidos';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const createMatch = async (matchData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await matchService.createMatch(matchData);
            setMatches(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear el partido';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateMatch = async (matchId, matchData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await matchService.updateMatch(matchId, matchData);
            setMatches(prev => prev.map(match =>
                match._id === matchId ? response.data : match
            ));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar el partido';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getMatchHistory = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await matchService.getMatchHistory(filters);
            setMatches(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al cargar el historial';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        matches,
        loading,
        error,
        fetchMatches,
        createMatch,
        updateMatch,
        getMatchHistory
    };
};