import * as MathJaxLib from "better-react-mathjax";

const { MathJax} = MathJaxLib;

const Latex = ({ children }: { children: string }) => {
  return <MathJax>{children}</MathJax>;
};

export default Latex;