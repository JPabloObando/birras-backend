const db = require("../db");

const getUser = async (id) => {
  const user = await db.query('SELECT * FROM "user" WHERE id = $1;', [id]);
  const myBeers = await db.query(
    `SELECT ub.consumption, b.* FROM public.users_beers ub
    INNER JOIN beer b ON ub.beer_id = b.id
    WHERE ub.user_id = $1;`,
    [id],
    false
  );

  return { ...user, myBeers };
};

module.exports = getUser;
