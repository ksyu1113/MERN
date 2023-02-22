const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/user/register", async (req, res) => {
  try {
    let { username, password, email, contactNo, firstName, lastName, DOB } =
      req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "username already exists" });
    }
    user = new User({
      username,
      password,
      email,
      contactNo,
      firstName,
      lastName,
      DOB,
    });

    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(password, salt);
    this.password = hashValue;
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1day" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    return res.send(user);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    return res.status(500).json(" server error when registeration");
  }
});

router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "on99 invalid username" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "on99 invalid password" });
    } else {
      
      return res.json({ msg: "login success" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1day" },
      (err, token) => {
        if (err) throw err;
        res.json({ json });
      }
    );


  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    return res.status(500).send("server error when logging in");
  }
});

router.get("/user/info", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //exclude password
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error when getting user information" });
  }
});

router.get("/user/logout", auth, async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error when logging out" });
  }
});

module.exports = router;
