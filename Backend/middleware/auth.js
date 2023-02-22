const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("authorization");
  console.log({ token });
  if (!token) {
    return res.status(401).json({ msg: "Please login to proceed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.send(err.name + err.message);

    // res.status(500).json({ msg: "Auth middleware server error" });
  }
};
