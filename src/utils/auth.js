const getUser = require("./getUser");
const { decryptToken, createTokens } = require("./token");

/**
 * @func auth
 * @desc Authenticate and allows get the user who's doing the request
 * @param {Object} req Aspects about the request that the client made
 * @param {Object} res Interface to respond to HTTP requests
 * @returns {Object} Information of an user
 */
const auth = async (req, res) => {
  const token = req.headers["token"];
  const refreshToken = req.headers["refresh-token"];

  if (!token) return null;

  let decoded = decryptToken(token);

  if (!decoded) {
    // token doesn't work
    decoded = decryptToken(refreshToken);

    if (!decoded) return null;
    // refreshToken works, we'll to refresh the tokens
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
