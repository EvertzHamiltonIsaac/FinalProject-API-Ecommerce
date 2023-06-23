const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
//? Controllers

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  RefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  addToWishList,
  getOrders,
  updateOrderStatus
} = require("../controllers/user.controller");




// TODO: Auth
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

router.get("/user/refresh-token", RefreshToken);
router.post("/user/forgotPassword", forgotPasswordToken);
router.get("/user/logout", logout);

//TODO: Admin
router.post("/auth/login/admin", loginAdmin);

//TODO: User

router.get("/user/", getAllUsers);

router.put("/wishlist", authMiddleware, addToWishList);
router.get('/user/wishlist', authMiddleware, getWishList);
router.get('/user/', authMiddleware, getWishList);
router.get("/user/cart", authMiddleware, getUserCart);
router.post("/user/cart", authMiddleware, userCart);
router.post("/user/applyCoupon",authMiddleware, applyCoupon);
router.post("/user/cart/cash-order",authMiddleware, createOrder);
router.get("/user/cart/get-orders",authMiddleware, getOrders);

router.get("/user/:id", authMiddleware, isAdmin, getUser);
router.put("/user/updateUser", authMiddleware, isAdmin, updateUser);
router.delete("/user/emptyCart/", authMiddleware, emptyCart);
router.put("/user/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/user/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
router.put("/user/updateOrder/:id",authMiddleware, isAdmin ,updateOrderStatus);
router.delete("/user/deleteUser/:id", deleteUser);

router.put("/user/updatePassword", authMiddleware, updatePassword);
router.put("/user/updateAddress", authMiddleware, saveAddress);

router.put("/user/resetPassword/:token", resetPassword);


module.exports = router;
