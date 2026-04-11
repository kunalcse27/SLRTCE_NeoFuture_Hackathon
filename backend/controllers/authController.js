import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// In-memory user store for demo mode (when DB is not available)
const demoUsers = new Map([
  ['student@slrtce.edu', {
    id: '1',
    firstName: 'Student',
    lastName: 'User',
    email: 'student@slrtce.edu',
    password: 'password123',
    role: 'student',
    courseBranch: 'Computer Science'
  }],
  ['test@example.com', {
    id: '2',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'test123',
    role: 'student',
    courseBranch: 'Engineering'
  }]
]);

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, courseBranch } = req.body;

    // Try database first
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        courseBranch
      });

      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (dbError) {
      // Fall back to demo mode
      console.warn('Database unavailable, using demo mode for registration');
      
      if (demoUsers.has(email)) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password,
        courseBranch,
        role: 'student'
      };

      demoUsers.set(email, newUser);
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;

    // Try database first
    try {
      user = await User.findOne({ email });
    } catch (dbError) {
      // Fall back to demo mode
      console.warn('Database unavailable, using demo mode for login');
      user = demoUsers.get(email) || null;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id || user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        courseBranch: user.courseBranch,
        role: user.role || 'student'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
