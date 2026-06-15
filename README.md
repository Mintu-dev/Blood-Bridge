# 🩸 BloodBridge

BloodBridge is a full-stack blood donation platform that connects blood donors with people in need. Users can register as donors, search for donors by blood group and location, manage their profile, and chat directly with matched donors in real time.

## Live Demo

- *Frontend:* https://blood-bridge-donor.vercel.app
- *Backend API:* https://blood-bridge-uo9o.onrender.com

## Features

- User registration and login with JWT-based authentication (access & refresh tokens)
- Browse and search blood donors by blood group
- Donor profile management (full name, bio, date of birth, gender, etc.)
- Real-time chat between users using Socket.IO
- Change password and profile editing
- Secure cookie-based session handling across domains
- Responsive UI built with React and Material UI

## Tech Stack

*Frontend*
- React (Create React App)
- Material UI (MUI)
- Axios
- React Router
- Socket.IO Client
- AOS (Animate on Scroll)

*Backend*
- Node.js & Express
- MongoDB & Mongoose
- Socket.IO
- JWT for authentication
- bcrypt for password hashing
- CORS configured for cross-origin requests

*Deployment*
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure


BloodBridge/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── .env.example
│   └── package.json
└── README.md


## Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or v20)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

bash
cd backend
npm install


Create a .env file in backend/ with:


DB_CONNECTION=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
NODE_ENV=development


Run the backend:

bash
npm start


### Frontend Setup

bash
cd frontend
npm install


Create a .env file in frontend/ with:


REACT_APP_BACKEND=http://localhost:8000


Run the frontend:

bash
npm start


## Deployment Notes

- The frontend is deployed on Vercel with frontend set as the root directory.
- The backend is deployed on Render with backend set as the root directory.
- FRONTEND_URL (Render) and REACT_APP_BACKEND (Vercel) must match the actual deployed URLs for CORS and API calls to work correctly.
- NODE_ENV=production must be set on Render so authentication cookies use secure: true and sameSite: "none", which is required for cross-domain cookies between Vercel and Render.
- MongoDB Atlas Network Access must allow connections from 0.0.0.0/0 (or Render's IPs) for the database connection to succeed.

## License

This project is open source and available for educational purposes.
