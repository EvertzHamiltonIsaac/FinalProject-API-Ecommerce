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
} = require("../controllers/product.controller");

router.get("/product", getAllProducts);
router.post("/product", authMiddleware, isAdmin,  createProduct);

router.get("/product/:id", getProductById);
router.put("/product/update/:id", authMiddleware, isAdmin,  updateProduct);
router.delete("/product/delete/:id", authMiddleware, isAdmin,  deleteProduct);

module.exports = router;
