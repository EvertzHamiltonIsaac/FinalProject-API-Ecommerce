const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      other: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    paymentInfo: {
      paymentId: {
        type: String,
        required: true,
      },
      amountMoney: {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      },
      paymentStatus: {
        type: String,
        required: true,
      },
      cardDetails: {
        cardDetailsStatus: {
          type: String,
          required: true,
        },
        card: {
          cardBrand: {
            type: String,
            required: true,
          },
          expMonth: {
            type: Number,
            required: true,
          },
          fingerprint: {
            type: String,
            required: true,
          },
          cardType: {
            type: String,
            required: true,
          },
          bin: {
            type: String,
            required: true,
          },
        },
      },
      cardPaymentTimeLine: {
        authorizedAt: {
          type: String,
          required: true,
        },
        capturedAt: {
          type: String,
          required: true,
        },
      },
      receiptNumber: {
        type: String,
        required: true,
      },
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    month: {
      type: String,
      default: new Date().getMonth(),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
