// Label/backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Backend activo ✅");
});

// Health
app.get("/health", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Search (simulado)
app.get("/api/search", (req, res) => {
  const query = req.query.q?.trim();
  if (!query) {
    return res.status(400).json({ error: "Falta el parámetro 'q'" });
  }
  res.json({ resultado: `Respuesta simulada para: ${query}` });
});

// Image generation (mock temporal)
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Falta el prompt" });
    }
    const data = {
      url: `https://dummyimage.com/512x512/000/fff&text=${encodeURIComponent(prompt)}`
    };
    return res.json(data);
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error interno al generar la imagen" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
