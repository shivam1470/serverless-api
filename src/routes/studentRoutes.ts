import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router: Router = Router();

// Get all students
router.get("/", getStudents);

// Get a specific student by ID
router.get("/:id", getStudentById);

// Create a new student
router.post("/", createStudent);

// Update an existing student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

export const studentRoutes: Router = router;
