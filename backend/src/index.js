import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;

// JSON parsing middleware
app.use(express.json());
  
console.log("DB URI:", process.env.DB_CONNECTION);
(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("✅ DB connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.log("❌ Server Error:", error);
    });

  } catch (error) {
    console.log("❌ DB Connection Error:", error);
  }
})();