const User = require("../models/user"); // غيرنا الحرف الأول لـ U كبيرة لتمييز الموديل
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createToken = (_id) => {
  // تأكد أن اسم المتغير في الـ .env هو secretKey بنفس الحروف
  return jwt.sign({ _id }, process.env.secretKey, {
    expiresIn: "60m",
  });
};

const login_post = async (req, res) => {
  const { email, password } = req.body; // طريقة أنظف لاستخراج البيانات

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email not valid" });
  }

  try {
    const userAccount = await User.login(email, password); // تغيير اسم المتغير لعدم التداخل
    const token = createToken(userAccount._id);
    return res.status(200).json({ email: userAccount.email, token });
  } catch (err) {
    // إرسال رسالة الخطأ بوضوح للـ Frontend
    return res.status(400).json({ error: err.message });
  }
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email not valid" });
  }

  try {
    const newUser = await User.signup(email, password); // تغيير اسم المتغير
    const token = createToken(newUser._id);
    return res.status(200).json({ email: newUser.email, token });
  } catch (err) {
    // تأكدنا هنا من استخدام err.message وليس error.message
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  login_post,
  signup_post,
};