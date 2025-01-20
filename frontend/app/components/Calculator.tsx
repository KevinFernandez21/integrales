import { useState } from "react";
import MathKeyboard from "./MathKeyboard";

export default function Calculator() {
  const [input, setInput] = useState(""); // Para capturar la expresión
  const [methods, setMethods] = useState<string[] | null>(null); // Métodos sugeridos
  const [result, setResult] = useState(null); // Resultado final de la integral

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); // Actualiza el input al escribir
  };

  const handleInsertSymbol = (symbol: string) => {
    setInput((prev) => prev + symbol); // Inserta un símbolo en el input
  };

  const fetchMethods = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/methods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression: input, variable: "x" }),
      });

      if (!response.ok) throw new Error("Error al obtener los métodos.");

      const data = await response.json();
      setMethods(data.methods); // Actualiza los métodos
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSolution = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression: input, variable: "x" }),
      });

      if (!response.ok) throw new Error("Error al calcular la integral.");

      const data = await response.json();
      setResult(data.solution); // Actualiza el resultado
    } catch (error) {
      console.error(error);
    }
  };

  const handleCalculate = async () => {
    await fetchMethods(); // Primero obtiene los métodos sugeridos
    await fetchSolution(); // Luego resuelve la integral
  };

  return (
    <div className="bg-white text-gray-800 p-8 rounded shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Calculadora Matemática con IA</h2>

      {/* Input para la expresión */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ingrese un problema"
        className="w-full p-3 border rounded mb-4 text-white"
      />

      {/* Componente MathKeyboard */}
      <MathKeyboard onInsertSymbol={handleInsertSymbol} />

      {/* Botón para calcular */}
      <button
        onClick={handleCalculate}
        className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-red-600"
      >
        Calcular
      </button>

      {/* Métodos sugeridos */}
      {methods && (
        <div className="mt-4">
          <h3 className="font-bold">Métodos sugeridos:</h3>
          <ul className="list-disc list-inside">
            {methods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Resultado de la integral */}
      {result && (
        <div className="mt-4">
          <h3 className="font-bold">Solución:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
