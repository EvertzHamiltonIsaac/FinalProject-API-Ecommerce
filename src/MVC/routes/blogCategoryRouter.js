const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

//Controllers
const {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getAllBlogCategories,
} = require("../controllers/blog.category.controller");
//Controllers

router.post(
  "/blogCategory/createCategory",
  authMiddleware,
  isAdmin,
  createBlogCategory
);

router.put(
  "/blogCategory/updateCategory/:id",
  authMiddleware,
  isAdmin,
  updateBlogCategory
);

router.delete(
  "/blogCategory/deleteCategory/:id",
  authMiddleware,
  isAdmin,
  deleteBlogCategory
);

router.get("/blogCategory/getaCategory/:id", authMiddleware, getBlogCategory);

router.get("/blogCategory/getAllCategories", authMiddleware, getAllBlogCategories);

module.exports = router;
