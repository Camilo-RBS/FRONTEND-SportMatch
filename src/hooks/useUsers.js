import { useState, useCallback } from 'react';
import { userService } from '../services/userService';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchUsers = useCallback(async (query = '') => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.searchUsers(query);
            setUsers(response);
            return response;
        } catch (error) {
            setError(error.message);
            console.error('Error searching users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getAllUsers();
            setUsers(response);
            return response;
        } catch (error) {
            setError(error.message);
            console.error('Error getting all users:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        users,
        loading,
        error,
        searchUsers,
        getAllUsers
    };
};