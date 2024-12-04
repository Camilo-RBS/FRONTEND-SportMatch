import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTeams } from '../hooks/useTeams';
import { TeamTable } from '../components/teams/TeamTable';
import { TeamFilters } from '../components/teams/TeamFilters';
import { CreateTeamModal } from '../components/teams/CreateTeamModal';
import { JoinTeamModal } from '../components/teams/JoinTeamModal';

export const Teams = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sportFilter, setSportFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const { user } = useAuthStore();
    const { teams, loading, error, fetchTeams, filterTeams, joinTeam } = useTeams();
    const isCoach = user?.role === 'entrenador';

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const handleFilter = () => {
        filterTeams({
            searchTerm,
            sport: sportFilter,
            category: categoryFilter
        });
    };

    const handleJoinTeam = async (teamId) => {
        try {
            await joinTeam(teamId);
            setShowJoinModal(false);
            await fetchTeams();
        } catch (err) {
            console.error('Error joining team:', err);
        }
    };

    if (loading && teams.length === 0) {
        return (
            <div className="container mx-auto px-6 py-8">
                <div className="text-white text-center">Cargando equipos...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Equipos Registrados</h1>
                {isCoach && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                    >
                        Crear Equipo
                    </button>
                )}
            </div>

            <TeamFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sportFilter={sportFilter}
                setSportFilter={setSportFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onFilter={handleFilter}
            />

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            <TeamTable
                teams={teams}
                loading={loading}
                onJoinClick={(teamId) => {
                    setSelectedTeamId(teamId);
                    setShowJoinModal(true);
                }}
            />

            {showCreateModal && (
                <CreateTeamModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={async () => {
                        setShowCreateModal(false);
                        await fetchTeams();
                    }}
                />
            )}

            {showJoinModal && (
                <JoinTeamModal
                    teamId={selectedTeamId}
                    onClose={() => setShowJoinModal(false)}
                    onJoin={handleJoinTeam}
                />
            )}
        </div>
    );
};