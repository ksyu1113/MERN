const standardErrorHandler = (error, req, res, next) => {
  console.log("...StandardErrorHandler connected");
  console.log("..." + error.name);
  console.log("..." + error.message);
  res.status(500).send(
    `<p>You have reached standard error handler</p> 
      <p>${error.name}</p> 
      <p>${error.message}</p>`
  );
};

module.exports = standardErrorHandler;
