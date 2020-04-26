const { ApolloServer } = require("apollo-server");
const db = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { auth } = require("./utils");

/**
 * @func context
 * @desc Share across all resolvers a potential user and an initialization of our db
 */
const context = async ({ req, res }) => {
  const user = await auth(req, res);
  return { user, db };
};

/**
 * @func start
 * @desc Create an instance of ApolloServer and then will launch a web server
 */
const start = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true,
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

module.exports = start;
