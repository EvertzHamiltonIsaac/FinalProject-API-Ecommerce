const {default: mongoose} = require('mongoose');

const DBConnect = () => {
  try {
    const conn = mongoose.connect(process.env.DATABASE_URL);
    console.log('Database Connected Successfully');

  } catch (error) {
    console.log('Database error',error.message);
  }
};

module.exports = DBConnect;
