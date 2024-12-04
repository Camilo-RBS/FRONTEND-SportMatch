import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { userService } from '../services/userService';
import { UserMarker } from '../components/map/UserMarker';
import { MapFilters } from '../components/map/MapFilters';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [center, setCenter] = useState([0, 0]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                setUsers(response);
                setFilteredUsers(response);

                // Encontrar el usuario actual y centrar el mapa en su ubicación
                const currentUser = response.find(u => u._id === user._id);
                if (currentUser && currentUser.location) {
                    setCenter([
                        currentUser.location.coordinates[1],
                        currentUser.location.coordinates[0]
                    ]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Error al cargar los usuarios');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user._id]);

    useEffect(() => {
        let filtered = users;

        // Filtrar por rol si está seleccionado
        if (selectedRole) {
            filtered = filtered.filter(user => user.role === selectedRole);
        }

        // Filtrar por término de búsqueda si existe
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchLower) ||
                user.lastName?.toLowerCase().includes(searchLower)
            );
        }

        setFilteredUsers(filtered);
    }, [selectedRole, searchTerm, users]);

    const handleChatWithUser = (userId) => {
        navigate('/chat', { state: { selectedUserId: userId } });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-8">
                <div className="text-white text-center">Cargando mapa...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-6 py-8">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Búsqueda de rival</h1>
                <MapFilters
                    selectedRole={selectedRole}
                    onRoleChange={setSelectedRole}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>

            <div className="h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {filteredUsers.map((mapUser) => (
                        <UserMarker
                            key={mapUser._id}
                            user={mapUser}
                            currentUserId={user._id}
                            onChatClick={handleChatWithUser}
                        />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};