const { Client, Environment } = require("square");
const JSONBig = require("json-bigint");

const client = new Client({
  accessToken:
    "EAAAEBNM96rgPw1I_bzZE-YISf4VoCSlv3aU134fkxuxNKao5_UfVS4ag8kqEQLW",
  environment: Environment.Sandbox,
});

const checkout = async (req, res) => {
  client.paymentsApi
    .createPayment(req.body)
    .then((paymentInfo) => {
      res.status(200).send({
        message: "Pay Done Successfully",
        paymentInformation: JSONBig.parse(
          JSONBig.stringify(paymentInfo.result.payment)
        ),
      });
    })
    .catch((error) => {
      res.sendStatus(400);
      throw new Error(error);
    });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.status(200).send({ razorpayOrderId, razorpayPaymentId });
};

module.exports = {
  checkout,
  paymentVerification,
};
