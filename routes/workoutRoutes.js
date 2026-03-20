const express = require("express");
const workoutcontroller = require("../controllers/workoutController");
const {requireAuth} = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);
router
  .route("/")
  .get(workoutcontroller.workout_get)
  .post(workoutcontroller.workout_post);

router
  .route("/:id")
  .delete(workoutcontroller.workout_delete)
  .patch(workoutcontroller.workout_update);
module.exports = router;
