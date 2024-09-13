import express from "express"
const router = express.Router();
import {createTask,getTasks,updateTask,deleteTask} from '../controllers/scheduleController.js'

// Create a new task
router.post("/", createTask);

// Get all tasks for a user
router.get("/:id", getTasks);

// Update a task
router.put("/:Id", updateTask);

// Delete a task
router.delete("/:Id", deleteTask);

export default router;
