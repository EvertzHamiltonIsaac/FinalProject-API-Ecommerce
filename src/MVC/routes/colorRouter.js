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
router.post("/color/create", authMiddleware, isAdmin, createColor);
router.put("/color/update/:id", authMiddleware, isAdmin, updateColor);
router.delete("/color/delete/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
