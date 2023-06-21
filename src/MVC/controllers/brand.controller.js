const Brand = require("../models/brand.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

//* Create Brand ✅
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).send({
      message: "Created new Brand",
      data: newBrand,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//* Create Brand ✅
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).send({
      message: "Brand Updated Successfully",
      data: updatedBrand,
    });
  } catch (error) {
    res.status(304).send({ status: 304, message: error.message });
  }
});

//* Delete Brand ✅
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res
      .status(200)
      .send({ meessage: "Deleted successfully", data: deletedBrand});
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Get Brand By Id ✅
const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const brand = await Brand.findById(id);

    res.status(302).send({
      message: "Brand Found",
      data: brand,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Get All Brands ✅
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const allbrand = await Brand.find();
    res.status(302).send({
      message: "All Brands Founded",
      data: allbrand,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrand,
};
