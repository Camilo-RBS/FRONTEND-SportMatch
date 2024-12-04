import { Search } from 'lucide-react';
import { SPORTS, CATEGORIES } from '../../lib/constants';

export const TeamFilters = ({
    searchTerm,
    setSearchTerm,
    sportFilter,
    setSportFilter,
    categoryFilter,
    setCategoryFilter,
    onFilter
}) => {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Buscar por nombre o descripción..."
                    className="w-full p-2 pl-10 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <select
                className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
            >
                <option value="">Todos los deportes</option>
                {Object.values(SPORTS).map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                ))}
            </select>

            <select
                className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {Object.values(CATEGORIES).map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
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