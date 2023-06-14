const Category = require("../models/producto.category.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updatedCategory = await Category.findOneandUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletedCategory = await Category.findOneAndDelete(id);
    res.status(200).send(deletedCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.status(200).send(getaCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.status(200).send(getallCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
