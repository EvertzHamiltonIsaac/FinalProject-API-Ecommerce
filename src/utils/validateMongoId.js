const mongoose = require("mongoose")
;
const validateMongoId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This id is not valid or is not Found");
  }
};
module.exports = validateMongoId;
