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
} = require("../controllers/blog.category.controller");
//Controllers

router.post(
  "/blogCategory/createCategory",
  authMiddleware,
  isAdmin,
  createCategory
);

router.put(
  "/blogCategory/updateCategory/:id",
  authMiddleware,
  isAdmin,
  updateCategory
);

router.delete(
  "/blogCategory/deleteCategory/:id",
  authMiddleware,
  isAdmin,
  deleteCategory
);

router.get("/blogCategory/getaCategory/:id", authMiddleware, getCategory);

router.get("/blogCategory/getAllCategories", authMiddleware, getAllCategories);

module.exports = router;
