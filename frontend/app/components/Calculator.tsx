import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    // Lógica para calcular la integral (puede llamarse al backend)
    alert(`Calculando la integral de: ${input}`);
  };

  return (
    <div className="calculator-container p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Calculadora Matemática con IA
      </h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ingrese un problema"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleCalculate}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Calcular
      </button>
    </div>
  );
}
