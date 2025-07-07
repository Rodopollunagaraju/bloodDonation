require('dotenv').config();
const JWT = require("jsonwebtoken");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };
  if (!process.env.JWT_SECERT_STRING) {
    throw new Error("JWT_SECRET_STRING is not defined in environment variables");
  }
  const token = JWT.sign(payload, process.env.JWT_SECERT_STRING);
  return token;
}

function validateToken(token) {
  if (!process.env.JWT_SECERT_STRING) {
    throw new Error("JWT_SECRET_STRING is not defined in environment variables");
  }
  const payload = JWT.verify(token, process.env.JWT_SECERT_STRING);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};