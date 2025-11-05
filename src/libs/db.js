import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTIONSTRING
    );
    console.log("Kết mối CSDL thành công");
  } catch (error) {
    console.error("Lỗi kết nối CSDL", error);
    process.exit(1);
  }
};

export default connectDB;
