require("dotenv").config();
const express = require("express");
const app = express();
const standardErrorHandler = require("./utility/StandardErrorHandler");
const port = process.env.PORT || 8080;

const connectDB = require("./config/database");

connectDB();

const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoute);
app.use("/", productRoute);

app.use(standardErrorHandler);

app.listen(port, () => {
  console.log(`...server running on port ${port}`);
});
