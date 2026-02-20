import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";

app.use(
  cors({
    origin: "http://localhost:5173", // 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user" , userRoutes);


export {app}