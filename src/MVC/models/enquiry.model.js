const mongoose = require("mongoose");

var enqSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
  phone: {
    type: String,
    reqired: true,
  },
  comment: {
    type: String,
    reqired: true,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress"],
  },
});

//Export the model
module.exports = mongoose.model("Enquiry", enqSchema);
