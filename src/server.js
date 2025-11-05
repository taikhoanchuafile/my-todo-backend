import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRoutes.js";
import connectDB from "./libs/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND]
        : ["http://localhost:5173"],
  })
);

//Xử lý
app.use("/api/tasks", taskRouter);

await connectDB();
app.listen(PORT, () => {
  console.log("Mở server thành công trên cổng 5000");
});
