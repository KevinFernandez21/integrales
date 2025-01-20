import * as MathJaxLib from "better-react-mathjax";
const {MathJaxContext } = MathJaxLib;
import { useEffect, useState } from "react";

const config = {
  loader: { load: ["input/asciimath", "output/chtml"] },
};

const MathJaxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <>{children}</>;

  return <MathJaxContext config={config}>{children}</MathJaxContext>;
};

export default MathJaxProvider;
