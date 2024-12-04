import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UpdateMatchModal } from './UpdateMatchModal';

export const MatchList = ({ matches, isCoach, currentUserId }) => {
    const [selectedMatch, setSelectedMatch] = useState(null);

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: es });
    };

    const canUpdateMatch = (match) => {
        return isCoach && match.coachId === currentUserId;
    };

    return (
        <div className="space-y-4">
            {matches.map((match) => (
                <div key={match._id} className="bg-gray-800 rounded-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <p className="text-sm text-gray-400">Fecha del encuentro: {formatDate(match.date)}</p>
                            <p className="text-sm text-gray-400">Tipo de competición: {match.competition}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{match.homeTeam.name}</span>
                                </div>
                                <span className="text-xl font-bold">
                                    {match.score ? match.score : 'vs'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{match.awayTeam.name}</span>
                                </div>
                            </div>
                            {match.winner && (
                                <div className="mt-2 space-y-1">
                                    <p>Ganador: {match.winner}</p>
                                </div>
                            )}
                            <p className="text-sm text-gray-400 mt-2">Ubicación: {match.location}</p>
                        </div>
                        {canUpdateMatch(match) && !match.winner && (
                            <button
                                onClick={() => setSelectedMatch(match)}
                                className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600"
                            >
                                Actualizar Resultado
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {matches.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    No hay partidos programados
                </div>
            )}

            {selectedMatch && (
                <UpdateMatchModal
                    match={selectedMatch}
                    onClose={() => setSelectedMatch(null)}
                />
            )}
        </div>
    );
};