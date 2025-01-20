import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        
        <span className="text-xl font-bold">AI Calculadora</span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Calculadora
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            ¿Quienes somos?
          </Link>
        </li>
      </ul>
    </nav>
  );
}
