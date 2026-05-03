import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:3000",
  "https://lifeconnect-frontend.onrender.com",
  "https://life-connect-ozat.vercel.app",
  "https://life-connect-ozat-git-main-shreyansh-sharduls-projects.vercel.app",
  "https://www.lifeconnect.in",           // ✅ ADD THIS
  "https://lifeconnect.in",   
  process.env.FRONTEND_URL,
].filter(Boolean);

// ✅ CORS configuration (No app.options line needed)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie']
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "LifeConnect API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/user", userRoutes);

export { app };