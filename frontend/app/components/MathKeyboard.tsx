const symbols = [
  { label: "x^2", latex: "x^2" },
  { label: "x", latex: "x" },
  { label: "√", latex: "\\sqrt{}" },
  { label: "∫", latex: "\\int" },
  { label: "π", latex: "\\pi" },
  { label: "∞", latex: "\\infty" },
  { label: "log", latex: "\\log" },
  { label: "θ", latex: "\\theta" },
  { label: "d/dx", latex: "\\frac{d}{dx}" },
  { label: "sin", latex: "\\sin" },
  { label: "cos", latex: "\\cos" },
  { label: "tan", latex: "\\tan" },
  { label: "ln", latex: "\\ln" },
  { label: "e", latex: "e" },
  { label: "lim", latex: "\\lim" },
  { label: "Σ", latex: "\\sum" },
];

export default function MathKeyboard({
  onInsertSymbol,
}: {
  onInsertSymbol: (symbol: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {symbols.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onInsertSymbol(symbol.latex)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
        >
          {`\\(${symbol.latex}\\)`}
        </button>
      ))}
    </div>
  );
}
