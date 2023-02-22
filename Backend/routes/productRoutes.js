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

router.get("/", (req, res) => {
  product
    .find()
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ nobooksfound: "No product has been found" })
    );
});

router.get("/:id", (req, res) => {
  product
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ nobookfound: "No product has been found" })
    );
});

router.post("/", auth, (req, res) => {
  console.log(req.body);
  product
    .create(req.body)
    .then((product) => res.json({ msg: "product added" }))
    .catch((err) => {
      res.send(err.message);
      // res.status(400).json({ error: "Unable to add to database" });
    });
});

router.put("/:id", auth, (req, res) => {
  product
    .findByIdAndUpdate(req.params.id, req.body)
    .then((product) => res.json({ msg: "Updated" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.delete("/:id", auth, (req, res) => {
  product
    .findByIdAndRemove(req.params.id, req.body)
    .then((product) => res.json({ mgs: "product deleted" }))
    .catch((err) => res.status(404).json({ error: "No such product" }));
});

module.exports = router;
