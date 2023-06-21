const Enquiry = require("../models/enquiry.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.status(201).send({ message: "Created New Enquiry", data: newEnquiry });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(202)
      .send({ message: "Enquiry Updated Successfully", data: updatedEnquiry });
  } catch (error) {
    res.status(304).send({ status: 304, message: error.message });
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.status(200).send({
      meessage: "Enquiry Deleted Successfully",
      data: { deletedEnquiry },
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const enquiry = await Enquiry.findById(id);

    res.status(302).send({ message: "Enquiry Fuounded", data: enquiry });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const allEnquiry = await Enquiry.find();
    res
      .status(302)
      .send({ message: "All Enquiries Fuounded", data: allEnquiry });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
  getAllEnquiry,
};
