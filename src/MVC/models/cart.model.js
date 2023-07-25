const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: mongoose.Schema.Types.Number,
      ref: "Price",
    },
    quantity: {
      type: mongoose.Schema.Types.Number,
      ref: "Quantity",
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
