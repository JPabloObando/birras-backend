const md5 = require("md5");
const {
  token: { createTokens },
  regEx,
  getUser,
} = require("../utils");

const environment = () => process.env.NODE_ENV || "development";

const login = async (parent, { email, password }, ctx, info) => {
  if (!regEx.correctFormEmail(email)) {
    throw new Error("Invalid email format :(");
  }

  const validUser = await ctx.db.query(
    'SELECT * FROM "user" WHERE email = $1 AND password = $2;',
    [email, md5(password)]
  );

  if (!validUser) {
    throw new Error("Invalid Credentials :(");
  }

  const user = await getUser(validUser.id);
  const tokens = createTokens(validUser.id);
  return { user, tokens };
};

const me = async (parent, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error("Unlogged user, go and log in!!");
  }

  return ctx.user;
};

/**
 * In a resolver you can return a promise because it performs asynchronous actions
 * @link https://www.apollographql.com/docs/apollo-server/data/resolvers/#return-values
 */
const beers = async (parent, args, ctx, info) =>
  await ctx.db.query(
    `SELECT b.*, COALESCE(ub.consumption, 0) AS consumption FROM beer b
    LEFT JOIN "user" u ON u.id = $1
    LEFT JOIN users_beers ub ON b.id = ub.beer_id AND u.id = ub.user_id`,
    // [ctx.user && ctx.user.id] If the user is logged in, we'll try to get his consumption of that beer
    [ctx.user && ctx.user.id],
    false
  );

const beer = async (parent, { id }, ctx, info) =>
  await ctx.db.query(
    `SELECT b.*, COALESCE(ub.consumption, 0) AS consumption FROM beer b
  LEFT JOIN "user" u ON u.id = $1
  LEFT JOIN users_beers ub ON b.id = ub.beer_id AND u.id = ub.user_id
  WHERE b.id = $2;
  `,
    // [ctx.user && ctx.user.id] If the user is logged in, we'll try to get his consumption of that beer
    [ctx.user && ctx.user.id, id]
  );

const beersByKind = async (parent, { kind }, ctx, info) =>
  await ctx.db.query(
    `SELECT b.*, COALESCE(ub.consumption, 0) AS consumption FROM beer b
  LEFT JOIN "user" u ON u.id = $1
  LEFT JOIN users_beers ub ON b.id = ub.beer_id AND u.id = ub.user_id
  WHERE REPLACE(LOWER(kind), ' ', '') = $2`,
    // [ctx.user && ctx.user.id] If the user is logged in, we'll try to get his consumption of that beer
    [ctx.user && ctx.user.id, regEx.trimAndLowerCase(kind)],
    false
  );

module.exports = {
  environment,
  login,
  me,
  beers,
  beer,
  beersByKind,
};
