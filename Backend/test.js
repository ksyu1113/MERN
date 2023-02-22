// const crypto = require("crypto");

// const resetToken = crypto.randomBytes(20);
// console.log(resetToken);

// const resetTokenA = crypto.randomBytes(20).toString("hex");
// console.log(resetTokenA);

// const getGradeTest = (passGrade, failGrade) => (average) => (testScore) =>
//   testScore >= average ? passGrade : failGrade;

// const passFaillTest = getGradeTest("Pass", "Fail")(0.2);

// console.log(passFaillTest(0.19));
// console.log(passFaillTest(0.39));
// console.log(passFaillTest(0.5));
// console.log(passFaillTest(0.1));
// console.log(passFaillTest(0.8));

// const exercise1 = (Jingle) => (Bells) => (Batman) =>
// Array.push()

// var port = 8081;

// //新方法
// let express = require('express');
// let app     = express();
// let router = express.Router();

// router.get("/", function (req, res) {
//   res.send("home page!");
// });

// router.get("/about", function (req, res) {
//   res.send("about page!");
// });

// app.use("/basic", router);

// router.get("/food", function (req, res) {
//   res.send("food page!");
// });

// router.get("/location", function (req, res) {
//   res.send("location page!");
// });

// app.use("/attraction", router);

// app.listen(port, () => {
//   console.log(`server running on port${port}`);
// });
//==============================================
// function add(a, b) {
//   return a + b;
// }

// let add = (a, b) => {
//   return a + b;
// };


//==============================================
// function add1(a) {
//   return function add2(b) {
//     return a + b;
//   };
// }


// let add1 = (a) => (b) => {
//   return a + b;
// };

// let sum = add(1, 2);

// let sum1 = add1(1);
// let sum2 = sum1(2);

// let sum3 = add1(1)(2);

// console.log(sum);
// console.log(sum2);
// console.log(sum3);

