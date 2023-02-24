const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("authorization");

  // console.log(JSON.stringify(token));     <<<<<import debug milestone
  if (!token) {
    return res.status(401).json({ msg: "Please login to proceed" });
  }
  try {
    const splitToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
    // console.log(JSON.stringify(decoded));
    const foundUser = await User.findOne({
      _id: decoded.id,
      token: token, //<<<<<import debug milestone
    });

    if (!foundUser) {
      throw new Error();
    }
    req.token = token;
    req.user = foundUser;
    next();
  } catch (err) {
    res.send(
      "the error name is ..." +
        err.name +
        ". the error message is ..." +
        err.message
    );
    // res.status(500).json({ message: "Auth middleware server error"});
  }
};
