import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, subject, fileUrl } = req.body;
    const userId = req.user.id;

    if (!title || !subject) {
      return res.status(400).json({ message: "Title and subject are required" });
    }

    const task = new Task({
      title,
      description,
      subject,
      fileUrl,
      createdBy: userId,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { subjectId } = req.query;
    let query = {};
    if (subjectId) {
      query.subject = subjectId;
    }
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
