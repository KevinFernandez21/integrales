import katex from "katex";
import "katex/dist/katex.min.css";

export default function KaTeXRenderer({ children }: { children: string }) {
  let html = "";
  try {
    html = katex.renderToString(children, {
      throwOnError: false,
    });
  } catch (error) {
    console.error("Error rendering KaTeX:", error);
    html = children; // Mostrar el texto en bruto si hay errores
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
