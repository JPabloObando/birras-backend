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

const setNewTokens = (res, id) => {
  res.set("Access-Control-Expose-Headers", "token,refresh-token");
  const { token, refreshToken } = createTokens(id);
  res.set("token", token);
  res.set("x-refresh-token", refreshToken);
};

const decodeToken = (value) => {
  try {
    return jsonwebtoken.verify(value, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { createTokens, setNewTokens, decodeToken };
