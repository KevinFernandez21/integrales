import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import foto1 from "../asset/WhatsApp Image 2025-01-18 at 21.40.59_623505f4.jpg";
import foto2 from "../asset/WhatsApp Image 2025-01-18 at 21.40.59_a4cfdfdc.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">¿Quiénes somos?</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Somos un grupo de amigos apasionados por compartir momentos inolvidables, disfrutar de buena comida
            y crear recuerdos juntos. Nos une la amistad, las risas y el deseo de encontrar la felicidad en las
            pequeñas cosas de la vida. Cada reunión nuestra es un recordatorio de que la verdadera magia está en
            la compañía que elegimos.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={foto1} alt="Amigos compartiendo comida" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Nuestra pasión por la comida</h2>
              <p className="text-gray-600 mt-2">
                Nada nos une más que un buen plato. Creemos que cada comida compartida es una oportunidad para
                fortalecer lazos y crear momentos únicos.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={foto2} alt="Grupo de amigos felices" className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Nuestra amistad</h2>
              <p className="text-gray-600 mt-2">
                Más que amigos, somos una familia elegida. Cada risa, cada historia compartida, nos hace más
                fuertes y nos recuerda por qué somos inseparables.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}