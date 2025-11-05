import Task from "../models/taskModels.js";

export const getAllTask = async (req, res) => {
  try {
    const { status = "", priority = "", page = 1, limit = 5 } = req.query;

    let filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const skip = (page - 1) * limit;

    // const tasks = await Task.find().sort({ createdAt: -1 });
    const tasksData = await Task.aggregate([
      { $match: filters },
      {
        $facet: {
          tasks: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
          ],
          total: [{ $count: "count" }],
        },
      },
    ]);

    res.status(200).json({
      tasks: tasksData[0]?.tasks || [],
      total: tasksData[0]?.total[0]?.count || 0,
    });
  } catch (error) {
    console.error("Lỗi khi getAllTask", error);
    res.status(500).json({ message: "Lỗi hệ thống server" });
  }
};
export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    if (!newTask) {
      return res.status(404).json({ message: "Lỗi tạo mới từ client" });
    }
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi creatTask", error);
    res.status(500).json({ message: "Lỗi hệ thống server" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateTask) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy Task cần cập nhật" });
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Lỗi khi updateTask", error);
    res.status(500).json({ message: "Lỗi hệ thống server" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Không tìm thấy Task cần xóa" });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.error("Lỗi khi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống server" });
  }
};
