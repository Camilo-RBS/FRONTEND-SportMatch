import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ROLES, SPORTS } from '../../lib/constants';

export const EditUserModal = ({ user, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        sport: '',
        address: '',
        description: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || '',
                sport: user.sport || '',
                address: user.address || '',
                description: user.description || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(user._id, formData);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[500px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
                    Editar Usuario
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled
                    />

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar Rol</option>
                        {Object.values(ROLES).filter(role => role !== 'administrador').map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.sport}
                        onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar Deporte</option>
                        {Object.values(SPORTS).map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Dirección"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Descripción"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
                    >
                        Actualizar Usuario
                    </button>
                </form>
            </div>
        </div>
    );
};