import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const { user, login, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const success = login(email, password);
        if (success) {
            navigate('/');
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return {
        user,
        isAuthenticated: !!user,
        isCoach: user?.role === 'entrenador',
        login: handleLogin,
        logout: handleLogout,
    };
};