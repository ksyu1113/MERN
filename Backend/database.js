const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/mern2DB")
    .then(() => {
      console.log("...MongoDB connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDatabase;
