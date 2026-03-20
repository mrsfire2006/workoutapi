require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes"); // لاحظ حذف الـ .. لأننا في نفس المجلد
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// إعدادات الـ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // يمكنك تحديد رابط الـ Frontend هنا لاحقاً للأمان


mongoose.connect(process.env.MONG_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));
// الاتصال بـ MongoDB
// mongoose.connect(process.env.MONG_URI)
//   .then(() => {
//     // تشغيل السيرفر فقط بعد نجاح الاتصال بالقاعدة
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT} and connected to DB`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//   });

// تعريف المسارات مباشرة (بدون تعقيدات Netlify)
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Workout API" });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
module.exports = app;