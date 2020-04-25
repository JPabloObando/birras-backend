const getUser = require("./getUser");
const { decodeToken, createTokens } = require("./token");

const auth = async (req, res) => {
  const token = req.headers["token"];
  const refreshToken = req.headers["refresh-token"];

  if (!token) return null;

  let decoded = decodeToken(token);

  if (!decoded) {
    decoded = decodeToken(refreshToken);

    if (!decoded) return null;

    const { token: newToken, refreshToken: newRefreshToken } = createTokens(
      decoded.id
    );
    res.set("Access-Control-Expose-Headers", "token,refresh-token");
    res.set("token", newToken);
    res.set("x-refresh-token", newRefreshToken);
  }

  const user = await getUser(decoded.id);
  return user;
};

module.exports = auth;
