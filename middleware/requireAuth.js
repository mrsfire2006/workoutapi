require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ erorr: "unAuthorize" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.secretKey);
    const user = await User.findById(_id).select("_id");
    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
module.exports = {
  requireAuth,
};
