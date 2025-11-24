# E-Sports Match Tracker - Complete Setup Guide

A full-stack application for tracking e-sports matches. Built with **React.js** (Vite) on the frontend and **ASP.NET Core Web API** on the backend, featuring real-time match data, interactive UI, and comprehensive test coverage.

---

## 📦 Features

- **Match Categories**: Live Events, Upcoming Operations, and Mission Logs with collapsible sections
- **Real-time Updates**: Fetch match data from backend API with automatic caching
- **API Documentation**: Interactive Scalar API documentation
- **Database Logging**: Match API call logging to SQL database
- **Comprehensive Tests**: Unit tests for both frontend and backend

---

## 🔧 Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Date Handling**: date-fns

### Backend
- **Framework**: ASP.NET Core 10.0 Web API
- **Database**: Entity Framework Core with SQLite
- **API Documentation**: Scalar
- **Testing**: xUnit + Moq

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **.NET 10.0 SDK**

---

## 🖥️ Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Run Database Migrations
The project uses SQLite, which will automatically create a local database file. No additional database setup is required.
```bash
dotnet ef migrations add InitialCreate --project ESportsMatchTracker.API

dotnet ef database update --project ESportsMatchTracker.API
```

### 4. Start the Backend Server
```bash
dotnet run --project ESportsMatchTracker.API
```

The backend API will start on **http://localhost:5105**

### 5. Access API Documentation
Open your browser and navigate to:
- **Scalar UI**: [http://localhost:5105/scalar/v1](http://localhost:5105/scalar/v1)
- **OpenAPI JSON**: [http://localhost:5105/openapi/v1.json](http://localhost:5105/openapi/v1.json)

### 6. Run Backend Tests
```bash
cd ESportsMatchTracker.Tests
dotnet test
```

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The frontend will start on **http://localhost:3000**

### 4. Run Frontend Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

The production build will be in the `dist` folder.

### 6. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Ports & URLs

| Service | URL | Port |
|---------|-----|------|
| **Frontend (Dev)** | http://localhost:3000 | 3000 |
| **Backend API** | http://localhost:5105 | 5105 |
| **Scalar API Docs** | http://localhost:5105/scalar/v1 | 5105 |
| **OpenAPI Spec** | http://localhost:5105/openapi/v1.json | 5105 |

---

## 📂 Project Structure

```
/project_root/
├── backend/
│   ├── ESportsMatchTracker.API/       # Main API project
│   │   ├── Controllers/               # API controllers
│   │   ├── Services/                  # Business logic
│   │   ├── Models/                    # Data models
│   │   ├── Data/                      # Database context
│   │   └── Program.cs                 # Application entry point
│   └── ESportsMatchTracker.Tests/     # Backend unit tests
├── frontend/
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── Layout/               # Layout components
│   │   │   └── Match/                # Match-related components
│   │   ├── services/                  # API services
│   │   ├── App.jsx                    # Main app component
│   │   └── index.jsx                  # Entry point
│   ├── public/                        # Static assets
│   └── index.html                     # HTML template
└── DummyFeed/                         # Mock data for development
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test                    # Run tests in watch mode
npm test -- --run          # Run tests once
```

Includes tests for:
- Component rendering
- User interactions
- API integration
- Modal functionality

### Backend Tests
```bash
cd backend/ESportsMatchTracker.Tests
dotnet test                         # Run all tests
dotnet test --logger "console"     # Verbose output
```

Includes tests for:
- Match service logic
- API endpoints
- Database operations
- Caching behavior

---

## 🎮 Features & Usage

### Match Categories

1. **LIVE EVENTS** (Default: Expanded)
   - Shows currently live matches
   - Real-time status updates

2. **UPCOMING OPERATIONS** (Default: Collapsed)
   - Displays scheduled matches

3. **MISSION LOGS** (Default: Collapsed)
   - Archive of completed matches
   - Final scores and results

### Interactive Elements

- **Collapsible Categories**: Click category headers to expand/collapse
- **Match Details**: Click on any match card to view detailed information
- **Video Playback**: Watch live streams or replays in the modal
- **Responsive Design**: Optimized for desktop, tablet, and mobile

---

## 🛠️ Development

### Frontend Hot Reload
Vite provides instant hot module replacement. Changes to components will reflect immediately without page refresh.

### Backend Hot Reload
Use `dotnet watch run` for automatic recompilation on file changes:
```bash
cd backend
dotnet watch run
```

### Database Migrations
Create a new migration after model changes:
```bash
cd backend
dotnet ef migrations add MigrationName --project ESportsMatchTracker.API
dotnet ef database update --project ESportsMatchTracker.API
```

---

## 📝 API Endpoints

### Match
- `GET /api/match` - Get all matches

---


## 🐛 Troubleshooting

### Frontend Issues
- **Port already in use**: Change port in `vite.config.js` or kill the process
- **Dependencies error**: Delete `node_modules` and run `npm install` again
- **Tests failing**: Ensure `jsdom` is installed and configured in `vite.config.js`

### Backend Issues
- **Database connection error**: Ensure the application has write permissions to create the SQLite database file
- **Port conflict**: Change port in `launchSettings.json`
- **Migration issues**: Delete the database file and run migrations again

---


## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Scalar API Documentation](https://github.com/scalar/scalar)
