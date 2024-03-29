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
  getUserOrders,
  getRecentOrders,
  // emptyCart,
  // applyCoupon,
  createOrder,
  addToWishList,
  // getOrders,
  getAllOrders,
  updateOrderStatus,
  getMonthWiseOrderIncome,
  // getMonthWiseOrderCount,
  getYearlyTotalOrders,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getOrderById,
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
router.get("/user/wishlist", authMiddleware, getWishList);
router.get("/user/", authMiddleware, getWishList);
router.get("/user/cart", authMiddleware, getUserCart);
router.post("/user/create-cart", authMiddleware, userCart);
// router.post("/user/applyCoupon",authMiddleware, applyCoupon);
router.post("/order/create-order", authMiddleware, createOrder);
// router.get("/user/cart/get-orders",authMiddleware, getOrders);
router.get("/order/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/order/get-my-orders", authMiddleware, getUserOrders);

router.get(
  "/order/get-month-wise-order-income",
  authMiddleware,
  isAdmin,
  getMonthWiseOrderIncome
);
// router.get("/order/get-month-wise-order-count", authMiddleware, isAdmin, getMonthWiseOrderCount);
router.get(
  "/order/get-yearly-total-orders",
  authMiddleware,
  isAdmin,
  getYearlyTotalOrders
);

router.get(
  "/order/get-recent/:limit",
  authMiddleware,
  isAdmin,
  getRecentOrders
);

router.get("/order/:id", authMiddleware, isAdmin, getOrderById);

router.put(
  "/order/updateOrder/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

router.get("/user/:id", authMiddleware, isAdmin, getUser);
router.put("/user/updateUser", authMiddleware, updateUser);
// router.delete("/user/emptyCart/", authMiddleware, emptyCart);
router.delete(
  "/user/deleteFromCart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);

router.put(
  "/user/updateFromCart/:cartItemId",
  authMiddleware,
  updateProductQuantityFromCart
);

// router.put(
//   "/user/updateFromCart/:cartItemId",
//   authMiddleware,
//   updateProductQuantityFromCart2
// );

router.put("/user/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/user/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/user/deleteUser/:id", deleteUser);

router.put("/user/updatePassword", authMiddleware, updatePassword);
router.put("/user/updateAddress", authMiddleware, saveAddress);

router.put("/user/resetPassword/:token", resetPassword);

module.exports = router;
