import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Activity } from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = user?.role === 'administrador';

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="bg-navy-900 text-white py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-emerald-400" />
                    <span className="text-xl font-bold">SportMatch</span>
                </Link>

                <div className="flex gap-8">
                    {isAdmin ? (
                        <>
                            <Link
                                to="/admin/usuarios"
                                className={`nav-link ${isActive('/admin/usuarios') ? 'active' : ''}`}
                            >
                                Usuarios
                            </Link>
                            <Link
                                to="/admin/equipos"
                                className={`nav-link ${isActive('/admin/equipos') ? 'active' : ''}`}
                            >
                                Equipos
                            </Link>
                            <Link
                                to="/admin/partidos"
                                className={`nav-link ${isActive('/admin/partidos') ? 'active' : ''}`}
                            >
                                Partidos
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/')}
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/equipos"
                                className={`nav-link ${isActive('/equipos') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/equipos')}
                            >
                                Equipos
                            </Link>
                            <Link
                                to="/partidos"
                                className={`nav-link ${isActive('/partidos') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/partidos')}
                            >
                                Partidos
                            </Link>
                            <Link
                                to="/historial"
                                className={`nav-link ${isActive('/historial') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/historial')}
                            >
                                Historial
                            </Link>
                            <Link
                                to="/chat"
                                className={`nav-link ${isActive('/chat') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/chat')}
                            >
                                Chat
                            </Link>
                            <Link
                                to="/mapa"
                                className={`nav-link ${isActive('/mapa') ? 'active' : ''}`}
                                onClick={(e) => !user && handleNavigation(e, '/mapa')}
                            >
                                Mapa
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-300 capitalize">
                                {user.role}
                            </span>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                onClick={() => navigate('/login', { state: { isRegistering: true } })}
                                className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                            >
                                Registrarse
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};