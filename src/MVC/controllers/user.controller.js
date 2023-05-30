const { TokenGenerator } = require("../../config/JwtToken/jwtToken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

// TODO: Controllers For Auth.
const registerUser = asyncHandler(async (req, res) => {
  const body = req.body;
  const findUser = await User.findOne({ email: body.email });

  if (!findUser) {
    const userData = { ...body };
    try {
      const newUser = await User.create(userData);
      res.status(201).send({
        message: "User created",
        status: "200",
        data: [{...userData, password: ''}],
      });
    } catch (err) {
      res.json({
        message: err.message,
        success: false,
      });
    }
  } else {
    throw new Error("User Already Exists");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const body = req.body;

  const findUser = await User.findOne({ email: body.email });
  if(findUser && await findUser.isPasswordMatched(body.password)){
    res.status(202).send({
      message: `Welcome to Ginger ${findUser.firstName}`,
      data: {...findUser?._doc, password: '' }, 
      sesstionToken: TokenGenerator(findUser?._doc._id)
    })
  } else {    
    res.status(401).send({
      fields: {
        email: "Email@gmail.com",
        password: "password"
      }
    })
  }
})



module.exports = { registerUser, loginUser };
