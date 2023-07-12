const express = require('express');
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon.controller');
const { authMiddleware, isAdmin } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post("/coupon/create", authMiddleware, isAdmin, createCoupon);
router.get("/coupon", authMiddleware, isAdmin, getAllCoupon);
router.put("/coupon/update/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/coupon/delete/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;