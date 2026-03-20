const handleError = (error) => {
  let workoutErrorMsg = { title: "", reps: "", load: "", user_id: "" };

  if (error.name === "CastError") {
    return `Cast to ${error.kind} failed for value ${error.value} (type string)`;
  }

  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach((err) => {
      workoutErrorMsg[err.path] = err.message;
    });
  }

  return workoutErrorMsg;
};

module.exports = {
  handleError,
};
