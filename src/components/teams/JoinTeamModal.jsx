import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const JoinTeamModal = ({ onClose }) => {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        email: user?.email || '',
        position: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the join request
        alert('Solicitud enviada exitosamente');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[500px] relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
                    Unirse al Equipo
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.email}
                        disabled
                    />

                    <input
                        type="text"
                        placeholder="Posición preferida"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />

                    <textarea
                        placeholder="¿Por qué quieres unirte al equipo?"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
                    >
                        Enviar Solicitud
                    </button>
                </form>
            </div>
        </div>
    );
};