const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const fs = require("fs");
const https = require("https");
const http = require("http");

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  path: "/graphql",
});

const app = express();
apollo.applyMiddleware({ app });

server = https.createServer(
  {
    key: fs.readFileSync(`./ssl/server.key`),
    cert: fs.readFileSync(`./ssl/server.crt`),
  },
  app
);

server.listen({ port: process.env.PORT || 3000 }, () =>
  console.log("🚀 Server ready at")
);
