const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("authorization");
  const splitToken = req.headers.authorization.split(" ")[1];
  // console.log(JSON.stringify(token));     <<<<<import debug milestone
  if (!token) {
    return res.status(401).json({ msg: "Please login to proceed" });
  }
  try {
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
    console.log(JSON.stringify(decoded));
    const user = await User.findOne({
      _id: decoded.id,
      token: token,      //<<<<<import debug milestone
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    console.log({ msg: "Auth middleware server error" });
  }
};
