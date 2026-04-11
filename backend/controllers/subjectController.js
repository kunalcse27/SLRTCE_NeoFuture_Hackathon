import Subject from '../models/Subject.js';

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // assume auth middleware attaches the user object

    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const subject = new Subject({
      name,
      createdBy: userId,
    });

    const savedSubject = await subject.save();

    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getSubjects = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'teacher') {
      query = { createdBy: req.user.id };
    }
    const subjects = await Subject.find(query).sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
