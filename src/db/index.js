const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
  query: (text, params, singleRow = true) =>
    db
      .query(text, params)
      .then(({ rows }) => (singleRow ? rows[0] : rows))
      .catch((err) => {
        throw new Error(err.stack.replace("error: ", ""));
      }),
};
