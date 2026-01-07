import dotenv from "dotenv";
dotenv.config();

// index.js
import express from "express";
import cors from "cors";

// Inicializar Express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido al backend IA UNETI 🚀");
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.send("Backend activo ✅");
});

// Ruta de búsqueda simulada
app.get("/api/search", (req, res) => {
  const consulta = req.query.q || "sin consulta";
  res.json({ consulta, resultado: `Respuesta simulada para: ${consulta}` });
});

// Ruta para generar imagen con PIAPI
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, size = "512x512", model = "stable-v1" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const apiKey = process.env.PIAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key no configurada en Render" });
    }

    const response = await fetch("https://api.piapi.com/v1/images/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, size, model })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("PIAPI error:", response.status, errBody);
      return res.status(response.status).json({
        error: "Fallo en PIAPI",
        details: errBody
      });
    }

    const data = await response.json(); // Ejemplo: { image_url: "https://..." }
    return res.json(data);
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error interno al generar la imagen" });
  }
});


    const response = await fetch("https://api.piapi.com/v1/images/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, size, model })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("PIAPI error:", response.status, errBody);
      return res.status(response.status).json({ error: "Fallo en PIAPI", details: errBody });
    }

    const data = await response.json(); // Ejemplo: { image_url: "https://..." }
    return res.json(data);
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error interno al generar la imagen" });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
