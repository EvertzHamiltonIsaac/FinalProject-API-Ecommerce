const blogCategory = require("../models/blog.category.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");

//* Create Category ✅
const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newBlogCategory = await blogCategory.create(req.body);
    res.status(200).send({
      message: "Blog Category Created Succesfully",
      data: newBlogCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Update Category ✅
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  // console.log(id);
  try {
    const updatedBlogCategory = await blogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      message: "Blog Category Updated Succesfully",
      data: updatedBlogCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Delete Category ✅
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletedBlogCategory = await blogCategory.findByIdAndDelete(id);
    res.status(200).send({
      message: "Blog Category Deleted Succesfully",
      data: deletedBlogCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Get Category ✅
const getBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const gettedBlogCategory = await blogCategory.findById(id);
    res.status(200).send({
      message: "Blog Category Found",
      data: gettedBlogCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

//* Get All Categories ✅
const getAllBlogCategories = asyncHandler(async (req, res) => {
  try {
    const AllBlogCategories = await blogCategory.find();
    res.status(200).send({
      message: "succes",
      data: AllBlogCategories,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getAllBlogCategories,
};
