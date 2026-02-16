import {app} from "./app.js"
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;


  
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