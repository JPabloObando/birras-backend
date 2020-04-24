const { ApolloServer } = require("apollo-server");
const db = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const start = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
    introspection: true,
    playground: true,
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

module.exports = start;
