const express = require("express");
const router = express.Router();

//? Product Controller
const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct} = require("../controllers/product.controller");

router.post('/product', createProduct);

router.get("/product/:id", getProductById);
router.get("/product", getAllProducts);

router.put("/product/update/:id", updateProduct);

router.delete("/product/delete/:id", deleteProduct);


module.exports = router;
