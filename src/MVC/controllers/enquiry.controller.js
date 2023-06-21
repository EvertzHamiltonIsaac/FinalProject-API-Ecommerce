const Enquiry = require("../models/enquiry.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.status(201).send(newEnquiry);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).send(updatedEnquiry);
  } catch (error) {
    res.status(304).send({ message: error.message });
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res
      .status(200)
      .send({ meessage: "Deleted successfully", data: { deletedEnquiry } });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const enquiry = await Enquiry.findById(id);

    res.status(302).send(enquiry);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const allEnquiry = await Enquiry.find();
    res.status(302).send(allEnquiry);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
  getAllEnquiry,
};
