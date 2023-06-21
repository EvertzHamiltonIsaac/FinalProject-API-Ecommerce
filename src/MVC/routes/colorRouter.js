const express = require("express");
const router = express.Router();
const {
  createColor,
  updateColor,
  deleteColor,
  getColorById,
  getAllColor,
} = require("../controllers/color.controller");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/color/", getAllColor);
router.get("/color/:id", getColorById);
router.post("/color/", authMiddleware, isAdmin, createColor);
router.put("/color/:id", authMiddleware, isAdmin, updateColor);
router.delete("/color/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
