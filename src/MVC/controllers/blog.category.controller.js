const blogCategory = require("../models/blog.category.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");

//* Create Category ✅
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await blogCategory.create(req.body);
    res.status(200).send({
      message: "Blog Category Created Succesfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Update Category ✅
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  console.log(id);
  try {
    const updatedCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      message: "Blog Category Updated Succesfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Delete Category ✅
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletedCategory = await blogCategory.findByIdAndDelete(id);
    res.status(200).send({
      message: "Blog Category Deleted Succesfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Get Category ✅
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getaCategory = await blogCategory.findById(id);
    res.status(200).send({
      message: "Blog Category Found",
      data: getaCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Get All Categories ✅
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await blogCategory.find();
    res.status(200).send({
      message: "succes",
      data: getallCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
