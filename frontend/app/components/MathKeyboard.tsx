import React from "react";

type MathKeyboardProps = {
  onInsertSymbol: (symbol: string) => void;
};

const MathKeyboard: React.FC<MathKeyboardProps> = ({ onInsertSymbol }) => {
  const symbols = [
    "x^2", "x", "√", "∫", "π", "∞", "log", "θ", "d/dx",
    "sin", "cos", "tan", "ln", "e", "lim", "Σ"
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-md grid grid-cols-6 gap-2">
      {symbols.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onInsertSymbol(symbol)}
          className="text-center py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-200 active:bg-gray-300"
        >
          {symbol}
        </button>
      ))}
    </div>
  );
};

export default MathKeyboard;
