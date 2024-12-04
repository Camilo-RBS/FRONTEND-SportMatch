import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMatches } from '../../hooks/useMatches';
import { useTeams } from '../../hooks/useTeams';

export const ScheduleMatchModal = ({ onClose, onSuccess }) => {
    const { createMatch } = useMatches();
    const { teams, loading: teamsLoading, error: teamsError, fetchTeams } = useTeams();
    const [error, setError] = useState('');
    const [matchData, setMatchData] = useState({
        date: '',
        competition: '',
        homeTeam: '',
        awayTeam: '',
        location: ''
    });

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!matchData.date || !matchData.competition || !matchData.homeTeam || !matchData.awayTeam || !matchData.location) {
                setError('Por favor complete todos los campos');
                return;
            }

            await createMatch(matchData);
            onSuccess();
        } catch (err) {
            setError(err.message || 'Error al programar el partido');
        }
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
                    Programar Nuevo Partido
                </h2>

                {(error || teamsError) && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
                        {error || teamsError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="datetime-local"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={matchData.date}
                        onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
                        required
                    />

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={matchData.competition}
                        onChange={(e) => setMatchData({ ...matchData, competition: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar competición</option>
                        <option value="liga">Liga</option>
                        <option value="copa">Copa</option>
                        <option value="champions">Champions League</option>
                    </select>

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={matchData.homeTeam}
                        onChange={(e) => setMatchData({ ...matchData, homeTeam: e.target.value })}
                        required
                        disabled={teamsLoading}
                    >
                        <option value="">
                            {teamsLoading ? 'Cargando equipos...' : 'Seleccionar equipo local'}
                        </option>
                        {teams.map(team => (
                            <option key={team._id} value={team._id}>
                                {team.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={matchData.awayTeam}
                        onChange={(e) => setMatchData({ ...matchData, awayTeam: e.target.value })}
                        required
                        disabled={teamsLoading}
                    >
                        <option value="">
                            {teamsLoading ? 'Cargando equipos...' : 'Seleccionar equipo visitante'}
                        </option>
                        {teams
                            .filter(team => team._id !== matchData.homeTeam)
                            .map(team => (
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Ubicación"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
                        value={matchData.location}
                        onChange={(e) => setMatchData({ ...matchData, location: e.target.value })}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
                        disabled={teamsLoading}
                    >
                        {teamsLoading ? 'Cargando...' : 'Programar Partido'}
                    </button>
                </form>
            </div>
        </div>
    );
};