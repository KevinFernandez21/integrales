import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="" alt="Logo" className="h-10 w-10 mr-3" />
        <span className="text-xl font-bold">AI Calculadora</span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Calculadora
          </Link>
        </li>
        <li>
          <Link to="/graph" className="hover:underline">
            Gráficas
          </Link>
        </li>
      </ul>
    </nav>
  );
}
