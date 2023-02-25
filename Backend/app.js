require("dotenv").config();
const express = require("express");
const app = express();
const standardErrorHandler = require("./utility/StandardErrorHandler");
const port = process.env.PORT || 8080;

const connectDB = require("./config/database");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes");

app.use("/user", userRoute);
app.use("/product", productRoute);

app.use(standardErrorHandler);

app.get("*", (req, res) => {
  res.status(404).send("Error 404 the page you are looking for doesn't exist");
});

app.listen(port, () => {
  console.log(`...server running on port ${port}`);
});
