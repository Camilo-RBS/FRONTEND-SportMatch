import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { X } from 'lucide-react';

export const AuthModal = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(!location.state?.isRegistering);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        age: '',
        address: '',
        role: '',
        latitude: '',
        longitude: ''
    });
    const [error, setError] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    const navigate = useNavigate();
    const { login, register } = useAuthStore();

    const handleAddressChange = async (e) => {
        const address = e.target.value;
        setFormData(prev => ({ ...prev, address }));

        if (address.length > 3) {
            setIsLoadingAddress(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
                );
                const data = await response.json();
                setAddressSuggestions(data);
            } catch (err) {
                console.error('Error fetching address suggestions:', err);
            }
            setIsLoadingAddress(false);
        } else {
            setAddressSuggestions([]);
        }
    };

    const handleSelectAddress = (suggestion) => {
        setFormData(prev => ({
            ...prev,
            address: suggestion.display_name,
            latitude: suggestion.lat,
            longitude: suggestion.lon
        }));
        setAddressSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let success;

            if (isLogin) {
                success = await login(formData.email, formData.password);
            } else {
                const requiredFields = ['email', 'password', 'name', 'role', 'address', 'latitude', 'longitude'];
                const missingFields = requiredFields.filter(field => !formData[field]);

                if (missingFields.length > 0) {
                    setError('Por favor completa todos los campos requeridos');
                    return;
                }

                success = await register(formData);
            }

            if (success) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || (isLogin ? 'Error al iniciar sesión' : 'Error en el registro'));
        }
    };

    const inputClasses = "w-full p-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[400px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => navigate('/')}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Nombre *"
                                className={inputClasses}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Apellido"
                                className={inputClasses}
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />

                            <input
                                type="number"
                                placeholder="Edad"
                                className={inputClasses}
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            />

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Dirección *"
                                    className={inputClasses}
                                    value={formData.address}
                                    onChange={handleAddressChange}
                                />
                                {isLoadingAddress && (
                                    <div className="absolute right-3 top-3 text-gray-400">
                                        Buscando...
                                    </div>
                                )}
                                {addressSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                        {addressSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                                                onClick={() => handleSelectAddress(suggestion)}
                                            >
                                                {suggestion.display_name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <select
                                className={inputClasses}
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            >
                                <option value="">Elige tu Rol *</option>
                                <option value="entrenador">Entrenador</option>
                                <option value="jugador">Jugador</option>
                            </select>

                            <div className="text-sm text-gray-500">
                                * Campos requeridos
                            </div>
                        </>
                    )}

                    <input
                        type="email"
                        placeholder="Correo *"
                        className={inputClasses}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Contraseña *"
                        className={inputClasses}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
                    >
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-emerald-600 hover:text-emerald-700"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};