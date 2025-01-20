from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

stream = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {
            "role": "user",
            "content": (
                "Analiza la integral indefinida ∫ x^2 + 3*x dx. Determina el método más adecuado o una lista de métodos aplicables para resolverla. "
                "Considera únicamente métodos estándar como: integración directa, sustitución, por partes, trigonométrica. "
                "Ejemplos: "
                "- Para ∫ x^2 dx, el método es 'integración directa'. "
                "- Para ∫ x * e^x dx, el método es 'por partes'. "
                "Tu respuesta debe cumplir con lo siguiente: "
                "1. Contener exclusivamente el nombre del método o métodos aplicables. "
                "2. No incluir explicaciones, comentarios adicionales o contenido fuera del método. "
                "3. Respuesta máxima de 10 palabras. "
                "Ejemplo de respuesta: 'método de integración directa' o 'por partes, sustitución'."
            )
        }
    ],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="") 