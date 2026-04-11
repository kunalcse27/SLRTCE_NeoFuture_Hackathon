# Frontend Setup & Startup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

The `.env` file is pre-configured to connect to the backend:

```
VITE_API_URL=http://localhost:3000/api
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` folder.

## Login Credentials (Demo Mode)

Use these credentials to test the login functionality:

**Student Account:**

- Email: `student@slrtce.edu`
- Password: `password123`

**Test Account:**

- Email: `test@example.com`
- Password: `test123`

## Frontend Features

- **Dashboard**: View student progress and insights
- **Teacher Page**: Manage assignments and tasks
- **Profile Page**: Edit personal information
- **Wellbeing**: Mental health tracking and AI chat support
- **Responsive Design**: Works on mobile, tablet, and desktop

## Prerequisites

- **Backend must be running** on `http://localhost:3000`
- Node.js v16 or higher
- npm or yarn package manager

## Troubleshooting

**Network Error "Unable to Login":**

1. Make sure backend is running: `npm run dev` (in backend folder)
2. Check backend is on port 3000: `http://localhost:3000/health`
3. Verify `VITE_API_URL` in `.env` is set correctly
4. Clear browser cache and try again

**Port 5173 in use:**

```bash
npm run dev -- --port 5174
```

**Module not found errors:**

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
