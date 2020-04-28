require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const fs = require("fs");
const https = require("https");
const http = require("http");

const configurations = {
  production: {
    ssl: true,
    port: process.env.PORT || 4000,
    hostname: "example.com",
  },
  development: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: "localhost",
  },
};

const environment = process.env.NODE_ENV || "development";
const config = configurations[environment];

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();
apollo.applyMiddleware({ app });

let server = null;
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/server.key`),
      cert: fs.readFileSync(`./ssl/server.crt`),
    },
    app
  );
} else {
  server = http.createServer(app);
}

server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
