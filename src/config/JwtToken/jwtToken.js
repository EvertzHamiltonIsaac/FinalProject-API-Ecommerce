const jwt = require('jsonwebtoken');

const TokenGenerator = (id, amountOfTime) => {
    return jwt.sign({id}, process.env.JWT_SECRET_WORD, {expiresIn: `${amountOfTime}`});
}

module.exports={TokenGenerator};