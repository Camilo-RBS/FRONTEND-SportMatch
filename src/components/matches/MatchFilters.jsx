import { Search } from 'lucide-react';

export const MatchFilters = ({
    dateFilter,
    setDateFilter,
    competitionFilter,
    setCompetitionFilter,
    onFilter
}) => {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="date"
                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>
            <select
                className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                value={competitionFilter}
                onChange={(e) => setCompetitionFilter(e.target.value)}
            >
                <option value="">Todas las competiciones</option>
                <option value="liga">Liga</option>
                <option value="copa">Copa</option>
                <option value="champions">Champions</option>
            </select>

            <button
                onClick={onFilter}
                className="bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500"
            >
                Filtrar
            </button>
        </div>
    );
};