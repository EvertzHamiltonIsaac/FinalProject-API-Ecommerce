const Category = require("../models/producto.category.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");


const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res
      .status(200)
      .send({ message: "Created New Product Category", data: newCategory });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .send({ message: "Updated Product Category", data: updatedCategory });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Deleted Product Category", data: deletedCategory });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getaCategory = await Category.findById(id);
    res
      .status(200)
      .send({ message: "Product Category Founded", data: getaCategory });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.status(200).send({
      message: "All Product Categories Founded",
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
