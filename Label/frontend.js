const consultarBtn = document.getElementById("consultarBtn");
const borrarBtn = document.getElementById("borrarBtn");
const searchBox = document.getElementById("searchBox");
const respuestaDiv = document.getElementById("respuesta");

consultarBtn.addEventListener("click", async () => {
  const pregunta = searchBox.value.trim();
  if (!pregunta) {
    respuestaDiv.textContent = "⚠️ Escribe una consulta.";
    return;
  }

  respuestaDiv.textContent = "⏳ Buscando...";

  try {
    const response = await fetch("http://localhost:3001/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: pregunta })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Mostrar resultados según la fuente
    if (data.source === "wikipedia") {
      respuestaDiv.innerHTML = `
        <div class="result">
          <strong>Resumen (Wikipedia):</strong>
          <p>${data.summary}</p>
          ${data.url ? `<a href="${data.url}" target="_blank">Ver más</a>` : ""}
        </div>
      `;
    } else if (data.source === "google" && data.results?.length) {
      respuestaDiv.innerHTML = data.results
        .map(r => `
          <div class="result">
            <a href="${r.link}" target="_blank">${r.title}</a>
            <p>${r.snippet}</p>
          </div>
        `)
        .join("");
    } else {
      respuestaDiv.textContent = "Sin resultados.";
    }
  } catch (err) {
    console.error("Error detallado:", err);
    respuestaDiv.textContent = "❌ Error al consultar la IA.";
  }
});

borrarBtn.addEventListener("click", () => {
  searchBox.value = "";
  respuestaDiv.textContent = "";
});
