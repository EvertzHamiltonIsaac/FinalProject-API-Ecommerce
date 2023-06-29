const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../../middlewares/uploadImages");

//? Product Controller
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadIMG.controller");

router.post(
  "/uploadImg",
  authMiddleware,
  isAdmin,
  uploadPhoto.any("images", 10),
  productImgResize,
  uploadImages
);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
