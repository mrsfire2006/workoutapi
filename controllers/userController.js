const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.secretKey, {
    expiresIn: "60m",
  });
};

const login_post = async (req, res) => {
  const u = req.body;
  if (!validator.isEmail(u.email)) {
    return res.status(400).json({ email: "email not valid", password: "" });
  }
  try {
    const user = await User.login(u.email, u.password);

    if (user) {
      const token = createToken(user._id);

      return res.status(200).json({ email: user.email, token });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
const signup_post = async (req, res) => {
  const u = req.body;
  if (!validator.isEmail(u.email)) {
    return res.status(400).json({ email: "email not valid", password: "" });
  }
  try {
    const user = await User.signup(u.email, u.password);
    if (user) {
      const token = createToken(user._id);
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   maxAge: 5 * 1000 * 60 * 60,
      // });
      return res.status(200).json({ email: user.email, token });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  login_post,
  signup_post,
};
