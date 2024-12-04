import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SPORTS, CATEGORIES } from '../../lib/constants';

export const EditMatchModal = ({ match, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        result: '',
        category: '',
        sport: '',
        location: '',
        comments: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (match) {
            setFormData({
                name: match.name || '',
                result: match.result || '',
                category: match.category || '',
                sport: match.sport || '',
                location: match.location || '',
                comments: match.comments || ''
            });
        }
    }, [match]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(match._id, formData);
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
                    Editar Partido
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre del partido"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Resultado"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.result}
                        onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    />

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar Categoría</option>
                        {Object.values(CATEGORIES).map(category => (
                            <option key={category} value={category}>{category}</option>
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
                        placeholder="Ubicación"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Comentarios"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
                    >
                        Actualizar Partido
                    </button>
                </form>
            </div>
        </div>
    );
};