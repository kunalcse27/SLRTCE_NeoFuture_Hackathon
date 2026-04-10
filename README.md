# ALWS - Adaptive Learning & Wellbeing System

Adaptive Learning & Wellbeing System (ALWS) is a unified platform designed to track cognitive performance, emotional stability, and behavioral trends to provide actionable mental health insights.

## Project Structure

### 🖥️ Frontend (React + Vite)
Located in `/frontend`. Consolidated for ease of demo management.
- **`src/pages/`**: Self-contained page views (Dashboard, Insights, Login).
- **`src/components/layout/`**: Shared shell components (Sidebar, Header).
- **`src/services/`**: API communication layer.
- **Animations**: Powered by `framer-motion`.

### 🛡️ Backend (Node.js + Express)
Located in `/backend`. Structured using a modular MVC pattern.
- **`models/`**: Mongoose data schemas.
- **`controllers/`**: Business logic handlers.
- **`routes/`**: API endpoint definitions.
- **`config/`**: Database and environment configuration.

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm start (or nodemon server.js)
```
*Note: Requires a `MONGO_URL` in `.env`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Demo Highlights
- **Dynamic Sentiment Gauge**: Visualizes mood stability from Green to Red.
- **Cognitive Insights**: AI-generated suggestions based on behavioral patterns.
- **Synchronized Alerts**: Real-time risk detection for students.
- **Premium Architecture**: Built for scale and easy integration.
