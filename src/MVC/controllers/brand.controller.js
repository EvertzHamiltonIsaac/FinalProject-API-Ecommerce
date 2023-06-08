const Brand = require("../models/brand.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createBrand = asyncHandler( async (req, res) => {
  try {

    const newBrand = await Brand.create(req.body);
    res.status(201).send(newBrand);

  } catch (error) {
    res.status(400).send({message: error.message});
  }

});

const updateBrand = asyncHandler( async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true});
    res.status(202).send(updatedBrand);
  } catch (error) {
    res.status(304).send({message: error.message});
  }
});

const deleteBrand = asyncHandler( async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {

    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(200).send({meessage: 'Deleted successfully', data: {deletedBrand}});

  } catch (error) {
    res.status(400).send({message: error.message});
  }
});

const getBrandById = asyncHandler( async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const brand = await Brand.findById(id);
    
    res.status(302).send(brand);

  } catch (error) {

    res.status(404).send({message: error.message});
    
  }
});

const getAllBrand = asyncHandler( async (req, res) => {
  try {
    const allbrand = await Brand.find();
    res.status(302).send(allbrand);
  } catch (error) {
    res.status(404).send({message: error.message});
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrand
}