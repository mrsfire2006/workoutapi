const express = require("express");
const workoutcontroller = require("../controllers/workoutController");
const {requireAuth} = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);
router
  .route("/")
  .get(workoutcontroller.worktout_get)
  .post(workoutcontroller.worktout_post);

router.route("/:title").get(workoutcontroller.worktoutTitle_get);
router
  .route("/:id")
  .delete(workoutcontroller.worktout_delete)
  .patch(workoutcontroller.worktout_update);
module.exports = router;
