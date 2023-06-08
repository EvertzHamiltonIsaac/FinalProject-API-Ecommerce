const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

//Controllers
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/producto.category.controller");
//Controllers

router.post(
  "/prodCategory/createCategory",
  authMiddleware,
  isAdmin,
  createCategory
);

router.put(
  "/prodCategory/updateCategory/:id",
  authMiddleware,
  isAdmin,
  updateCategory
);

router.delete(
  "/prodCategory/deleteCategory/:id",
  authMiddleware,
  isAdmin,
  deleteCategory
);

router.get("/prodCategory/getaCategory/:id", authMiddleware, getCategory);

router.get("/prodCategory/getAllCategories", authMiddleware, getAllCategories);

module.exports = router;
