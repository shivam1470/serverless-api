/**
 * @fileoverview Entry point for the API.
 * This file is used to start the server and connect to MongoDB.
 */

import express, { Application } from "express";
import { createServer, Server } from "http";
import { connectToMongoDB } from "./db";
import { studentRoutes } from "./routes/studentRoutes";

// Create an Express application
const app: Application = express();
// Create an HTTP server
const server: Server = createServer(app);
// Port to listen on
const port: number = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Register student routes
    app.use("/students", studentRoutes);

    // Start the server
    server.listen(port, () => {
      console.log(`API is running on port ${port}`);
      console.log(`For testing, go to http://localhost:${port}/students`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to connect to MongoDB:", err);
  });
