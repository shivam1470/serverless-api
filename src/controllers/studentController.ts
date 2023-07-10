/**
 * @fileoverview This file is used to define the routes for the API.
 * It is used to define the routes for the student resource.
 */
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db";

// Get all students
export async function getStudents(req: Request, res: Response): Promise<void> {
  const db = getDB();
  const students = await db.collection("students").find().toArray();
  res.json(students);
}

// Get a specific student by ID
export async function getStudentById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const db = getDB();
  const student = await db
    .collection("students")
    .findOne({ _id: new ObjectId(id) });

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json(student);
}

// Create a new student
export async function createStudent(
  req: Request,
  res: Response
): Promise<void> {
  const student = req.body;
  const db = getDB();
  const result: any = await db.collection("students").insertOne(student);
  console.log(result);
  const { insertedId } = result;
  res.status(200).json(insertedId);
}

// Update an existing student
export async function updateStudent(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const updatedStudent = { $set: req.body };
  const db = getDB();
  const result = await db
    .collection("students")
    .updateOne({ _id: new ObjectId(id) }, updatedStudent);

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json(updatedStudent);
}

// Delete a student
export async function deleteStudent(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const db = getDB();
  const result = await db
    .collection("students")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json({ message: "Student deleted successfully" });
}
