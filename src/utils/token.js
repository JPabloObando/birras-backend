const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "development";

/**
 * @func createTokens
 * @desc Create an object which has the new tokens
 * @param {Int} id Id of the user that we wants to generate new tokens
 * @returns {Object} New tokens
 */
const createTokens = (value) => ({
  token: jsonwebtoken.sign({ id: value }, JWT_SECRET, {
    expiresIn: "2h",
  }),
  refreshToken: jsonwebtoken.sign({ id: value }, JWT_SECRET, {
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
    return jsonwebtoken.verify(value, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { createTokens, decryptToken };
