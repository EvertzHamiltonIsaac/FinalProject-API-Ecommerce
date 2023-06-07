const User = require("../MVC/models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(498).send({message: 'Not Authorized token expired, please log again'});
    }
  } else {
    res.status(400).send({message: 'There is no token attached to the header'});
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    res.status(401).send({message: "You are not an admin"})
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin };
