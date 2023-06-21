const Color = require("../models/color.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.status(201).send({
      message: "Created new Color",
      data: [...newColor],
    });
  } catch (error) {
    res.status(400).send({ status: 404, message: error.message });
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).send({
      message: "Color Updated Successfully",
      data: [...updateColor],
    });
  } catch (error) {
    res.status(304).send({ status: 304, message: error.message });
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res
      .status(200)
      .send({ meessage: "Color Deleted Successfully", data: { deletedColor } });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

const getColorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const color = await Color.findById(id);

    res.status(302).send({
      message: "Color Found",
      data: [...color],
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

const getAllColor = asyncHandler(async (req, res) => {
  try {
    const allColor = await Color.find();
    res.status(302).send({
      message: "All Colors Founded",
      data: [...allColor],
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColorById,
  getAllColor,
};
