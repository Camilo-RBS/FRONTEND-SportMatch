import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMatches } from '../hooks/useMatches';
import { MatchList } from '../components/matches/MatchList';
import { MatchFilters } from '../components/matches/MatchFilters';
import { ScheduleMatchModal } from '../components/matches/ScheduleMatchModal';
import { format } from 'date-fns';

export const Matches = () => {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [competitionFilter, setCompetitionFilter] = useState('');

    const { user } = useAuthStore();
    const { matches, loading, error, fetchMatches, updateMatch } = useMatches();
    const isCoach = user?.role === 'entrenador';

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

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

        fetchMatches(filters);
    };

    const handleScheduleMatch = async () => {
        setShowScheduleModal(true);
    };

    const handleUpdateMatch = async (matchId, matchData) => {
        try {
            await updateMatch(matchId, matchData);
            await fetchMatches();
        } catch (error) {
            console.error('Error updating match:', error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Partidos</h1>
                {isCoach && (
                    <button
                        onClick={handleScheduleMatch}
                        className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
                    >
                        Programar Partido
                    </button>
                )}
            </div>

            <MatchFilters
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                competitionFilter={competitionFilter}
                setCompetitionFilter={setCompetitionFilter}
                onFilter={handleFilter}
            />

            {loading ? (
                <div className="text-center text-gray-400 py-8">Cargando partidos...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
                <MatchList
                    matches={matches}
                    isCoach={isCoach}
                    currentUserId={user?._id}
                    onUpdateMatch={handleUpdateMatch}
                />
            )}

            {showScheduleModal && (
                <ScheduleMatchModal
                    onClose={() => setShowScheduleModal(false)}
                    onSuccess={() => {
                        setShowScheduleModal(false);
                        fetchMatches();
                    }}
                />
            )}
        </div>
    );
};