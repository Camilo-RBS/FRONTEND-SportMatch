import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Home = () => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
                    }}
                />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Bienvenido a SportMatch
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                        Conecta con otros equipos y organiza partidos fácilmente.
                        Descubre cómo es más sencillo encontrar jugadores y planificar encuentros.
                    </p>

                </div>
            </div>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center gap-12">
                        <div className="flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Athlete"
                                className="rounded-lg shadow-xl w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold mb-6 text-navy-900">¿Quiénes Somos?</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                SportMatch es una plataforma creada para conectar deportistas de todas las edades y niveles.
                                Queremos facilitar la organización de partidos y el encuentro de nuevos compañeros y rivales,
                                promoviendo el deporte y el espíritu competitivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Motivate Section */}
            <section className="py-20 bg-navy-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold mb-6 text-white">Motivate</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                El deporte no es solo actividad física, es una forma de vida.
                                Nuestro objetivo es inspirarte a alcanzar tus metas y superar tus límites.
                                En SportMatch, encontrarás la comunidad ideal para entrenar, mejorar y
                                disfrutar del deporte que amas.
                            </p>
                        </div>
                        <div className="flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Motivation"
                                className="rounded-lg shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};