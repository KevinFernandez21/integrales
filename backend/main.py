from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse, StreamingResponse
import os
from dotenv import load_dotenv
from openai import OpenAI
import json
from fastapi.middleware.cors import CORSMiddleware

# Cargar variables de entorno
load_dotenv()

# Inicializar FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://integrales-ten.vercel.app/"],  # Cambia al dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Modelo para recibir datos del cliente
class IntegralRequest(BaseModel):
    expression: str  # Expresión matemática a resolver
    variable: str = "x"  # Variable de integración (por defecto: x)

# Endpoint 1: Determinar el método para resolver la integral
# Endpoint para determinar los métodos de resolución
class IntegralRequest(BaseModel):
    expression: str  # Expresión matemática a resolver
    variable: str = "x"  # Variable de integración


# Endpoint para determinar el método de resolución
@app.post("/api/methods")
async def determine_methods(request: IntegralRequest):
    try:
        # Crear el prompt para determinar los métodos
        prompt = f"""
Analiza la integral indefinida ∫ {request.expression} d{request.variable}. Determina los métodos más adecuados para resolverla, considerando que pueden aplicarse múltiples métodos. 

Instrucciones:
1. Retorna únicamente una lista de palabras separadas por comas que representen los métodos aplicables.
2. Considera métodos estándar como: integración directa, sustitución, por partes, integración trigonométrica.
3. No incluyas explicaciones ni comentarios adicionales.
4. Responde exclusivamente en el siguiente formato: 'integración directa, sustitución, por partes'.

Ejemplo 1:
Para ∫ x^2 dx, responde: 'integración directa'.

Ejemplo 2:
Para ∫ x * e^x dx, responde: 'por partes'.

Ejemplo 3:
Para ∫ sin(x) * cos(x) dx, responde: 'sustitución, integración trigonométrica'.
"""
        # Solicitar respuesta al modelo
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
        )
        message_content = response.choices[0].message.content.strip()

        # Convertir la respuesta en una lista eliminando espacios adicionales
        methods_list = [method.strip() for method in message_content.split(",")]

        # Retornar los métodos como JSON
        return {"methods": methods_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al determinar los métodos: {str(e)}")



@app.post("/api/solve")
async def solve_integral(request: IntegralRequest):
    try:
        # Crear el prompt con la expresión proporcionada
        prompt = f"""
Resuelve la siguiente integral indefinida y proporciona los pasos detallados junto con el resultado final. Estructura la respuesta en formato JSON exclusivamente con los métodos aplicables, los pasos detallados en cada método, y el resultado final, todos en formato LaTeX.

La estructura JSON debe ser exactamente la siguiente:
{{
    "Metodo1": {{
        "Paso1": "Representación en formato LaTeX del paso 1.",
        "Paso2": "Representación en formato LaTeX del paso 2.",
        ...
        "Resultado": "Representación en formato LaTeX del resultado final usando este método."
    }},
    "Metodo2": {{
        "Paso1": "Representación en formato LaTeX del paso 1.",
        "Paso2": "Representación en formato LaTeX del paso 2.",
        ...
        "Resultado": "Representación en formato LaTeX del resultado final usando este método."
    }}
}}

La integral que debes resolver es:
∫ {request.expression} \, d{request.variable}

Instrucciones específicas:
1. Determina todos los métodos aplicables para resolver esta integral (por ejemplo, integración directa, por partes, sustitución, etc.).
2. Para cada método, incluye los pasos detallados en formato LaTeX y el resultado final también en formato LaTeX.
3. Devuelve exclusivamente el JSON en el formato especificado. No incluyas texto adicional fuera del JSON.
"""

        # Solicitar respuesta al modelo
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
        )
        message_content = response.choices[0].message.content.strip()

        # Intentar convertir el texto en un JSON válido
        try:
            solution_json = json.loads(message_content)  # Convertir el texto a un diccionario
        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"Error al convertir la respuesta del modelo a JSON: {str(e)}")

        # Retornar la solución como JSON
        return JSONResponse(content={"solution": solution_json})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al resolver la integral: {str(e)}")