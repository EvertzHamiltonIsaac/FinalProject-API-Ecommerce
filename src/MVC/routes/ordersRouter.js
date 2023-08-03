const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
    getRecentOrders
  } = require("../controllers/orders.controller");
  
router.get("/order/get-recent-orders", authMiddleware, isAdmin,  getRecentOrders);

