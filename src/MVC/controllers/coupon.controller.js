const Coupon = require("../models/coupon.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

//* Create Coupon ✅
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).send({
      message: "Created new Coupon",
      data: newCoupon,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Get All Coupons ✅
const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(201).send({
      message: "All Coupons Founded",
      data: coupons,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Update Coupon ✅
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      message: "Coupons Updated Successfully",
      data: updatedCoupon,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Delete Coupon ✅
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).send({
      message: "Coupons Deleted Successfully",
      data: deleteCoupon,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };
