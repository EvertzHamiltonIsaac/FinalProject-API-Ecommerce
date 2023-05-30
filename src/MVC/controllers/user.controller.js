const { log } = require("console");
const { TokenGenerator } = require("../../config/JwtToken/jwtToken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

// TODO: Controllers For Auth.
//Register
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
        data: [{ ...userData, password: "" }],
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

//Login
const loginUser = asyncHandler(async (req, res) => {
  const body = req.body;

  const findUser = await User.findOne({ email: body.email });
  if (findUser && (await findUser.isPasswordMatched(body.password))) {
    res.status(202).send({
      message: `Welcome to Ginger ${findUser.firstName}`,
      data: { ...findUser?._doc, password: "" },
      sesstionToken: TokenGenerator(findUser?._doc._id),
    });
  } else {
    res.status(401).send({
      fields: {
        email: "Email@gmail.com",
        password: "password",
      },
    });
  }
});

//Get all users
const getUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Update User
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        phone: req?.body?.phone,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete User
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const getaUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { registerUser, loginUser, getUser, deleteUser, updateUser };
