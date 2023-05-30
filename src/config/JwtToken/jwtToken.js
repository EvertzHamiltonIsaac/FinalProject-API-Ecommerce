const jwt = require('jsonwebtoken');

const TokenGenerator = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_WORD, {expiresIn: "1h"});
}

module.exports={TokenGenerator};