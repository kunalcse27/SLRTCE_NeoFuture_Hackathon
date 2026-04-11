import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Routes
import wellbeingRoutes from "./routes/wellbeing.routes.js";

dotenv.config();

// Initialize DB (optional - will fail gracefully)
try {
  connectDB();
} catch (error) {
  console.warn("Database connection failed, running in demo mode");
}

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

// API Routes
app.use("/api/wellbeing", wellbeingRoutes);

app.get("/", (req, res) => {
  res.send("ALWS Backend API Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});