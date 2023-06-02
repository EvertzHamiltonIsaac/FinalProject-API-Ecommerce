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
router.get("/user/Logout", logout);

//TODO: User
router.get("/user/", getAllUsers);
router.get("/user/:id", authMiddleware, isAdmin, getUser);
router.put("/user/updateUser", authMiddleware, isAdmin, updateUser);
router.delete("/user/deleteUser/:id", deleteUser);

router.get("/user/refreshToken", handleRefreshToken);
router.put("/user/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/user/unblockUser/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
