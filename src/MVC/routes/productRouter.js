const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

//? Product Controller
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  ratingProduct,
} = require("../controllers/product.controller");

router.get("/product", getAllProducts);

router.post("/product/create", authMiddleware, isAdmin, createProduct);
router.put("/product/rating", authMiddleware, ratingProduct);

router.get("/product/:id", getProductById);
router.put("/product/update/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/product/delete/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
