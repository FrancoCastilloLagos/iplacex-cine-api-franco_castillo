import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("❌ No se encontró la variable de entorno MONGO_URI");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true, 
});

let db;

export const connectToDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("cine-db"); 
      console.log("✅ Conectado a MongoDB Atlas");
    } catch (error) {
      console.error("❌ Error conectando a MongoDB Atlas:", error.message);
      throw error;
    }
  }
  return db;
};

export const getDB = () => db;
