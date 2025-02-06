const jwt = require('jsonwebtoken');
require("dotenv").config();

exports = {};  

exports.getToken = (email,user) => {
    const payload = {
      userId: user._id,
      email:email, // Include user ID in the payload
    };
  
    // Create a token with a 1-hour expiration time
    const token = jwt.sign(payload, process.env.session_secret, { expiresIn: '1h' });
    return token;
  };

module.exports = exports;