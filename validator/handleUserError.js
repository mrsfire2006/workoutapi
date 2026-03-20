const handleUserError = (error) => {
  let userErrorMsg = { email: "", password: "" };
  if (error.message && !error.errors && !error.code) {
    return error;
  }
   if (error.code === 11000) {
    userErrorMsg.email = "email is already exist";
    return userErrorMsg;
  }
  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach((err) => {
      userErrorMsg[err.path] = err.message;
    });
  }

  return userErrorMsg;
};

module.exports = {
  handleUserError,
};
