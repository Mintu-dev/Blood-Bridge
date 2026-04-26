import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:3000",
  "https://lifeconnect-frontend.onrender.com",  // 🔥 Apna frontend URL dalna
  process.env.FRONTEND_URL,  // Environment variable se bhi le sakte ho
].filter(Boolean);  // Null/undefined values hata dega

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check endpoint (Render ko chahiye)
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "LifeConnect API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1/user", userRoutes);

export { app };