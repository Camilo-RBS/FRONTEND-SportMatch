import { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { ROLES, SPORTS } from '../../lib/constants';
import { CreateUserModal } from '../../components/admin/CreateUserModal';
import { EditUserModal } from '../../components/admin/EditUserModal';

export const Users = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [sportFilter, setSportFilter] = useState('');
    const { users, loading, error, searchUsers } = useUsers();

    useEffect(() => {
        searchUsers('');
    }, [searchUsers]);

    const handleCreate = async (userData) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Error al crear usuario');
            }

            searchUsers('');
            setShowCreateModal(false);
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleUpdate = async (userId, userData) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar usuario');
            }

            searchUsers('');
            setShowEditModal(false);
            setSelectedUser(null);
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar usuario');
                }

                searchUsers('');
            } catch (err) {
                console.error('Error deleting user:', err);
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesSport = !sportFilter || user.sport === sportFilter;
        return matchesSearch && matchesRole && matchesSport;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-8">
                <div className="text-white text-center">Cargando usuarios...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Registros de Usuarios</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                >
                    Crear Usuario
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    className="flex-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">Todos los roles</option>
                    {Object.values(ROLES).filter(role => role !== 'administrador').map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>

                <select
                    className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={sportFilter}
                    onChange={(e) => setSportFilter(e.target.value)}
                >
                    <option value="">Todos los deportes</option>
                    {Object.values(SPORTS).map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                    ))}
                </select>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Rol</th>
                            <th className="px-6 py-3 text-left">Ubicación</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id} className="border-t border-gray-700">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                <td className="px-6 py-4">{user.address}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreate}
                />
            )}

            {showEditModal && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedUser(null);
                    }}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
};