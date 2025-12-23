import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// ✅ Crear la aplicación Express
const app = express();

// ✅ Configuración de CORS
app.use(cors({ origin: "*" }));

// ✅ Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Endpoint de salud
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint de búsqueda
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Falta 'query'." });

  try {
    // 🔎 Fallback: consulta a Wikipedia
    const wikiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const w = await fetch(wikiUrl);

    if (w.ok) {
      const wData = await w.json();
      return res.json({
        source: "wikipedia",
        summary: wData.extract || "No se encontró información.",
        url: wData.content_urls?.desktop?.page || null
      });
    }

    res.json({ source: "none", results: [], message: "Sin resultados." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el motor de búsqueda." });
  }
});

// ✅ Arranque del servidor
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
