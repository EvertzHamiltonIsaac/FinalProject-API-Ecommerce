const RazorPay = require("razorpay");
// const instance = new RazorPay({ key_id: "", key_secret: "" });
const intance = {} //! Codigo Temporal.

const checkout = async (req, res) => {
  const option = {
    amount: 50000,
    currency: "USD",
  };
  try {
    const order = await instance.orders.create(option);
    res.status(200).send({ success: true, order: order });
  } catch (error) {
    throw new Error(error);
  }
};

const paymentVerification = async (req, res) => {
    const {razorpayOrderId, razorpayPaymentId} = req.body;
    res.status(200).send({razorpayOrderId, razorpayPaymentId});
  };

module.exports = {
    checkout,
    paymentVerification
}