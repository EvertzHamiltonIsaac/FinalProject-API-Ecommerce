const express = require("express");
const router = express.Router();

//? Product Controller
const { createProduct, getProduct} = require("../controllers/product.controller");

router.post('/product', createProduct)
router.get("/product/:id", getProduct)

module.exports = router;
