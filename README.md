# Bug Tracker - Testing and Debugging MERN Application

A full-stack MERN (MongoDB, Express, React, Node.js) bug tracking application with comprehensive testing and debugging implementation.

## 🎯 Project Overview

This project demonstrates professional testing practices and debugging techniques for MERN stack applications. It includes a fully functional bug tracker with complete test coverage on both frontend and backend.

## ✨ Features

- Create, Read, Update, and Delete (CRUD) bug reports
- Bug status management (Open, In Progress, Resolved)
- Priority levels (Low, Medium, High, Critical)
- Real-time UI updates
- Comprehensive error handling
- Full test coverage with unit and integration tests

## 🏗️ Project Structure
```
testing-and-debugging-ensuring-mern-app-reliability/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── BugForm.jsx
│   │   │   ├── BugList.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── __tests__/           # Component tests
│   │   │       ├── BugForm.test.jsx
│   │   │       └── BugList.test.jsx
│   │   ├── services/                # API service layer
│   │   │   ├── bugService.js
│   │   │   └── __tests__/
│   │   │       └── bugService.test.js
│   │   ├── test/                    # Test configuration
│   │   │   └── setup.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js               # Vite + Vitest config
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   └── server.js                # Express app setup
│   ├── controllers/
│   │   └── bugController.js         # Business logic
│   ├── models/
│   │   └── Bug.js                   # Mongoose model
│   ├── routes/
│   │   └── bugRoutes.js             # API routes
│   ├── __tests__/
│   │   └── bugController.test.js    # API integration tests
│   ├── jest.config.js               # Jest configuration
│   └── package.json
│
├── DEBUGGING_REPORT.md              # Detailed debugging documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd testing-and-debugging-ensuring-mern-app-reliability-Alameen-85
```

2. **Install server dependencies**
```bash
   cd server
   npm install
```

3. **Install client dependencies**
```bash
   cd ../client
   npm install
```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` folder:
```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
```

### Running the Application

1. **Start the backend server**
```bash
   cd server
   npm start
   # or for development with auto-reload
   npm run dev
```
   Server runs on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
```bash
   cd client
   npm run dev
```
   Client runs on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 🧪 Testing

### Frontend Tests (Vitest + React Testing Library)
```bash
cd client
npm test                    # Run tests in watch mode
npm run test:ui            # Run tests with UI
```

**Test Coverage:**
- ✅ BugForm Component (6 tests)
  - Form rendering
  - Initial data display
  - Form submission
  - Cancel functionality
  - User input handling

- ✅ BugList Component (10 tests)
  - Empty state display
  - Bug list rendering
  - Priority and status badges
  - Edit/Delete functionality
  - Status change handling

- ✅ bugService API (2 tests)
  - GET requests
  - POST requests

**Total Frontend Tests: 18 passing**

### Backend Tests (Jest + Supertest)
```bash
cd server
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
```

**Test Coverage:**
- ✅ POST /api/bugs - Create bug
- ✅ GET /api/bugs - Retrieve all bugs
- ✅ PUT /api/bugs/:id - Update bug
- ✅ DELETE /api/bugs/:id - Delete bug
- ✅ Validation tests
- ✅ Error handling tests

**All Backend Tests: Passing**

## 🐛 Debugging Features

### Error Handling
- **Error Boundary**: Catches React component errors
- **API Error Handling**: Comprehensive try-catch blocks
- **Validation**: Input validation on both client and server
- **User-Friendly Messages**: Clear error messages for users

### Debugging Tools Used
- Chrome DevTools
- VS Code Debugger
- Console logging
- Network tab inspection
- React Developer Tools

## 📚 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Vitest (Testing)
- React Testing Library
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Jest (Testing)
- Supertest (API Testing)
- MongoDB Memory Server (Test Database)

## 🔧 Issues Resolved

See [DEBUGGING_REPORT.md](./DEBUGGING_REPORT.md) for detailed information about issues encountered and solutions implemented.

### Key Issues Fixed:
1. CSS configuration with duplicate Tailwind files
2. MongoDB Atlas IP whitelisting
3. Form accessibility for testing
4. Test environment configuration
5. Server export for testing

## 📊 Test Results

### Frontend
```
Test Files  3 passed (3)
Tests      18 passed (18)
```

### Backend
```
Test Suites: 1 passed
Tests:       Multiple passed (CREATE, READ, UPDATE, DELETE operations)
```

## 👤 Author

**Mohammed Adamu**

## 📝 License

This project is part of a MERN stack testing and debugging assignment.

## 🙏 Acknowledgments

- PLP Academy for the assignment structure
- React Testing Library documentation
- Jest and Supertest communities
- My course facilitator Mr Dedan

---

**Note**: This application demonstrates best practices in testing and debugging MERN stack applications, including comprehensive test coverage, error handling, and proper project structure.