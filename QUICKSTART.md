# ALWS - Adaptive Learning & Wellbeing System

## 🚀 Quick Start Guide

### Prerequisites

- Node.js v16+ installed
- npm or yarn package manager
- (Optional) MongoDB for persistent data storage

### Setup Both Backend & Frontend

#### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

#### Step 2: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### Step 3: Start Backend Server

Open a terminal at the root and run:

```bash
cd backend
npm run dev
```

You should see:

```
Server running on port 3000
```

#### Step 4: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend will open at: `http://localhost:5173`

### 🔑 Test Credentials

**Use these credentials to login:**

**Student Account:**

- Email: `student@slrtce.edu`
- Password: `password123`

**Test Account:**

- Email: `test@example.com`
- Password: `test123`

---

## 📁 Project Structure

```
SLRTCE_NeoFuture_Hackathon/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/      # Route controllers (auth, wellbeing)
│   ├── models/           # Database models
│   ├── routes/           # API route definitions
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment configuration
│   └── STARTUP.md        # Backend setup guide
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service
│   │   └── App.jsx       # Main app
│   ├── package.json      # Frontend dependencies
│   ├── .env              # Frontend env config
│   ├── vite.config.js    # Vite configuration
│   └── STARTUP.md        # Frontend setup guide
│
└── README.md             # This file
```

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Wellbeing

- `GET /api/wellbeing/stats` - Get wellbeing statistics
- `POST /api/wellbeing/journal` - Submit journal entry
- `POST /api/wellbeing/chat` - Chat with Mira AI bot
- `POST /api/wellbeing/analyze` - Sentiment analysis

### Health

- `GET /health` - Check API status

---

## 🔧 Configuration

### Backend (.env)

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/alws
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000/api
```

---

## ✨ Features

### Dashboard

- View student progress and insights
- Personal learning analytics
- Wellbeing check-ins

### Teacher Portal

- Create and manage assignments
- Track student submissions
- Grade assignments

### Profile Management

- Edit personal information
- Update academic details
- Manage contact information

### Wellbeing

- Mental health journal entries
- AI-powered chat support (Mira)
- Sentiment analysis
- Stress tracking

---

## 🐛 Troubleshooting

### "Network error" on login

1. ✅ Backend is running on port 3000
2. ✅ CORS is configured correctly
3. ✅ Check browser console (F12) for errors
4. ✅ Clear browser cache: Ctrl+Shift+Delete

### Port already in use

```bash
# Backend on different port
PORT=3001 npm run dev

# Frontend on different port
npm run dev -- --port 5174
```

### Database connection errors

- Install MongoDB: https://www.mongodb.com/try/download/community
- Run MongoDB: `mongod`
- Auth will work in demo mode even without DB

### Module not found

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Key Technologies

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Mongoose** - ODM
- **CORS** - Cross-origin support

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation

---

## 🎯 Demo Mode

The backend automatically enables demo mode when MongoDB is unavailable. This allows testing authentication and basic functionality without a database.

Pre-configured demo users:

- `student@slrtce.edu` / `password123`
- `test@example.com` / `test123`

---

## 📝 Development Workflow

1. Start both backend and frontend servers
2. Make changes to code
3. Frontend auto-reloads (HMR)
4. Backend auto-reloads with nodemon
5. Test in browser at http://localhost:5173
6. Commit changes: `git add . && git commit -m "message"`
7. Push to GitHub: `git push origin dashboard-work`

---

## 🚀 Production Deployment

### Backend

```bash
npm install --production
npm start
```

### Frontend

```bash
npm run build
# Deploy dist/ folder to hosting
```

---

## 📞 Support

For issues or questions:

1. Check the STARTUP.md files in backend/ and frontend/ folders
2. Review browser console (F12) for errors
3. Check network tab for API requests
4. Ensure both services are running

---

## ✅ Checklist

Before testing the full application:

- [ ] Backend: `npm install` ✓
- [ ] Frontend: `npm install` ✓
- [ ] Backend: `npm run dev` (running on port 3000)
- [ ] Frontend: `npm run dev` (running on port 5173)
- [ ] Can see login page at http://localhost:5173
- [ ] Can login with test credentials
- [ ] Dashboard loads after login
- [ ] Profile and other pages are accessible

---

Happy coding! 🎉
