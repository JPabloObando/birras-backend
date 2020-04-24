const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
  query: (text, params) =>
    db
      .query(text, params)
      .then((res) => res.rows[0])
      .catch((err) => null),
};
