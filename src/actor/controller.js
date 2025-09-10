import { ObjectId } from "mongodb";
import { getDB } from "../common/db.js";

const actorCollection = "actores";
const peliculaCollection = "peliculas";

// Insertar actor
export const handleInsertActorRequest = async (req, res) => {
  try {
    const db = getDB();
    const actor = req.body;

    // validar si la película existe
    const pelicula = await db.collection(peliculaCollection).findOne({ nombre: actor.idPelicula });

    if (!pelicula) return res.status(404).json({ error: "Película no encontrada para asignar actor" });

    actor.idPelicula = pelicula._id.toString();

    const result = await db.collection(actorCollection).insertOne(actor);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los actores
export const handleGetActoresRequest = async (req, res) => {
  try {
    const db = getDB();
    const actores = await db.collection(actorCollection).find().toArray();
    res.json(actores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por ID
export const handleGetActorByIdRequest = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const actor = await db.collection(actorCollection).findOne({ _id: new ObjectId(id) });
    if (!actor) return res.status(404).json({ error: "Actor no encontrado" });

    res.json(actor);
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
};

// Obtener actores por película
export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
  try {
    const db = getDB();
    const { pelicula } = req.params;

    const actores = await db.collection(actorCollection).find({ idPelicula: pelicula }).toArray();

    res.json(actores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
