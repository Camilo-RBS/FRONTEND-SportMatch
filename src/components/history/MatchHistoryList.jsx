import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const MatchHistoryList = ({ matches, isCoach, currentUserId, onViewDetails, onUpdateMatch }) => {
    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy', { locale: es });
    };

    const canUpdateMatch = (match) => {
        return isCoach && match.coachId === currentUserId && !match.winner;
    };

    return (
        <div className="space-y-4">
            {matches.map((match) => (
                <div key={match._id} className="bg-gray-800 rounded-lg p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-sm text-gray-400">Fecha del encuentro: {formatDate(match.date)}</p>
                            <p className="text-sm text-gray-400">Tipo de competición: {match.competition}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{match.homeTeam?.name}</span>
                                </div>
                                <span className="text-xl font-bold">
                                    {match.score ? match.score : 'vs'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{match.awayTeam?.name}</span>
                                </div>
                            </div>
                            {match.winner && (
                                <div className="mt-2">
                                    <p className="text-emerald-400">Ganador: {match.winner}</p>
                                </div>
                            )}
                            <p className="text-sm text-gray-400 mt-2">Ubicación: {match.location}</p>
                        </div>
                        <div className="flex gap-2">
                            {canUpdateMatch(match) && (
                                <button
                                    onClick={() => onUpdateMatch(match)}
                                    className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                                >
                                    Actualizar
                                </button>
                            )}
                            <button
                                onClick={() => onViewDetails(match)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                                Detalles
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {matches.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    No hay partidos en el historial
                </div>
            )}
        </div>
    );
};