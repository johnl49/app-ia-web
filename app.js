const consultarBtn = document.getElementById("consultarBtn");
const borrarBtn = document.getElementById("borrarBtn");
const searchBox = document.getElementById("searchBox");
const respuestaDiv = document.getElementById("respuesta");

function setEstado(mensaje) {
  respuestaDiv.textContent = mensaje;
}

// Acción del botón Consultar IA
consultarBtn.addEventListener("click", async () => {
  const pregunta = searchBox.value.trim();
  if (!pregunta) {
    setEstado("⚠️ Escribe una pregunta para consultar a la IA.");
    return;
  }

  setEstado("⏳ Consultando IA...");

  try {
    // Cambia esta URL y clave por tu backend o API real
    const API_URL = "http://localhost:3001/api/query";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: pregunta })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const answer = data.answer || "La IA no devolvió respuesta.";
    setEstado(`🤖 Respuesta IA:\n${answer}`);
  } catch (err) {
    console.error(err);
    setEstado("❌ Error al consultar la IA.");
  }
});

// Acción del botón Borrar
borrarBtn.addEventListener("click", () => {
  searchBox.value = "";
  respuestaDiv.textContent = "";
});
