const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

//! Controllers
const {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategory,
  getProductAllCategories,
} = require("../controllers/producto.category.controller");
//! Controllers

router.post(
  "/prodCategory/createCategory",
  authMiddleware,
  isAdmin,
  createProductCategory
);

router.put(
  "/prodCategory/updateCategory/:id",
  authMiddleware,
  isAdmin,
  updateProductCategory
);

router.delete(
  "/prodCategory/deleteCategory/:id",
  authMiddleware,
  isAdmin,
  deleteProductCategory
);

router.get("/prodCategory/getaCategory/:id", authMiddleware, getProductCategory);

router.get("/prodCategory/getAllCategories", authMiddleware, getProductAllCategories);

module.exports = router;
