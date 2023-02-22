const mongoose = require("mongoose");
const config = require("config");
const database = config.get("mongoURI");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("...MongoDB connected");
  } catch (err) {
    console.log(err.message);
    // process.exit(1);
  }
};

module.exports = connectDB; //same with to variable name
