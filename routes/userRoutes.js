const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");




router.route("/login").post(userController.login_post);
router.route("/signup").post(userController.signup_post);

module.exports = router;
