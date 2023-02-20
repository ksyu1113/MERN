const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 10;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 50,
    require: [true, "please enter at least 8 characters"],
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 255,
    require: true,
  },
  contactNo: {
    type: Number,
    minlength: 8,
    maxlength: 20,
    require: true,
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    require: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    require: true,
  },
  gender: {
    type: String,
    enum: ["M", "F", "m", "f"],
    require: [true, "please enter M or F"],
  },
  DOB: {
    type: Date,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model("User", userSchema);
