const express = require('express');
const router = express.Router();

//? Controllers

const {registerUser, loginUser} = require("../controllers/user.controller")

// TODO: Auth
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);


module.exports = router;