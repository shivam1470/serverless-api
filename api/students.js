// Description: This file contains the code for the student API.

const express = require("express");
const { createServer } = require("http");
const { proxy } = require("express-http-proxy");

const app = express();

console.log("API is running");

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store student data (replace this with a database in a real-world scenario)
let students = [];

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Get a specific student by ID
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

// Create a new student
app.post("/students", (req, res) => {
  const student = req.body;
  students.push(student);
  res.status(201).json(student);
});

// Update an existing student
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const updatedStudent = { id, ...req.body };
  students[studentIndex] = updatedStudent;

  res.json(updatedStudent);
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.json(deletedStudent);
});

const server = createServer(app);

module.exports = (req, res) => {
  server(req, res);
};

const port =  3000;

server.listen(port, () => {
  console.log(`API is running on port ${port}`);
  console.log('For testing, visit http://localhost:3000/students')
});
