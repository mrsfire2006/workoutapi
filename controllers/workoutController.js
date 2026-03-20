const workout = require("../models/workout");
const { handleError } = require("../validator/handleError");

const workout_get = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await workout.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
  }
};
// const workoutTitle_get = async (req, res) => {
//   const title = req.params.title;

//   try {
//     const workout = await WorkOut.findOne({ title });
//     if (workout) {
//       return res.status(200).json(workout);
//     }
//     return res.sendStatus(404);
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// };
const workout_post = async (req, res) => {
  const workout = req.body;

  try {
    const id = req.user._id;

    const newWorkout = await WorkOut.create({
      title: workout.title,
      reps: workout.reps,
      load: workout.load,
      user_id: id,
    });

    if (newWorkout) {
      res.status(200).json(newWorkout);
    } else {
      res.status(400).json("not created");
    }
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};
const workout_delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await workout.findByIdAndDelete(id);
    if (result) {
      return res.status(200).json(result);
    }
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(500);
  }
};
const workout_update = async (req, res) => {
  const id = req.params.id;

  const data = req.body;
  console.log(data);
  try {
    const result = await workout.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json(result);
  } catch (error) {
    const errors = handleError(error);
    return res.status(500).json(errors);
  }
};

module.exports = {
  workout_get,
  workout_post,
  workout_delete,
  workout_update,
};
