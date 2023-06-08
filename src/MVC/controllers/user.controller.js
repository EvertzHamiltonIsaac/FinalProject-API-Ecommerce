const { TokenGenerator } = require("../../config/JwtToken/jwtToken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");
const jwt = require("jsonwebtoken");
const sendEmail = require("../controllers/email.controller");
const crypto = require("crypto");

// TODO: Controllers For Auth.
//* Register
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
        data: [{ ...userData, password: newUser.password }],
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } else {
    throw new Error("User Already Exists");
  }
});
//* Login
const loginUser = asyncHandler(async (req, res) => {
  const body = req.body;

  const findUser = await User.findOne({ email: body.email });
  if (findUser && (await findUser.isPasswordMatched(body.password))) {
    const refreshToken = await TokenGenerator(findUser?.id, "1.1h");
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 18 * 21 * 24 * 60 * 1000,
    });

    res.status(202).send({
      message: `Welcome to Ginger ${findUser.firstName}`,
      data: {
        id: findUser?._doc._id,
        firstName: findUser?._doc.firstName,
        lastName: findUser?._doc.lastName,
        email: findUser?._doc.email,
        phone: findUser?._doc.phone,
      },
      sessionToken: TokenGenerator(findUser?._doc._id, "1h"),
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

//* Admin Login
const loginAdmin = asyncHandler(async (req, res) => {
  const body = req.body;
  const findAdmin = await User.findOne({ email: body.email });
  if(findAdmin.role !== "admin") return res.status(401).send({message: "Not Authorized"});
  if (findAdmin && (await findAdmin.isPasswordMatched(body.password))) {
    const refreshToken = await TokenGenerator(findAdmin?.id, "1.1h");
    const updateAdmin = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 18 * 21 * 24 * 60 * 1000,
    });

    res.status(202).send({
      message: `Welcome to Ginger ${findAdmin.firstName}`,
      data: {
        id: findAdmin?._doc._id,
        firstName: findAdmin?._doc.firstName,
        lastName: findAdmin?._doc.lastName,
        email: findAdmin?._doc.email,
        phone: findAdmin?._doc.phone,
      },
      sessionToken: TokenGenerator(findAdmin?._doc._id, "1h"),
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


//* Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});
//* Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("Theres no Refreshed Token in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res
      .status(404)
      .send({
        message:
          "No refreshed token presented in the DB or the token soesnt match with the token in the DB",
      });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_WORD, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = TokenGenerator(findUser?._id, "1h");
    res.status(200).send({ accessToken });
  });
});
//* Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No refreshed Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbiden
  }
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //forbiden
});
// *Update User
const updateUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
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
    res.status(200).send(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});
//* Get a Single User
const getUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getaUser = await User.findById(id);
    res.status(302).send(getaUser);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
//* Delete User
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//* Block and Unblock a User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.status(200).send(blockusr);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const unblockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).send(unblockusr);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//* Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.status(200).send(updatedPassword);
  } else {
    res.status(304).send(user);
  }
});
//* Forgot Password
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send({ message: " Token Expired, Try again later" });
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL =
      "Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. < href='http://127.0.0.1:3000/api/v1/user/updatePassword/${token}'>Click Here</>";
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.status(200).send(token);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
//* Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    res.status(404).send({ message: " Token Expired, Try again later" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).send(user);
});
module.exports = {
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
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin
};
