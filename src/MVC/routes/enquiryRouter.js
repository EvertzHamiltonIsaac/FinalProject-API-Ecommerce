const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
  getAllEnquiry,
} = require("../controllers/enquiry.controller");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/enquiry/", getAllEnquiry);
router.get("/enquiry/:id", getEnquiryById);
router.post("/enquiry/", createEnquiry);
router.put("/enquiry/update/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/enquiry/delete/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
