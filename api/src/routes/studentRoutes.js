import express from "express";
import { getAllStudents, getUserById } from "../controllers/studentController.js";

const router = express.Router();

router.get("/all", getAllStudents);
router.get("/:id", getUserById);

export { router as studentRoutes };
