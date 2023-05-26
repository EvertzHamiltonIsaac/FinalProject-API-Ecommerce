const express = require('express');
const router = express.Router();

//? Controllers

const {createUser} = require("../controllers/user.controller")

router.post('/auth/register', createUser);

module.exports = router;