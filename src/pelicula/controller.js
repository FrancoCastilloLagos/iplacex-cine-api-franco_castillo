import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";

const peliculaCollection = "peliculas";

// Insertar película
export const handleInsertPeliculaRequest = async (req, res) => {
  try {
    const db = getDB();
    const pelicula = req.body;
    const result = await db.collection(peliculaCollection).insertOne(pelicula);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas
export const handleGetPeliculasRequest = async (req, res) => {
  try {
    const db = getDB();
    const peliculas = await db.collection(peliculaCollection).find().toArray();
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const pelicula = await db.collection(peliculaCollection).findOne({ _id: new ObjectId(id) });

    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

    res.json(pelicula);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
};

// Actualizar
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const update = { $set: req.body };

    const result = await db.collection(peliculaCollection).updateOne({ _id: new ObjectId(id) }, update);

    if (result.matchedCount === 0) return res.status(404).json({ error: "Película no encontrada" });

    res.json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
};

// Eliminar
export const handleDeletePeliculaByIdRequest = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection(peliculaCollection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });

    res.json(result);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
};
