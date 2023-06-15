const Color = require("../models/color.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.status(201).send(newColor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).send(updatedColor);
  } catch (error) {
    res.status(304).send({ message: error.message });
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res
      .status(200)
      .send({ meessage: "Deleted successfully", data: { deletedColor } });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getColorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const Color = await Color.findById(id);

    res.status(302).send(Color);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

const getAllColor = asyncHandler(async (req, res) => {
  try {
    const allColor = await Color.find();
    res.status(302).send(allColor);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColorById,
  getAllColor,
};
