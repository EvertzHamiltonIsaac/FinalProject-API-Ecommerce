// const RazorPay = require("razorpay");
// // const instance = new RazorPay({ key_id: "", key_secret: "" });
// const instance = { key_id: "", key_secret: ""} //! Codigo Temporal.


const square = require('square');
const { Client, Environment } = square;

const accessToken = 'EAAAEBNM96rgPw1I_bzZE-YISf4VoCSlv3aU134fkxuxNKao5_UfVS4ag8kqEQLW';
const squareClient = new Client({
  environment: Environment.Sandbox, 
  accessToken: accessToken,
});

const checkout = async (req, res) => {

  const { totalPrice } = req.body; 
  try {
    const paymentsApi = squareClient.paymentsApi;
    const createPaymentRequest = {
      sourceId: sourceId, // frontend mediante el SDK de Square
      amountMoney: {
        amount: totalPrice * 100, 
        currency: 'USD', 
      },
    };

    const createPaymentResponse = await paymentsApi.createPayment(createPaymentRequest);
    res.status(200).send({ success: true, payment: createPaymentResponse.result.payment });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
  
  // const option = {
  //   amount: 50000,
  //   currency: "USD",
  // };
  // try {
  //   const order = await instance.orders.create(option);
  //   res.status(200).send({ success: true, order: order });
  // } catch (error) {
  //   throw new Error(error);
  // }
};

const paymentVerification = async (req, res) => {
  const { paymentId } = req.body; 
  res.status(200).send({ success: true, paymentId: paymentId });
};

module.exports = {
    checkout,
    paymentVerification
}