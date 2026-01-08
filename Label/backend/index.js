// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend de Asistente Virtual UNETI funcionando 🚀");
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo y saludable" });
});

// Ruta de búsqueda (mock temporal)
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Falta el parámetro q" });
    }

    // Mock temporal: devuelve resultados simulados
    const results = [
      { title: `Resultado 1 para ${query}`, link: "https://es.wikipedia.org/wiki/" + encodeURIComponent(query) },
      { title: `Resultado 2 para ${query}`, link: "https://www.google.com/search?q=" + encodeURIComponent(query) }
    ];

    return res.json({ query, results });
  } catch (error) {
    console.error("Error interno en /api/search:", error);
    res.status(500).json({ error: "Error interno en búsqueda" });
  }
});

// Ruta de generación de imagen (mock temporal)
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    // Mock temporal: devuelve una URL simulada con dummyimage.com
    const data = {
      url: `https://dummyimage.com/512x512/000/fff&text=${encodeURIComponent(prompt)}`
    };

    return res.json(data);
  } catch (error) {
    console.error("Error interno en /api/generate-image:", error);
    res.status(500).json({ error: "Error interno al generar la imagen" });
  }
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
