import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,       // 👈 fuerza TLS
  ssl: true,       // 👈 asegura conexión segura
  retryWrites: true,
  w: "majority",
});

let db;

export const connectToDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("cine-db");
    console.log("✅ Conectado a MongoDB Atlas");
  }
  return db;
};

export const getDB = () => db;
