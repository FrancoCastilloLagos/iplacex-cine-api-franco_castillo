import express from "express";
import cors from "cors";
import { connectToDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});

app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

const startServer = async () => {
  try {
    await connectToDB(); 
    console.log("Conexión a MongoDB Atlas exitosa");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error conectando a MongoDB Atlas:", err.message);
    process.exit(1); 
  }
};

startServer();
