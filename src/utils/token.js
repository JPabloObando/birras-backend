const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "development";

const createTokens = (id) => ({
  token: jsonwebtoken.sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  }),
  refreshToken: jsonwebtoken.sign({ id }, JWT_SECRET, {
    expiresIn: "10d",
  }),
});

const decodeToken = (value) => {
  try {
    return jsonwebtoken.verify(value, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { createTokens, decodeToken };
