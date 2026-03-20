const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { handleUserError } = require("../validator/handleUserError");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);

userSchema.statics.signup = async function (email, password) {
  try {
    const user = await this.create({ email: email, password: password });

    if (user) {
      return user;
    } else {
      throw { message: "not create" };
    }
  } catch (err) {
    const errors = handleUserError(err);
    throw errors;
  }
};
userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email: email });

    if (!user) {
      throw { message: "email not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw { message: "email or password is wrong" };
    }
  } catch (err) {
    const errors = handleUserError(err);
    throw errors;
  }
};

userSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = mongoose.model("User", userSchema);
