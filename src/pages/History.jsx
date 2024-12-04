import { useState, useEffect } from 'react';
import { useMatches } from '../hooks/useMatches';
import { useAuthStore } from '../store/authStore';
import { MatchHistoryList } from '../components/history/MatchHistoryList';
import { MatchFilters } from '../components/matches/MatchFilters';
import { MatchDetailsModal } from '../components/history/MatchDetailsModal';
import { UpdateMatchModal } from '../components/history/UpdateMatchModal';
import { format } from 'date-fns';

export const History = () => {
    const [dateFilter, setDateFilter] = useState('');
    const [competitionFilter, setCompetitionFilter] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const { matches, loading, error, getMatchHistory, updateMatch } = useMatches();
    const { user } = useAuthStore();
    const isCoach = user?.role === 'entrenador';

    useEffect(() => {
        getMatchHistory();
    }, [getMatchHistory]);

    const handleFilter = () => {
        const filters = {};

        if (dateFilter) {
            // Format the date to match the backend expected format
            const formattedDate = format(new Date(dateFilter), 'yyyy-MM-dd');
            filters.date = formattedDate;
        }

        if (competitionFilter) {
            filters.competition = competitionFilter;
        }

        getMatchHistory(filters);
    };

    const handleUpdateMatch = async (matchId, matchData) => {
        try {
            await updateMatch(matchId, matchData);
            // Refresh with current filters after update
            handleFilter();
            setShowUpdateModal(false);
            setSelectedMatch(null);
        } catch (error) {
            console.error('Error updating match:', error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Historial de Partidos</h1>

            <MatchFilters
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                competitionFilter={competitionFilter}
                setCompetitionFilter={setCompetitionFilter}
                onFilter={handleFilter}
            />

            {loading ? (
                <div className="text-center text-gray-400 py-8">Cargando historial...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
                <MatchHistoryList
                    matches={matches}
                    isCoach={isCoach}
                    currentUserId={user?._id}
                    onViewDetails={(match) => {
                        setSelectedMatch(match);
                        setShowUpdateModal(false);
                    }}
                    onUpdateMatch={(match) => {
                        setSelectedMatch(match);
                        setShowUpdateModal(true);
                    }}
                />
            )}

            {selectedMatch && !showUpdateModal && (
                <MatchDetailsModal
                    match={selectedMatch}
                    onClose={() => setSelectedMatch(null)}
                />
            )}

            {showUpdateModal && selectedMatch && (
                <UpdateMatchModal
                    match={selectedMatch}
                    onClose={() => {
                        setShowUpdateModal(false);
                        setSelectedMatch(null);
                    }}
                    onUpdate={handleUpdateMatch}
                />
            )}
        </div>
    );
};