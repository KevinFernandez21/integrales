import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IntegralGraph from "../components/IntegralGraph";

export default function Graph() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <IntegralGraph />
      </main>
      <Footer />
    </div>
  );
}