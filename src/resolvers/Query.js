const md5 = require("md5");
const {
  token: { createTokens },
} = require("../utils");

const login = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.db.query(
    'SELECT * FROM "user" WHERE email = $1 AND password = $2;',
    [email, md5(password)]
  );

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const tokens = createTokens(user.id);
  return { user, tokens };
};

const me = async (parent, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error("Unlogged user");
  }

  return ctx.user;
};

const beers = async (parent, args, ctx, info) =>
  await ctx.db.query("SELECT * FROM beer;", null, false);

const beer = async (parent, { id }, ctx, info) =>
  await ctx.db.query(
    `SELECT b.*, COALESCE(ub.consumption, 0) AS consumption FROM beer b
  LEFT JOIN "user" u ON u.id = $1
  LEFT JOIN users_beers ub ON b.id = ub.beer_id AND u.id = ub.user_id
  WHERE b.id = $2;
  `,
    [ctx.user ? ctx.user.id : 0, id]
  );

module.exports = {
  login,
  me,
  beers,
  beer,
};
