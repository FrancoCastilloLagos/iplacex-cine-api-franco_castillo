import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://eva3_express:5q5PfVKYizZA3uS@cluster-express.6s7qpmg.mongodb.net/cine-db?retryWrites=true&w=majority&appName=cluster-express";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectToDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("cine-db");
    console.log("Conectado a MongoDB");
  }
  return db;
};

export const getDB = () => db;
