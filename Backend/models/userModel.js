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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  let payload = {
    id: this._id,
    username: this.username,
    email: this.email,
    contactNo: this.contactNo,
    firstName: this.firstName,
    lastName: this.lastName,
    gender: this.gender,
    DOB: this.DOB,
    tokens: this.tokens,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  user.tokens = user.tokens.concat({ token });

  return token;
};

userSchema.methods.generateBcrypt = async function () {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(user.password, salt);
  return hashValue;
};

userSchema.methods.comparePassword = async function (password) {
  const comparedPassword = await bcrypt.compare(password, this.password);
  if (comparedPassword) {
    return comparedPassword;
  } else {
    return null;
  }
};

module.exports = mongoose.model("User", userSchema);
