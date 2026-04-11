# Backend Setup & Startup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

The `.env` file is already configured with default values:

- PORT: 3000
- JWT_SECRET: your_super_secret_jwt_key_change_this_in_production
- MONGO_URL: mongodb://localhost:27017/alws (optional)

### 3. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:3000`

## Test Credentials (Demo Mode)

When MongoDB is not available, the app runs in demo mode with pre-configured users:

**Student Account:**

- Email: `student@slrtce.edu`
- Password: `password123`

**Test Account:**

- Email: `test@example.com`
- Password: `test123`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Wellbeing

- `GET /api/wellbeing/stats` - Get wellbeing stats
- `POST /api/wellbeing/journal` - Submit journal entry
- `POST /api/wellbeing/chat` - Chat with Mira AI
- `POST /api/wellbeing/analyze` - Sentiment analysis

### Health Check

- `GET /health` - API health status

## CORS Configuration

The backend is configured to accept requests from:

- http://localhost:5173 (Vite frontend)
- http://localhost:3000
- http://localhost:5000

## Demo Mode

The backend automatically falls back to demo mode if MongoDB is not available. This allows testing authentication without setting up a database.

To use MongoDB:

1. Install and run MongoDB locally
2. Update `MONGO_URL` in `.env`
3. Restart the backend

## Troubleshooting

**Port already in use:**

```bash
# Change PORT in .env file or use:
PORT=3001 npm run dev
```

**Database connection errors:**

- Check MongoDB is running: `mongod`
- Verify `MONGO_URL` in `.env`
- Backend will auto-fallback to demo mode

**CORS errors:**

- Ensure frontend is running on one of the configured origins
- Check your frontend port matches one in the CORS whitelist
