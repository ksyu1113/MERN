const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const sendingOut = require("../utility/sendEmail");
const Token = require("../models/resetPasswordModel");
const crypto = require("crypto");
const { token } = require("../models/resetPasswordModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
  try {
    let {
      username,
      password,
      email,
      contactNo,
      firstName,
      lastName,
      gender,
      DOB,
    } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "registration fail, username already exists" });
    }
    user = new User({
      username,
      password,
      email,
      contactNo,
      firstName,
      lastName,
      gender,
      DOB,
    });

    const token = await user.generateAuthToken();
    this.password = await user.generateBcrypt();
    await user.save();

    return res.json({ message: "registration success", user });
  } catch (err) {
    return res.status(500).json({ message: "server error when registeration" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "on99 invalid username" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "on99 invalid password" });
    } else {
      return res.json({ message: "login success", user });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error when logging in" });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
    if (!token)
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        createdAt: Date.now(),
      }).save();

    const link = `${process.env.BASE_URL}/user/resetPassword/${user._id}/${token.token}`;
    await sendingOut(user.email, link);
    return res.json({ message: "email has been sent" });
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/resetPassword/:userId/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({ message: "invalid or expired link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token)
      return res.status(400).json({ message: "invalid or expired link" });

    user.password = req.body.password;
    await user.save();
    await token.delete();
    return res.json({ message: "reset password success" });
  } catch (error) {
    return res.status(500).json({ message: "reset password error" });
  }
});

router.get("/getAllInfo", async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "server error when getting users information" });
  }
});

router.get("/getOneInfo", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //exclude password
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error when getting user information" });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // req.user.tokens = req.user.tokens.filter(
    //   (token) => token.token !== req.token,

    // await req.user.save();

    res.status(200).json({ message: "logout success" });
  } catch (error) {
    res.status(500).json({ message: "server error when logging out" });
  }
});

router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: "All users has been logged out" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
