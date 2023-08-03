const Order = require("../models/order.model");

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      user: _id,
    });
    res
      .status(200)
      .send({ message: "Order Created Succesfully.", data: order });
  } catch (error) {
    // res.status(400).send({message: error})
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const order = await Order.findById(id)
      .populate("user")
      .populate("orderItems.product")
      .exec();
    res
      .status(200)
      .send({ message: "Order Founded Successfully", data: order });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const AllUserOrders = await Order.find()
      .populate("user")
      .populate("orderItems.product")
      .exec();
    res.status(200).send({
      message: "All Orders Founded Successfully",
      data: AllUserOrders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getRecentOrders = asyncHandler(async (req, res) => {
  const {limit} = req.body;
  try {
    const recentOrders = await Order.find().sort({_id: -1}).limit(limit)
      .populate("user")
      .populate("orderItems.product")
      .exec();
    res.status(200).send({
      message: `${limit} Orders Founded`,
      data: recentOrders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let endDate = "";
  date.setDate(1);

  for (let index = 0; index < 11; index++) {
    date.setMonth(date.getMonth() - 1);
    endDate = monthsName[date.getMonth()] + " " + date.getFullYear();
  }

  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
          },
          amount: { $sum: "$totalPriceAfterDiscount" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
    throw new Error(error);
  }

  console.log(endDate);
});


// const getMonthWiseOrderCount= asyncHandler(async (req, res) => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   let date = new Date();
//   let endDate = "";
//   date.setDate(1);

//   for (let index = 0; index < 11; index++) {
//     date.setMonth(date.getMonth() - 1);
//     endDate = months[date.getMonth()] + " " + date.getFullYear();
//   }

//   try {
//     const data = await Order.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $lte: new Date(),
//             $gte: new Date(endDate),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             month: "$month",
//           },
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).send({success: true, data: data});
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//     throw new Error(error);
//   }

//   console.log(endDate);
// });

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let endDate = "";
  date.setDate(1);

  for (let index = 0; index < 11; index++) {
    date.setMonth(date.getMonth() - 1);
    endDate = months[date.getMonth()] + " " + date.getFullYear();
  }

  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          amount: { $sum: "$totalPriceAfterDiscount" },
        },
      },
    ]);
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
    throw new Error(error);
  }

  console.log(endDate);
});

module.exports = {
  getRecentOrders
}
