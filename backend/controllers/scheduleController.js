import Task from "../models/schedule.js";  // Import Task directly

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, date, userId } = req.body;
    
    // Check if title and date are provided
    if (!title || !date || !userId) {
      return res.status(400).json({ message: "Title, date, and userId are required" });
    }

    const task = new Task({ title, date, userId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const userId = req.params.id;  // Changed from req.params.Id to req.params

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const tasks = await Task.find({ userId }).sort({ date: 1 }); // Sort by date
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.Id

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export default {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
