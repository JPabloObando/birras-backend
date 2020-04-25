const md5 = require("md5");
const {
  token: { createTokens },
} = require("../utils");

const login = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.db.query(
    'SELECT * FROM "user" WHERE email = $1 AND password = $2;',
    [email, md5(password)]
  );

  const tokens = createTokens(user.id);

  return { user, tokens };
};

module.exports = {
  login,
};
