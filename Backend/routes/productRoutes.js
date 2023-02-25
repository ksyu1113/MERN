const express = require("express");
const app = express();
const router = express.Router();
const product = require("../models/productModel");
const auth = require("../middleware/auth");

router.get("/test", (req, res) => {
  try {
    console.log("product route testing");
  } catch (e) {
    console.log(e);
  }
});

router.get("/getall", (req, res) => {
  product
    .find()
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ nobooksfound: "No product has been found" })
    );
});

router.get("/getone/:id", (req, res) => {
  product
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ nobookfound: "No product has been found" })
    );
});

router.post("/create", auth, async (req, res) => {
  try {
    let { productName, description, category, price, condition } = req.body;
    let newProduct = new product({
      productName,
      description,
      category,
      price,
      condition,
    });
    let savedProduct = await newProduct.save();
    return res.json(savedProduct);
  } catch (e) {
    return res.json(e.name + e.message);
  }

  // product
  //   .save(req.body)
  //   .then((product) => res.json(product))
  //   .catch((err) => {
  //     res.send(err.message);
  //     // res.status(400).json({ error: "Unable to add to database" });
  //   });
});

router.put("/update/:id", auth, (req, res) => {
  product
    .findByIdAndUpdate(req.params.id, req.body)
    .then((product) => res.json({ msg: "Updated" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.delete("/delete/:id", auth, (req, res) => {
  product
    .findByIdAndRemove(req.params.id, req.body)
    .then((product) => res.json({ mgs: "product deleted" }))
    .catch((err) => res.status(404).json({ error: "No such product" }));
});

module.exports = router;
