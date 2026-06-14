import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8001",
  process.env.FRONTEND_URL,
].filter(Boolean);

//  CORS configuration (No app.options line needed)
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//  Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "BloodBridge API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/user", userRoutes);

export { app };
