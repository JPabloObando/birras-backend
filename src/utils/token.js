const jsonwebtoken = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret || "development";

/**
 * @func createTokens
 * @desc Create an object which has the new tokens
 * @param {Int} id Id of the user that we wants to generate new tokens
 * @returns {Object} New tokens
 */
const createTokens = (value) => ({
  token: jsonwebtoken.sign({ id: value }, jwt_secret, {
    expiresIn: "2h",
  }),
  refreshToken: jsonwebtoken.sign({ id: value }, jwt_secret, {
    expiresIn: "10d",
  }),
});

/**
 * @func decryptToken
 * @desc Decrypt an JWT as string
 * @param {String} value JWT
 * @returns {String} Decoded payload
 */
const decryptToken = (value) => {
  try {
    return jsonwebtoken.verify(value, jwt_secret);
  } catch (error) {
    return null;
  }
};

module.exports = { createTokens, decryptToken };
