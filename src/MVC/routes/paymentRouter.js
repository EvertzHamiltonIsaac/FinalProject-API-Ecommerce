const express = require("express");
const router = express.Router();
const {checkout, paymentVerification} = require("../controllers/payment.controller");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification)

module.exports = router;