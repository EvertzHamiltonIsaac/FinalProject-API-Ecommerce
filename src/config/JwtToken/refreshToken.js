const jwt = require("jsonwebtoken");

const TokenReGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_WORD, { expiresIn: "1.1h" });
};

module.exports = { TokenReGenerator };
