const { TokenGenerator } = require("../../config/JwtToken/jwtToken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const Coupon = require("../models/coupon.model");
const Order = require("../models/order.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");
const jwt = require("jsonwebtoken");
const sendEmail = require("../controllers/email.controller");
const crypto = require("crypto");
const uniqid = require("uniqid");

// TODO: Controllers For Auth.
//* Register ✅
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
      res.status(400).send({ status: 400, message: err.message });
    }
  } else {
    throw new Error("User Already Exists");
  }
});

//* Login ✅
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
      status: 401,
      message: "Invalid credentials",
      fields: {
        email: "Email@gmail.com",
        password: "password",
      },
    });
  }
});

//* Admin Login ✅
const loginAdmin = asyncHandler(async (req, res) => {
  const body = req.body;
  const findAdmin = await User.findOne({ email: body.email });

  if (findAdmin.role !== "admin")
    return res.status(401).send({ status: 401, message: "Not Authorized" });

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
      status: 401,
      fields: {
        message: "Invalid Credentials",
        email: "Email@gmail.com",
        password: "password",
      },
    });
  }
});

//* Logout ⚠️
//! Ver video para ver como funciona.
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

//* Refresh token ✅
const RefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) {
    throw new Error("Theres no Refreshed Token in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.status(404).send({
      status: 404,
      message:
        "No refreshed token presented in the DB or the token doesnt match with the token in the DB",
    });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_WORD, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    
    const accessToken = TokenGenerator(user?._id, "1h");
    res
      .status(200)
      .send({ message: "Token de Acceso Generado", data: accessToken });
  });
  
});

//* Forgot Password ⚠️
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(404)
      .send({ status: 404, message: " Token Expired, Try again later" });
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL =
      `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. < href='http://127.0.0.1:3000/api/v1/user/updatePassword/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.status(200).send({ message: "Token de Acceso Generado", data: token });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Reset Password ⚠️

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    res
      .status(404)
      .send({ status: 404, message: " Token Expired, Try again later" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).send({ message: "User Password Updated", data: user });
});

//* Get all users ✅
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

//* Get a Single User ✅
const getUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getaUser = await User.findById(id);
    res.status(302).send({ message: "User Found", data: getaUser });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

// *Update User ✅
const updateUser = asyncHandler(async (req, res) => {
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
    res
      .status(200)
      .send({ message: "User Updated Successfully", data: updateUser });
  } catch (error) {
    throw new Error(error);
  }
});

//* Delete User ✅
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "User Deleted Successfully", data: deleteUser });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Block User ✅
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
    res
      .status(200)
      .send({ message: "User Blocked Successfully", data: blockusr });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Unblock User ✅⚠️
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
    res
      .status(200)
      .send({ message: "User Unblocked Successfully", data: unblockusr });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Update Password ✅
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res
      .status(200)
      .send({ message: "User Updated Successfully", data: updatedPassword });
  } else {
    res.status(400).send({ status: 400, data: user });
  }
});

//* Get Wish List ✅⚠️
const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res
      .status(302)
      .send({ message: "WishList Founded Successfully", data: findUser });
  } catch (error) {
    throw new Error(error.message);
  }
});

const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );

    res
      .status(200)
      .send({ message: "Address Saved Successfully", data: updateUser });
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoId(_id);

  try {
    let products = [];

    const user = await User.findById(_id);

    const alreadyExistCart = await Cart.findOne({ orderby: user?._id });
    console.log(alreadyExistCart);

    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();

    res.status(202).send({ message: "Created New Cart", data: newCart });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const cart = await Cart.findOne({ orderBy: _id }).populate(
      "products.product",
      "_id title price totalAfterDiscount"
    );
    res.status(302).send({ message: "User Cart Founded ", data: cart });
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderBy: _id });

    res.status(302).send({ message: "Cart Empty Successfully", data: cart });
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;

  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid coupon");
  }

  const user = await User.findOne({ _id });
  let { products, cartTotal } = await Cart.findOne({
    orderBy: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res
    .status(200)
    .send({ message: "Coupon Applied Successfully", data: totalAfterDiscount });
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderBy: user._id });
    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "USD",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});

    res.status(200).send({
      message: "Order Created successfully",
      updated,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);

  try {
    const userOrders = await Order.findOne({ orderBy: _id })
      .populate("products.product")
      .exec();
    res
      .status(301)
      .send({ message: "Order Founded Successfully", data: userOrders });
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Order Updated Successfully", data: updateOrderStatus });
  } catch (error) {
    throw new Error(error);
  }
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
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
};
