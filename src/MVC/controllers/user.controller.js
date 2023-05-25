const User = require('../models/user.model')

const createUser = async (req, res) => {
  const body = req.body
  const findUser = await User.findOne({email: body.email});

  if(!findUser) {

    const userData = {...body}
    try {
      const newUser = await User.create(userData);
      res.status(200).send({
        message: 'User created',
        status: '200',
        data: [{...userData}]
        });
    }
    catch(err) {
      res.json({
        message: err.message ,
        success: false,
      })
    }

  } else {

    res.json({
      message: "User already exists",
      success: false,
    })

  }
};

module.exports = {createUser}