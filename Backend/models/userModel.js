const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
