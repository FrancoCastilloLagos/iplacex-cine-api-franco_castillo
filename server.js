import express from "express";
import cors from "cors";
import { connectToDB, getDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const db = await connectToDB();
    const peliculas = await db.collection("peliculas").find().toArray();
    res.json({
      mensaje: "Bienvenido al cine Iplacex",
      peliculas,
    });
  } catch (err) {
    console.error("Error obteniendo películas:", err.message);
    res.status(500).json({ error: "Error al obtener datos de MongoDB" });
  }
});

app.use("/api/peliculas", peliculaRoutes);
app.use("/api/actores", actorRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const startServer = async () => {
  try {
    await connectToDB();
    console.log("Conexión a MongoDB Atlas exitosa");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error iniciando el servidor:", err.message);
    process.exit(1);
  }
};

startServer();
