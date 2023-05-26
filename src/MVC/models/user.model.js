const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//? Encrypting Password
userSchema.pre("save", async function(next){
  try {
    if (!process.env.SALT)
      return console.log("SALT Its not defined on environment file");

    const salt = await bcrypt.genSaltSync(+process.env.SALT);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (err) {

    throw new Error("Error Encrypting the User Password", {
      message: err.message,
    });

  }
});

//Export the model
module.exports = mongoose.model("User", userSchema);
