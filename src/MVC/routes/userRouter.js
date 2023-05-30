const express = require("express");
const router = express.Router();

//? Controllers

const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

// TODO: Auth
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/allUsers", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
