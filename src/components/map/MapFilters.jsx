import { UserRole } from '../../lib/constants';
import { Search } from 'lucide-react';

export const MapFilters = ({ selectedRole, onRoleChange, searchTerm, onSearchChange }) => {
    return (
        <div className="flex gap-4 items-center">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="p-2 pl-10 rounded-md bg-gray-800 text-white border border-gray-700"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <select
                className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                value={selectedRole}
                onChange={(e) => onRoleChange(e.target.value)}
            >
                <option value="">Todos los usuarios</option>
                <option value={UserRole.COACH}>Solo entrenadores</option>
                <option value={UserRole.PLAYER}>Solo jugadores</option>
            </select>
        </div>
    );
};