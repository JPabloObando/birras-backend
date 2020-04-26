const md5 = require("md5");
const {
  token: { createTokens },
  regEx,
} = require("../utils");

const register = async (parent, { user }, ctx, info) => {
  const { email, name, password } = user;

  if (!regEx.correctFormEmail(email)) {
    throw new Error("Invalid email format, try another dude :)");
  }

  const emailUsed = await ctx.db.query(
    'SELECT * FROM "user" WHERE email = $1',
    [email]
  );

  if (emailUsed) {
    throw new Error("Email in use, try another dude :)");
  }

  const newUser = await ctx.db.query(
    'INSERT INTO "user"(email, name, password) VALUES ($1, $2, $3) RETURNING *',
    [email, name, md5(password)]
  );
  const tokens = createTokens(newUser.id);
  return { user: { ...newUser, myBeers: [] }, tokens };
};

const createBeer = async (parent, { beer }, ctx, info) => {
  const { percentage, brand, kind, image } = beer;
  const beerExits = await ctx.db.query("SELECT * FROM beer WHERE brand = $1", [
    brand,
  ]);

  if (beerExits) {
    throw new Error("This beer has already been created, try another :)");
  }

  const newBeer = await ctx.db.query(
    "INSERT INTO beer (percentage, brand, kind, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [percentage, brand, kind, image]
  );
  return newBeer;
};

const beerConsumption = async (parent, { amount, id }, ctx, info) => {
  if (!ctx.user) {
    throw new Error("Unlogged user, dude you must be logged in first :)");
  }

  const { consumption } = await ctx.db.query(
    `INSERT INTO users_beers (user_id, beer_id, consumption) 
  VALUES ($1, $2, $3)
  ON CONFLICT (user_id, beer_id) 
  DO
  UPDATE
  SET consumption = $3
  RETURNING consumption;`,
    [ctx.user.id, id, amount]
  );
  return consumption;
};

module.exports = {
  register,
  createBeer,
  beerConsumption,
};
