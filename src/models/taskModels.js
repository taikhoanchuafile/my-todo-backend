import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // Tên công việc
    title: {
      type: String,
      required: [true, "Task phải có tiêu đề"],
      trim: true,
    },
    // mô tả
    description: {
      type: String,
      trim: true,
      default: "",
    },
    //Trạng thái
    status: {
      type: String,
      enun: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    //Ngày hết hạn
    dueDate: {
      type: Date,
      default: null,
    },
    // mức độ ưu tiên
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // // User tương ứng
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
