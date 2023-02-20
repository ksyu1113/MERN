const express = require("express");
const standardErrorHandler = require("./utility/StandardErrorHandler");
const app = express();
const port = 8080;

app.get("/", async (req, res, next) => {
  try {
    const name = user.name;
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

app.use(standardErrorHandler);

app.listen(port, () => {
  console.log(`...server running on port ${port}`);
});
