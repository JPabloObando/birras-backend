const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

/**
 * @func query
 * @desc Allows to execute a query into the db
 * @param {String} text Query as String to execute
 * @param {Array} params Parameters that we want to inject in a safe way to the query
 * @param {Boolean} singleRow Determinate if we want to receive the first row or all the rows of the response
 * @returns {Promise}
 */
const query = (text, params, singleRow = true) =>
  db
    .query(text, params)
    .then(({ rows }) => (singleRow ? rows[0] : rows))
    .catch((err) => {
      throw new Error(err.stack.replace("error: ", ""));
    });

module.exports = {
  query,
};
