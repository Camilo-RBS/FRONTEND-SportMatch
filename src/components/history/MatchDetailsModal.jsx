import { X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const MatchDetailsModal = ({ match, onClose }) => {
    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy', { locale: es });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
                    Detalles del Partido
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p className="font-semibold">Fecha del encuentro:</p>
                            <p>{formatDate(match.date)}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Tipo de competición:</p>
                            <p className="capitalize">{match.competition}</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-center flex-1">
                                <p className="font-bold text-lg">{match.homeTeam.name}</p>
                            </div>
                            <div className="text-center px-4">
                                <p className="text-2xl font-bold">
                                    {match.score || 'vs'}
                                </p>
                            </div>
                            <div className="text-center flex-1">
                                <p className="font-bold text-lg">{match.awayTeam.name}</p>
                            </div>
                        </div>

                        {match.winner && (
                            <div className="text-center mb-4">
                                <p className="text-lg">
                                    Ganador: <span className="font-bold text-emerald-600">{match.winner}</span>
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold mb-2">Goleadores {match.homeTeam.name}</h4>
                                <ul className="space-y-1">
                                    {match.homeScorers?.map((scorer, index) => (
                                        <li key={index} className="text-gray-600">{scorer}</li>
                                    ))}
                                    {(!match.homeScorers || match.homeScorers.length === 0) && (
                                        <li className="text-gray-400">Sin goles</li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Goleadores {match.awayTeam.name}</h4>
                                <ul className="space-y-1">
                                    {match.awayScorers?.map((scorer, index) => (
                                        <li key={index} className="text-gray-600">{scorer}</li>
                                    ))}
                                    {(!match.awayScorers || match.awayScorers.length === 0) && (
                                        <li className="text-gray-400">Sin goles</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold">Ubicación:</p>
                        <p className="text-gray-700">{match.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};