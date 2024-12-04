import { useState, useEffect } from 'react';
import { teamService } from '../../services/teamService';
import { SPORTS, CATEGORIES } from '../../lib/constants';
import { CreateTeamModal } from '../../components/admin/CreateTeamModal';
import { EditTeamModal } from '../../components/admin/EditTeamModal';

export const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sportFilter, setSportFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchTeams = async () => {
        try {
            setLoading(true);
            const response = await teamService.getTeams();
            setTeams(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleDelete = async (teamId) => {
        if (window.confirm('¿Estás seguro de eliminar este equipo? Esta acción eliminará también todos los partidos relacionados y no se puede deshacer.')) {
            try {
                await teamService.deleteTeam(teamId);
                await fetchTeams();
            } catch (err) {
                console.error('Error deleting team:', err);
                alert('Error al eliminar el equipo: ' + err.message);
            }
        }
    };

    const filteredTeams = teams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = !sportFilter || team.sport === sportFilter;
        const matchesCategory = !categoryFilter || team.category === categoryFilter;
        return matchesSearch && matchesSport && matchesCategory;
    });

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Registros de Equipo</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                >
                    Crear Equipo
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar equipo..."
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
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Director</th>
                            <th className="px-6 py-3 text-left">Deporte</th>
                            <th className="px-6 py-3 text-left">Categoría</th>
                            <th className="px-6 py-3 text-left">Ubicación</th>
                            <th className="px-6 py-3 text-left">Jugadores</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map(team => (
                            <tr key={team._id} className="border-t border-gray-700">
                                <td className="px-6 py-4">{team.name}</td>
                                <td className="px-6 py-4">{team.owner?.name || 'N/A'}</td>
                                <td className="px-6 py-4">{team.sport}</td>
                                <td className="px-6 py-4">{team.category}</td>
                                <td className="px-6 py-4">{team.location}</td>
                                <td className="px-6 py-4">{team.players?.length || 0}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(team._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedTeam(team);
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
                <CreateTeamModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={async (teamData) => {
                        try {
                            await teamService.createTeam(teamData);
                            await fetchTeams();
                            setShowCreateModal(false);
                        } catch (err) {
                            console.error('Error creating team:', err);
                            throw err;
                        }
                    }}
                />
            )}

            {showEditModal && selectedTeam && (
                <EditTeamModal
                    team={selectedTeam}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedTeam(null);
                    }}
                    onSubmit={async (teamId, teamData) => {
                        try {
                            await teamService.updateTeam(teamId, teamData);
                            await fetchTeams();
                            setShowEditModal(false);
                            setSelectedTeam(null);
                        } catch (err) {
                            console.error('Error updating team:', err);
                            throw err;
                        }
                    }}
                />
            )}
        </div>
    );
};