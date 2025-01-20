import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function IntegralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: [0, 1, 2, 3, 4, 5],
          datasets: [
            {
              label: "Gráfica de la Integral",
              data: [0, 1, 4, 9, 16, 25], // Ejemplo de datos
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Gráfica de la Integral
      </h2>
      <canvas ref={canvasRef} />
    </div>
  );
}
