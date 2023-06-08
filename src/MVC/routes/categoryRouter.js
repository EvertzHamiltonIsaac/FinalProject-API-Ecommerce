const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");

//Controllers
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/category.controller");
//Controllers

router.post("/category/createCategory", authMiddleware, createCategory);

router.put("/category/updateCategory/:id", authMiddleware, updateCategory);

router.delete("/category/deleteCategory/:id", authMiddleware, deleteCategory);

router.get("/category/getaCategory/:id", authMiddleware, getCategory);

router.get("/category/getAllCategories", authMiddleware, getAllCategories);

module.exports = router;
