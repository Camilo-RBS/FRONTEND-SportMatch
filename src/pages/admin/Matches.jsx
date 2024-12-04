import { useState, useEffect } from 'react';
import { matchService } from '../../services/matchService';
import { SPORTS, CATEGORIES } from '../../lib/constants';
import { CreateMatchModal } from '../../components/admin/CreateMatchModal';
import { EditMatchModal } from '../../components/admin/EditMatchModal';

export const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sportFilter, setSportFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const response = await matchService.getMatches();
            setMatches(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleDelete = async (matchId) => {
        if (window.confirm('¿Estás seguro de eliminar este partido? Esta acción no se puede deshacer.')) {
            try {
                await matchService.deleteMatch(matchId);
                await fetchMatches();
            } catch (err) {
                console.error('Error deleting match:', err);
                alert('Error al eliminar el partido: ' + err.message);
            }
        }
    };

    const filteredMatches = matches.filter(match => {
        const matchesSearch = match.homeTeam?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.awayTeam?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = !sportFilter || match.sport === sportFilter;
        const matchesCategory = !categoryFilter || match.category === categoryFilter;
        return matchesSearch && matchesSport && matchesCategory;
    });

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Registros de Partidos</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                >
                    Crear Partido
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar partido..."
                    className="flex-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

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

                <select
                    className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {Object.values(CATEGORIES).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-left">Partido</th>
                            <th className="px-6 py-3 text-left">Resultado</th>
                            <th className="px-6 py-3 text-left">Categoría</th>
                            <th className="px-6 py-3 text-left">Deporte</th>
                            <th className="px-6 py-3 text-left">Ubicación</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMatches.map(match => (
                            <tr key={match._id} className="border-t border-gray-700">
                                <td className="px-6 py-4">{match.homeTeam?.name} vs {match.awayTeam?.name}</td>
                                <td className="px-6 py-4">{match.score || 'Pendiente'}</td>
                                <td className="px-6 py-4">{match.category}</td>
                                <td className="px-6 py-4">{match.sport}</td>
                                <td className="px-6 py-4">{match.location}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(match._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMatch(match);
                                                setShowEditModal(true);
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <CreateMatchModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={async (matchData) => {
                        try {
                            await matchService.createMatch(matchData);
                            await fetchMatches();
                            setShowCreateModal(false);
                        } catch (err) {
                            console.error('Error creating match:', err);
                            throw err;
                        }
                    }}
                />
            )}

            {showEditModal && selectedMatch && (
                <EditMatchModal
                    match={selectedMatch}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedMatch(null);
                    }}
                    onSubmit={async (matchId, matchData) => {
                        try {
                            await matchService.updateMatch(matchId, matchData);
                            await fetchMatches();
                            setShowEditModal(false);
                            setSelectedMatch(null);
                        } catch (err) {
                            console.error('Error updating match:', err);
                            throw err;
                        }
                    }}
                />
            )}
        </div>
    );
};