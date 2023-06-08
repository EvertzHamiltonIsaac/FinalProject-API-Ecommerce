const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../../middlewares/uploadImages");

//? Product Controller
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  ratingProduct,
  uploadImages
} = require("../controllers/product.controller");


router.get("/product", getAllProducts);


router.post("/product", authMiddleware, isAdmin, createProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/product/rating", authMiddleware, ratingProduct)

router.get("/product/:id", getProductById);
router.put("/product/update/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/product/delete/:id", authMiddleware, isAdmin, deleteProduct);

router.put("/product/uploadImg/:id", 
authMiddleware, isAdmin, 
uploadPhoto.any("images", 10), 
productImgResize, 
uploadImages
);

module.exports = router;
