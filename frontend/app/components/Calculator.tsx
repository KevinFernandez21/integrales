import { useState } from "react";
import MathKeyboard from "./MathKeyboard";
import Latex from "./Latex";
import KaTeXRenderer  from "./KaTeXRenderer";
import {Outlet } from "@remix-run/react";
export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const [methods, setMethods] = useState<string[] | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInsertSymbol = (symbol: string) => {
    setInput((prev) => prev + symbol);
  };

  const fetchMethods = async () => {
    try {
      const response = await fetch("https://interior-aveline-orangecorp-dd5a7f8f.koyeb.app/api/methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: input, variable: "x" }),
      });

      if (!response.ok) throw new Error("Error al obtener los métodos.");

      const data = await response.json();
      setMethods(data.methods);
    } catch (error) {
      console.error("Error:", error);
      setMethods(null);
    }
  };

  const fetchResult = async () => {
    try {
      const response = await fetch("https://interior-aveline-orangecorp-dd5a7f8f.koyeb.app/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: input, variable: "x" }),
      });

      if (!response.ok) throw new Error("Error al calcular la integral.");

      const data = await response.json();
      setResult(data.solution);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    }
  };

  const handleCalculate = async () => {
    await fetchMethods();
    await fetchResult();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
      {/* Calculadora */}
      
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-md w-full lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Calculadora Matemática con IA
        </h2>
        <div className="bg-black text-white p-4 rounded-lg mb-4">
          <KaTeXRenderer>{input}</KaTeXRenderer>
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ingrese un problema"
          className="w-full p-3 border rounded-lg mb-4 text-gray-800"
        />
        <MathKeyboard onInsertSymbol={handleInsertSymbol} />
        <button
          onClick={handleCalculate}
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-4 hover:bg-red-600"
        >
          Calcular
        </button>
      </div>
      <Outlet/>
      {/* Resultados */}
      <div className="bg-gray-100 text-gray-800 p-8 rounded-lg shadow-md w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Resultados</h2>
        {methods && (
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Métodos sugeridos:</h3>
            <ul className="list-disc list-inside pl-4">
              {methods.map((method, index) => (
                <li key={index} className="text-gray-700">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
            {Object.entries(result).map(([method, steps], index) => (
              <div
                key={index}
                className="mb-6 break-words whitespace-pre-wrap border-b pb-4 last:border-none"
              >
                <h3 className="text-xl font-bold text-red-500 mb-3">{method}:</h3>
                <div className="pl-4 space-y-2">
                  {Object.entries(steps as Record<string, string>).map(
                    ([stepKey, stepValue], stepIndex) => (
                      <div key={stepIndex} className="text-gray-700">
                        <strong>{stepKey}:</strong>{" "}
                        <Latex>
                          {`\\(${stepValue
                            .replace(/ /g, "\\,") // Espacios
                            .replace(/\n/g, "\\\\")}\\)`} 
                        </Latex>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
