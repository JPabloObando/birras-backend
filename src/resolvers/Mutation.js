const md5 = require("md5");
const {
  token: { createTokens },
} = require("../utils");

const register = async (parent, { input }, ctx, info) => {
  const { email, name, password } = input;

  const user = await ctx.db.query(
    'INSERT INTO "user"(email, name, password) VALUES ($1, $2, $3) RETURNING *',
    [email, name, md5(password)]
  );

  const tokens = createTokens(user.id);

  return { user, tokens };
};

module.exports = {
  register,
};
