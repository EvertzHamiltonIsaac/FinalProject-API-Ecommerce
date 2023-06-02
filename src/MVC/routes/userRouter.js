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
  handleRefreshToken,
  logout,
} = require("../controllers/user.controller");

// TODO: Auth
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/User/getAllUsers", getAllUsers);
router.get("/User/getUser/:id", authMiddleware, isAdmin, getUser);
router.get("/User/refreshToken", handleRefreshToken);
router.get("/User/Logout", logout);
router.delete("/User/deleteUser/:id", deleteUser);
router.put("/User/updateUser/updateUser", authMiddleware, isAdmin, updateUser);
router.put("/User/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/User/unblockUser/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
