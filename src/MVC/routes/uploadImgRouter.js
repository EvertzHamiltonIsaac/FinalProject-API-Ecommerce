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
  "/UpIMG/uploadImg",
  authMiddleware,
  isAdmin,
  uploadPhoto.any("images", 10),
  productImgResize,
  uploadImages
);
router.delete("/UpIMG/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
