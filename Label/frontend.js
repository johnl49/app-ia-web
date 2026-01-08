// URL del backend en Render
const API_URL = "https://app-ia-web.onrender.com";

// Función para consultar la IA
async function consultarIA(consulta) {
  try {
    const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(consulta)}`);
    
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    mostrarRespuesta(data);
  } catch (error) {
    console.error("❌ Error al consultar la IA:", error);
    mostrarError("❌ Error al consultar la IA. Verifica que el backend esté activo en Render.");
  }
}

// Función para mostrar la respuesta en pantalla
function mostrarRespuesta(data) {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = `
    <p><strong>Consulta:</strong> ${data.consulta}</p>
    <p><strong>Resultado:</strong> ${data.resultado}</p>
  `;
}

// Función para mostrar errores
function mostrarError(mensaje) {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = `<p style="color:red">${mensaje}</p>`;
}
