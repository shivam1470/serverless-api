import { MongoClient, Db, MongoClientOptions } from "mongodb";

const mongoUrl: string = "mongodb+srv://shivammishr16:Zp48E2bOAI0qMxYR@cluster0.zzvv0w8.mongodb.net/";
const dbName: string = "studentDB";

let db: Db;

export function connectToMongoDB(): Promise<Db> {
  return new Promise<Db>((resolve, reject) => {
    MongoClient.connect(mongoUrl, {
      useUnifiedTopology: true,
    } as MongoClientOptions)
      .then((client) => {
        db = client.db(dbName);
        resolve(db);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getDB(): Db {
  if (!db) {
    throw new Error("MongoDB connection not established");
  }

  return db;
}
