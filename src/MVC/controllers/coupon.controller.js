const Coupon = require("../models/coupon.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoId");

const createCoupon = asyncHandler( async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).send(newCoupon);
  } catch (error) { res.status(400).send({error: error.message}); }
});

const getAllCoupon = asyncHandler( async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(201).send(coupons);
  } catch (error) { res.status(400).send({error: error.message}); }
});

const updateCoupon = asyncHandler( async (req, res) => {

  const {id} = req.params;
  validateMongoDbId(id);

  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new: true});
    res.status(201).send(updateCoupon);
  } catch (error) { res.status(400).send({error: error.message}); }
});

const deleteCoupon = asyncHandler( async (req, res) => {

  const {id} = req.params;
  validateMongoDbId(id);

  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.status(201).send(deleteCoupon);
  } catch (error) { res.status(400).send({error: error.message}); }
});

// const getCouponById = asyncHandler( async (req, res) => {
//   const {id} = req.params;
//   validateMongoDbId(id);

//   try {
//     const coupons = await Coupon.find();
//     res.status(201).send(coupons);
//   } catch (error) { res.status(400).send({error: error.message}); }
// });


module.exports = {createCoupon, getAllCoupon, updateCoupon, deleteCoupon};
