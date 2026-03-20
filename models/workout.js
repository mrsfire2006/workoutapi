const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    reps: {
      type: Number,
      required: [true, "repetitions is required"],
      min: [0, "repetitions must be greater than or 0"],
    },
    load: {
      type: Number,
      required: [true, "load is required"],
      min: [0, "load must be greater than or  0"],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Workout", workoutSchema);
