/**
 * @fileoverview This file is used to connect to MongoDB and return the database object
 * to the rest of the application.
 */

/**
 * MongoClient is used to connect to MongoDB.
 * Db is used to interact with the database.
 * MongoClientOptions is used to configure the connection to MongoDB.
 */
import { MongoClient, Db, MongoClientOptions } from "mongodb";

/**
 * The URL to connect to MongoDB Atlas.
 * The username and password are stored in the URL.
 * The URL also specifies the name of the database to connect to.
 */
const mongoUrl: string =
  "mongodb+srv://shivammishr16:Zp48E2bOAI0qMxYR@cluster0.zzvv0w8.mongodb.net/";
// database name to connect to
const dbName: string = "studentDB";

/**
 * The database object that is returned by connectToMongoDB().
 */
let db: Db;

/**
 * Connect to MongoDB Atlas and return the database object.
 * @returns A Promise that resolves to the database object.
 * @throws An error if the connection to MongoDB fails.
 */
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

/**
 * Return the database object.
 * @returns The database object.
 * @throws An error if the database object is not set.
 */
export function getDB(): Db {
  if (!db) {
    throw new Error("MongoDB connection not established");
  }

  return db;
}
