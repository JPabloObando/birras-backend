const getUser = require("./getUser");
const { decodeToken, setNewTokens } = require("./token");

const auth = async (req, res) => {
  const token = req.headers["token"];
  const refreshToken = req.headers["refresh-token"];

  if (!token || !refreshToken) return;

  let decodedToken = decodeToken(token);
  let decodedRefreshToken = decodeToken(refreshToken);

  if (!decodedToken) setNewTokens(res, decodedRefreshToken);

  const user = await getUser(decodedToken || decodedRefreshToken);

  return user;
};

module.exports = auth;
